
import React, { useEffect, useRef, useState } from 'react';
import Navigation from '../components/Navigation';
import { Atom, Cross, Diamond, Hexagon, Star, Triangle } from 'lucide-react';

const SacredGeometry = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeFrequency, setActiveFrequency] = useState<string>("432");
  const [activeChamber, setActiveChamber] = useState<string>("pyramid");
  const [resonanceLevel, setResonanceLevel] = useState<number>(0);
  const [convergencePower, setConvergencePower] = useState<number>(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Animation variables
    let frame = 0;
    
    // Sacred geometry configurations
    const sacredGeometryConfig = {
      frequencies: {
        "432": { color: "#E040FB", resonanceFactor: 1.2 },
        "528": { color: "#00E676", resonanceFactor: 1.5 },
        "639": { color: "#FFEB3B", resonanceFactor: 1.3 },
        "741": { color: "#F44336", resonanceFactor: 1.4 },
        "852": { color: "#2196F3", resonanceFactor: 1.25 },
        "963": { color: "#FF9800", resonanceFactor: 1.35 }
      },
      chambers: {
        "pyramid": { edgeCount: 4, radiusMultiplier: 1.2 },
        "cube": { edgeCount: 4, radiusMultiplier: 1.0 },
        "sphere": { edgeCount: 36, radiusMultiplier: 1.0 },
        "dodecahedron": { edgeCount: 12, radiusMultiplier: 1.1 },
        "torus": { edgeCount: 36, radiusMultiplier: 0.8 }
      },
      symbols: [
        { name: "Latin Cross", points: 8, rotationSpeed: 0.001, size: 120 },
        { name: "Pentagram", points: 5, rotationSpeed: 0.002, size: 80 },
        { name: "Hexagram", points: 6, rotationSpeed: 0.0015, size: 100 },
        { name: "Vesica Piscis", points: 2, rotationSpeed: 0.001, size: 90 },
        { name: "Flower of Life", points: 19, rotationSpeed: 0.0005, size: 150 }
      ]
    };
    
    // Create resonance nodes
    const createResonanceNodes = () => {
      const nodes = [];
      const nodeCount = 7; // Seven nodes for the chakra system
      const chakraColors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3"];
      
      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const radius = 200;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        nodes.push({
          x, y,
          color: chakraColors[i],
          frequency: Object.keys(sacredGeometryConfig.frequencies)[i % 6],
          pulse: 0,
          pulseDirection: 1,
          pulseSpeed: 0.02 + (Math.random() * 0.01)
        });
      }
      
      return nodes;
    };
    
    const resonanceNodes = createResonanceNodes();
    
    function drawLatinCross(x: number, y: number, size: number, rotation: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      const verticalHeight = size;
      const horizontalWidth = size * 0.7;
      const horizontalHeight = size * 0.2;
      const verticalWidth = size * 0.2;
      const crossPosition = size * 0.3;
      
      ctx.beginPath();
      ctx.rect(-verticalWidth/2, -verticalHeight/2, verticalWidth, verticalHeight);
      ctx.rect(-horizontalWidth/2, -crossPosition, horizontalWidth, horizontalHeight);
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }
    
    function drawFlowerOfLife(x: number, y: number, size: number, rotation: number) {
      const radius = size / 6;
      const positions = [];
      
      // Central circle
      positions.push({ x: 0, y: 0 });
      
      // First ring
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + rotation;
        const px = Math.cos(angle) * radius * 2;
        const py = Math.sin(angle) * radius * 2;
        positions.push({ x: px, y: py });
      }
      
      // Second ring (partial)
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + rotation + (Math.PI / 12);
        const px = Math.cos(angle) * radius * 4;
        const py = Math.sin(angle) * radius * 4;
        positions.push({ x: px, y: py });
      }
      
      ctx.save();
      ctx.translate(x, y);
      
      // Draw circles
      positions.forEach(pos => {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      
      ctx.restore();
    }
    
    function drawPentagram(x: number, y: number, size: number, rotation: number) {
      const points = 5;
      const outerRadius = size / 2;
      const innerRadius = outerRadius * 0.38;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      ctx.beginPath();
      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i / points) * Math.PI;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      
      ctx.closePath();
      ctx.strokeStyle = "rgba(255, 215, 0, 0.7)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "rgba(255, 215, 0, 0.1)";
      ctx.fill();
      ctx.restore();
    }
    
    function drawResonanceChamber(chamberType: string) {
      const chamberConfig = sacredGeometryConfig.chambers[chamberType as keyof typeof sacredGeometryConfig.chambers];
      const edgeCount = chamberConfig.edgeCount;
      const radius = 250 * chamberConfig.radiusMultiplier;
      
      switch (chamberType) {
        case "pyramid":
          drawPyramid(radius);
          break;
        case "cube":
          drawCube(radius);
          break;
        case "sphere":
          drawSphere(radius);
          break;
        case "torus":
          drawTorus(radius);
          break;
        case "dodecahedron":
          drawPolygon(centerX, centerY, radius, 12);
          break;
      }
    }
    
    function drawPyramid(radius: number) {
      const height = radius * 1.2;
      
      // Base
      ctx.beginPath();
      ctx.moveTo(centerX - radius, centerY + radius/2);
      ctx.lineTo(centerX + radius, centerY + radius/2);
      ctx.lineTo(centerX + radius, centerY - radius/2);
      ctx.lineTo(centerX - radius, centerY - radius/2);
      ctx.closePath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.stroke();
      
      // Side edges
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - height);
      ctx.lineTo(centerX - radius, centerY - radius/2);
      ctx.moveTo(centerX, centerY - height);
      ctx.lineTo(centerX + radius, centerY - radius/2);
      ctx.moveTo(centerX, centerY - height);
      ctx.lineTo(centerX + radius, centerY + radius/2);
      ctx.moveTo(centerX, centerY - height);
      ctx.lineTo(centerX - radius, centerY + radius/2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.stroke();
    }
    
    function drawCube(radius: number) {
      const offset = radius * 0.3;
      
      // Front face
      ctx.beginPath();
      ctx.moveTo(centerX - radius, centerY - radius);
      ctx.lineTo(centerX + radius, centerY - radius);
      ctx.lineTo(centerX + radius, centerY + radius);
      ctx.lineTo(centerX - radius, centerY + radius);
      ctx.closePath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.stroke();
      
      // Back face
      ctx.beginPath();
      ctx.moveTo(centerX - radius + offset, centerY - radius - offset);
      ctx.lineTo(centerX + radius + offset, centerY - radius - offset);
      ctx.lineTo(centerX + radius + offset, centerY + radius - offset);
      ctx.lineTo(centerX - radius + offset, centerY + radius - offset);
      ctx.closePath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.stroke();
      
      // Connecting edges
      ctx.beginPath();
      ctx.moveTo(centerX - radius, centerY - radius);
      ctx.lineTo(centerX - radius + offset, centerY - radius - offset);
      ctx.moveTo(centerX + radius, centerY - radius);
      ctx.lineTo(centerX + radius + offset, centerY - radius - offset);
      ctx.moveTo(centerX + radius, centerY + radius);
      ctx.lineTo(centerX + radius + offset, centerY + radius - offset);
      ctx.moveTo(centerX - radius, centerY + radius);
      ctx.lineTo(centerX - radius + offset, centerY + radius - offset);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.stroke();
    }
    
    function drawSphere(radius: number) {
      // Horizontal ellipses
      for (let i = 0; i < 3; i++) {
        const ratio = 0.5 + (i * 0.25);
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radius, radius * ratio, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.stroke();
      }
      
      // Vertical ellipses
      for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radius * Math.abs(Math.cos(angle)), radius, angle, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.stroke();
      }
    }
    
    function drawTorus(radius: number) {
      const innerRadius = radius * 0.3;
      const steps = 36;
      const points = [];
      
      // Generate torus points
      for (let i = 0; i < steps; i++) {
        const outerAngle = (i / steps) * Math.PI * 2;
        const centerX_temp = centerX + Math.cos(outerAngle) * (radius - innerRadius);
        const centerY_temp = centerY + Math.sin(outerAngle) * (radius - innerRadius);
        
        for (let j = 0; j < steps; j++) {
          const innerAngle = (j / steps) * Math.PI * 2;
          const x = centerX_temp + Math.cos(innerAngle) * innerRadius * Math.cos(outerAngle);
          const y = centerY_temp + Math.sin(innerAngle) * innerRadius;
          
          if (j % 6 === 0 && i % 6 === 0) {
            points.push({ x, y });
          }
        }
      }
      
      // Draw connections
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dist = Math.sqrt(Math.pow(points[i].x - points[j].x, 2) + Math.pow(points[i].y - points[j].y, 2));
          if (dist < innerRadius * 2) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 - (dist / (innerRadius * 2)) * 0.3})`;
            ctx.stroke();
          }
        }
      }
    }
    
    function drawPolygon(x: number, y: number, radius: number, sides: number) {
      ctx.beginPath();
      const angle = Math.PI * 2 / sides;
      for (let i = 0; i < sides; i++) {
        const pointX = x + radius * Math.cos(angle * i);
        const pointY = y + radius * Math.sin(angle * i);
        if (i === 0) {
          ctx.moveTo(pointX, pointY);
        } else {
          ctx.lineTo(pointX, pointY);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    function drawSolfeggioFrequencies() {
      const frequencyKeys = Object.keys(sacredGeometryConfig.frequencies);
      const frequencyY = canvas.height - 80;
      const spacing = canvas.width / (frequencyKeys.length + 1);
      
      frequencyKeys.forEach((freq, index) => {
        const x = spacing * (index + 1);
        const config = sacredGeometryConfig.frequencies[freq as keyof typeof sacredGeometryConfig.frequencies];
        const isActive = freq === activeFrequency;
        
        // Draw frequency node
        ctx.beginPath();
        ctx.arc(x, frequencyY, isActive ? 25 : 15, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? config.color : `${config.color}80`;
        ctx.fill();
        
        // Draw frequency label
        ctx.fillStyle = "white";
        ctx.font = "14px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${freq} Hz`, x, frequencyY);
        
        // Draw resonance lines if active
        if (isActive) {
          resonanceNodes.forEach(node => {
            const opacity = 0.1 + Math.sin(frame * 0.05) * 0.1;
            ctx.beginPath();
            ctx.moveTo(x, frequencyY);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = `${config.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 1;
            ctx.stroke();
          });
        }
      });
    }
    
    function updateResonanceNodes() {
      resonanceNodes.forEach(node => {
        // Update pulse
        node.pulse += node.pulseDirection * node.pulseSpeed;
        if (node.pulse > 1 || node.pulse < 0) {
          node.pulseDirection *= -1;
        }
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 10 + node.pulse * 10, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}${Math.floor((0.3 + node.pulse * 0.7) * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }
    
    function calculateConvergence() {
      // Calculate convergence power based on current active elements
      const frequencyConfig = sacredGeometryConfig.frequencies[activeFrequency as keyof typeof sacredGeometryConfig.frequencies];
      const chamberConfig = sacredGeometryConfig.chambers[activeChamber as keyof typeof sacredGeometryConfig.chambers];
      
      const baseConvergence = 30 + Math.sin(frame * 0.02) * 10;
      const frequencyMultiplier = frequencyConfig.resonanceFactor;
      const chamberMultiplier = chamberConfig.radiusMultiplier;
      
      const newResonanceLevel = Math.min(100, baseConvergence * frequencyMultiplier);
      const newConvergencePower = Math.min(100, baseConvergence * frequencyMultiplier * chamberMultiplier);
      
      setResonanceLevel(newResonanceLevel);
      setConvergencePower(newConvergencePower);
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width / 2);
      gradient.addColorStop(0, "rgba(10, 20, 40, 1)");
      gradient.addColorStop(1, "rgba(5, 10, 20, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw resonance chamber
      drawResonanceChamber(activeChamber);
      
      // Draw sacred symbols
      const symbolRotation = frame * 0.001;
      drawLatinCross(centerX, centerY, 120, symbolRotation);
      drawPentagram(centerX, centerY, 200, -symbolRotation * 0.7);
      drawFlowerOfLife(centerX, centerY, 300, symbolRotation * 0.5);
      
      // Draw resonance nodes
      updateResonanceNodes();
      
      // Draw solfeggio frequencies
      drawSolfeggioFrequencies();
      
      // Calculate convergence
      calculateConvergence();
      
      frame++;
      requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activeFrequency, activeChamber]);
  
  const handleFrequencyChange = (freq: string) => {
    setActiveFrequency(freq);
  };
  
  const handleChamberChange = (chamber: string) => {
    setActiveChamber(chamber);
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#000,_#1a1a1a)] z-0"></div>
      
      {/* Canvas for visualization */}
      <canvas 
        ref={canvasRef} 
        className="block absolute inset-0 z-10"
      ></canvas>
      
      {/* Navigation */}
      <Navigation />
      
      {/* Header */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-center text-2xl text-[#FFD700] z-20">
        Sacred Geometry Simulator<br/>
        <span className="text-base text-[#00FFFF]">Unifying Resonant Chambers and Symbolic Convergence</span>
      </div>
      
      {/* Controls Panel */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] lg:w-[60%] bg-black/50 p-4 rounded-lg z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl text-[#FFD700] mb-2">Solfeggio Frequencies</h3>
            <div className="grid grid-cols-3 gap-2">
              {["432", "528", "639", "741", "852", "963"].map(freq => (
                <button 
                  key={freq}
                  onClick={() => handleFrequencyChange(freq)}
                  className={`px-4 py-2 rounded text-white ${activeFrequency === freq ? 'bg-purple-600' : 'bg-purple-900/50'}`}
                >
                  {freq} Hz
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl text-[#FFD700] mb-2">Resonant Chambers</h3>
            <div className="grid grid-cols-3 gap-2">
              {["pyramid", "cube", "sphere", "torus", "dodecahedron"].map(chamber => (
                <button 
                  key={chamber}
                  onClick={() => handleChamberChange(chamber)}
                  className={`px-4 py-2 rounded text-white ${activeChamber === chamber ? 'bg-blue-600' : 'bg-blue-900/50'}`}
                >
                  {chamber.charAt(0).toUpperCase() + chamber.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Power Metrics */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-[#00FFFF] mb-1">Resonance Level</h3>
            <div className="w-full bg-gray-900 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${resonanceLevel}%` }}
              ></div>
            </div>
            <div className="text-white text-right">{Math.round(resonanceLevel)}%</div>
          </div>
          
          <div>
            <h3 className="text-[#00FFFF] mb-1">Convergence Power</h3>
            <div className="w-full bg-gray-900 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-red-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${convergencePower}%` }}
              ></div>
            </div>
            <div className="text-white text-right">{Math.round(convergencePower)}%</div>
          </div>
        </div>
        
        {/* Sacred Symbols */}
        <div className="mt-4">
          <h3 className="text-xl text-[#FFD700] mb-2">Sacred Symbols</h3>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex flex-col items-center">
              <Cross className="w-8 h-8 text-white" />
              <span className="text-white text-sm">Latin Cross</span>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-8 h-8 text-white" />
              <span className="text-white text-sm">Pentagram</span>
            </div>
            <div className="flex flex-col items-center">
              <Hexagon className="w-8 h-8 text-white" />
              <span className="text-white text-sm">Hexagram</span>
            </div>
            <div className="flex flex-col items-center">
              <Diamond className="w-8 h-8 text-white" />
              <span className="text-white text-sm">Vesica Piscis</span>
            </div>
            <div className="flex flex-col items-center">
              <Atom className="w-8 h-8 text-white" />
              <span className="text-white text-sm">Flower of Life</span>
            </div>
            <div className="flex flex-col items-center">
              <Triangle className="w-8 h-8 text-white" />
              <span className="text-white text-sm">Pyramid</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SacredGeometry;
