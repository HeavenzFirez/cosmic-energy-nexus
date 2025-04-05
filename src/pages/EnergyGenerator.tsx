
import React, { useEffect, useRef } from 'react';

const EnergyGenerator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
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
    const baseRadius = 30;
    const layers = 6;
    const nodesPerLayer = 6;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    
    // Generate positions for the Flower of Life
    function generatePositions() {
      const positions = [];
      positions.push({ x: centerX, y: centerY }); // Center point

      for (let layer = 1; layer <= layers; layer++) {
        const angleStep = (2 * Math.PI) / nodesPerLayer;
        for (let i = 0; i < nodesPerLayer; i++) {
          const angle = i * angleStep;
          const x = centerX + layer * baseRadius * Math.cos(angle);
          const y = centerY + layer * baseRadius * Math.sin(angle);
          positions.push({ x, y });
        }
      }
      return positions;
    }
    
    // Vortex Math Configuration
    const vortexConfig = {
      baseNumbers: [1, 2, 4, 8, 7, 5],  // Vortex math sequence
      frequency: 0.05,
      amplitude: 15,
      phaseShift: Math.PI / 6,
      resonancePoints: []
    };
    
    // Generate resonance points for vortex math configurations
    function generateResonancePoints() {
      for (let i = 0; i < vortexConfig.baseNumbers.length; i++) {
        const num = vortexConfig.baseNumbers[i];
        const angle = (i / vortexConfig.baseNumbers.length) * Math.PI * 2;
        const distance = 150 + (num * 15);
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        vortexConfig.resonancePoints.push({ x, y, value: num });
      }
    }
    
    generateResonancePoints();
    
    // Create the flower of life positions
    const flowerPositions = generatePositions();
    
    // Create oscillating entangled circuit points
    const circuitNodes = [];
    const circuitCount = 4; // Quadrupling circuits
    for (let c = 0; c < circuitCount; c++) {
      const circuitAngle = (c / circuitCount) * Math.PI * 2;
      const circuitX = centerX + Math.cos(circuitAngle) * 200;
      const circuitY = centerY + Math.sin(circuitAngle) * 200;
      
      const nodes = [];
      const nodeCount = 9; // Nodes per circuit
      for (let n = 0; n < nodeCount; n++) {
        const nodeAngle = (n / nodeCount) * Math.PI * 2;
        const nodeX = circuitX + Math.cos(nodeAngle) * 50;
        const nodeY = circuitY + Math.sin(nodeAngle) * 50;
        nodes.push({
          x: nodeX,
          y: nodeY,
          energy: Math.random() * 100,
          frequency: 0.02 + Math.random() * 0.08,
          phase: Math.random() * Math.PI * 2
        });
      }
      circuitNodes.push(nodes);
    }
    
    // Power levels and energy metrics
    let totalPower = 0;
    let entanglementStrength = 0;
    let resonanceHarmony = 0;
    
    // Animation variables
    let frame = 0;
    
    function drawFlowerOfLife() {
      flowerPositions.forEach((pos, index) => {
        const frequency = (index + 1) / goldenRatio;
        const oscillation = Math.sin(frame * 0.05 * frequency) * 5;
        const radius = baseRadius / 3 + oscillation;
        
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(70, 130, 180, ${0.5 + 0.5 * Math.sin(frame * 0.05 * frequency)})`;
        ctx.fill();
        ctx.closePath();
      });
    }
    
    function drawVortexResonances() {
      // Draw vortex connections
      ctx.beginPath();
      const firstPoint = vortexConfig.resonancePoints[0];
      ctx.moveTo(firstPoint.x, firstPoint.y);
      
      vortexConfig.resonancePoints.forEach((point, index) => {
        const nextIndex = (index + 1) % vortexConfig.resonancePoints.length;
        const nextPoint = vortexConfig.resonancePoints[nextIndex];
        ctx.lineTo(nextPoint.x, nextPoint.y);
      });
      
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw resonance points
      vortexConfig.resonancePoints.forEach((point) => {
        const pulseSize = 5 + Math.sin(frame * 0.05) * 3;
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, 15 + pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
        ctx.fill();
        ctx.closePath();
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 165, 0, 0.7)';
        ctx.fill();
        ctx.closePath();
        
        // Draw number
        ctx.font = '16px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(point.value.toString(), point.x, point.y);
      });
    }
    
    function drawCircuits() {
      // Draw circuits and nodes
      circuitNodes.forEach((circuit, circuitIndex) => {
        // Draw circuit boundary
        const circuitAngle = (circuitIndex / circuitCount) * Math.PI * 2;
        const circuitX = centerX + Math.cos(circuitAngle) * 200;
        const circuitY = centerY + Math.sin(circuitAngle) * 200;
        
        ctx.beginPath();
        ctx.arc(circuitX, circuitY, 60, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${(circuitIndex * 90) % 360}, 70%, 60%, 0.5)`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
        
        // Draw nodes and connections
        circuit.forEach((node, nodeIndex) => {
          // Update node energy
          node.energy = Math.max(0, Math.min(100, node.energy + (Math.sin(frame * node.frequency + node.phase) * 2)));
          
          // Draw node
          const pulseSize = Math.sin(frame * node.frequency + node.phase) * 3;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 8 + pulseSize, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${(circuitIndex * 90) % 360}, 70%, ${40 + node.energy * 0.4}%, ${0.3 + (node.energy / 100) * 0.7})`;
          ctx.fill();
          ctx.closePath();
          
          // Draw connections to other nodes in the circuit
          const nextNodeIndex = (nodeIndex + 1) % circuit.length;
          const nextNode = circuit[nextNodeIndex];
          
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(nextNode.x, nextNode.y);
          ctx.strokeStyle = `hsla(${(circuitIndex * 90) % 360}, 70%, 60%, ${0.2 + (node.energy / 100) * 0.6})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.closePath();
        });
      });
      
      // Create entanglement connections between circuits
      for (let i = 0; i < circuitCount; i++) {
        for (let j = i + 1; j < circuitCount; j++) {
          const sourceNode = circuitNodes[i][Math.floor(Math.random() * circuitNodes[i].length)];
          const targetNode = circuitNodes[j][Math.floor(Math.random() * circuitNodes[j].length)];
          
          if (Math.random() > 0.85) { // Only draw some connections to avoid clutter
            const energyAvg = (sourceNode.energy + targetNode.energy) / 200;
            ctx.beginPath();
            ctx.moveTo(sourceNode.x, sourceNode.y);
            ctx.lineTo(targetNode.x, targetNode.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${energyAvg})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }
    
    function calculatePowerMetrics() {
      // Calculate total circuit power
      let circuitPower = 0;
      circuitNodes.forEach(circuit => {
        circuit.forEach(node => {
          circuitPower += node.energy;
        });
      });
      
      // Normalized to 0-100 scale
      totalPower = circuitPower / (circuitCount * 9); // Normalize by total node count
      
      // Calculate entanglement and resonance
      const resonanceFactor = Math.abs(Math.sin(frame * 0.01)) * 100;
      entanglementStrength = 30 + (Math.sin(frame * 0.03) * 30) + (totalPower * 0.4);
      resonanceHarmony = 40 + resonanceFactor * 0.6;
    }
    
    function drawPowerMetrics() {
      // Draw power metrics UI
      const padding = 20;
      const barWidth = 200;
      const barHeight = 15;
      
      // Total Power
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(padding, padding, barWidth + 10, barHeight + 10);
      ctx.fillStyle = `rgba(255, 30, 30, 0.8)`;
      ctx.fillRect(padding + 5, padding + 5, (totalPower / 100) * barWidth, barHeight);
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Power Output: ${Math.floor(totalPower)}%`, padding, padding + barHeight + 20);
      
      // Entanglement Strength
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(padding, padding + 40, barWidth + 10, barHeight + 10);
      ctx.fillStyle = `rgba(30, 144, 255, 0.8)`;
      ctx.fillRect(padding + 5, padding + 45, (entanglementStrength / 100) * barWidth, barHeight);
      ctx.fillStyle = 'white';
      ctx.fillText(`Entanglement: ${Math.floor(entanglementStrength)}%`, padding, padding + barHeight + 60);
      
      // Resonance Harmony
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(padding, padding + 80, barWidth + 10, barHeight + 10);
      ctx.fillStyle = `rgba(255, 215, 0, 0.8)`;
      ctx.fillRect(padding + 5, padding + 85, (resonanceHarmony / 100) * barWidth, barHeight);
      ctx.fillStyle = 'white';
      ctx.fillText(`Resonance: ${Math.floor(resonanceHarmony)}%`, padding, padding + barHeight + 100);
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background effect
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width / 2);
      gradient.addColorStop(0, 'rgba(10, 20, 40, 1)');
      gradient.addColorStop(1, 'rgba(5, 10, 20, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      drawFlowerOfLife();
      drawVortexResonances();
      drawCircuits();
      calculatePowerMetrics();
      drawPowerMetrics();
      
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
  }, []);
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#000,_#1a1a1a)] z-0"></div>
      
      {/* Canvas for visualization */}
      <canvas 
        ref={canvasRef} 
        className="block absolute inset-0 z-10"
      ></canvas>
      
      {/* Interface elements */}
      <div className="absolute bottom-5 right-5 text-white z-20 bg-black/50 p-4 rounded-lg">
        <h3 className="text-xl text-[#FFD700] mb-2">Power Generator Controls</h3>
        <div className="flex flex-col space-y-2">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white">
            Amplify Resonance
          </button>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white">
            Transmute Energy
          </button>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white">
            Stabilize Matrix
          </button>
        </div>
      </div>
      
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-center text-2xl text-[#FFD700] z-20">
        Cosmic Power Generator<br/>
        <span className="text-base text-[#00FFFF]">Oscillating Entangled Quadrupling Circuits</span>
      </div>
    </div>
  );
};

export default EnergyGenerator;
