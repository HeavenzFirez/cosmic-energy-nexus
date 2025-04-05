
import React, { useEffect, useRef, useState } from 'react';
import { Atom, Cross, Diamond, Hexagon, Star, Triangle } from 'lucide-react';

const UnifiedPowerSystem = () => {
  // Refs for our canvas elements
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const energyCanvasRef = useRef<HTMLCanvasElement>(null);
  const geometryCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // States for the unified system
  const [activeFrequency, setActiveFrequency] = useState<string>("432");
  const [activeChamber, setActiveChamber] = useState<string>("pyramid");
  const [resonanceLevel, setResonanceLevel] = useState<number>(0);
  const [convergencePower, setConvergencePower] = useState<number>(0);
  const [totalPower, setTotalPower] = useState<number>(0);
  const [entanglementStrength, setEntanglementStrength] = useState<number>(0);
  const [systemMode, setSystemMode] = useState<string>("visualization");
  
  // Animation frame ID for cleanup
  const animationRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Main system canvas setup
    const canvas = mainCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Initialize all subsystems
    initMainVisualization(canvas, ctx);
    initEnergyGenerator(energyCanvasRef.current);
    initSacredGeometry(geometryCanvasRef.current);
    
    // Handle window resize
    const handleResize = () => {
      const canvases = [
        mainCanvasRef.current,
        energyCanvasRef.current,
        geometryCanvasRef.current
      ];
      
      canvases.forEach(canvas => {
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Initialize the main cosmic visualization
  const initMainVisualization = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const centralX = canvas.width / 2;
    const centralY = canvas.height / 2;
    const baseRadius = 150;
    const orbitRadius = 300;
    const colors = ['#FF69B4', '#FFD700', '#00FFFF', '#FF4500', '#ADFF2F', '#FFFFFF'];
    const tetrahedronPoints: {x: number, y: number}[] = [];
    const gyroidPoints: {x: number, y: number}[] = [];
    const vortexLines: {angle: number, radius: number, speed: number, color: string}[] = [];
    
    // Initialize tetrahedral points
    const tetrahedronRadius = baseRadius / 2;
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const x = centralX + Math.cos(angle) * tetrahedronRadius;
      const y = centralY + Math.sin(angle) * tetrahedronRadius;
      tetrahedronPoints.push({ x, y });
    }
    
    // Initialize gyroidial points
    const gyroidCount = 100;
    for (let i = 0; i < gyroidCount; i++) {
      const angle = (i / gyroidCount) * Math.PI * 2;
      const radius = orbitRadius + Math.sin(angle * 5) * 50; // Wavy gyroid effect
      const x = centralX + Math.cos(angle) * radius;
      const y = centralY + Math.sin(angle) * radius;
      gyroidPoints.push({ x, y });
    }
    
    // Initialize vortex lines
    const vortexLineCount = 50;
    for (let i = 0; i < vortexLineCount; i++) {
      vortexLines.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * orbitRadius,
        speed: Math.random() * 0.05 + 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    
    // Digital Power Station Integration
    const gridSize = 10; // Number of rows and columns in the matrix
    const cellSize = Math.min(canvas.width, canvas.height) / (gridSize + 2); // Size of each cell
    const matrix: any[][] = []; // Stores energy and entanglement data for each cell
    
    // Initialize the matrix with random energy and entanglement values
    for (let row = 0; row < gridSize; row++) {
      matrix[row] = [];
      for (let col = 0; col < gridSize; col++) {
        matrix[row][col] = {
          energy: Math.random() * 100, // Energy level (0 to 100)
          entanglement: Math.random() * 100, // Entanglement level (0 to 100)
          color: colors[Math.floor(Math.random() * colors.length)],
          connections: [], // Connections to other cells
          row: row, // Store row position
          col: col, // Store col position
        };
      }
    }
    
    // Create connections between cells to simulate a power grid
    function createConnections() {
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          const cell = matrix[row][col];
          if (row > 0 && Math.random() > 0.5) cell.connections.push(matrix[row - 1][col]); // Up
          if (row < gridSize - 1 && Math.random() > 0.5) cell.connections.push(matrix[row + 1][col]); // Down
          if (col > 0 && Math.random() > 0.5) cell.connections.push(matrix[row][col - 1]); // Left
          if (col < gridSize - 1 && Math.random() > 0.5) cell.connections.push(matrix[row][col + 1]); // Right
        }
      }
    }
    
    createConnections();
    
    function drawMatrix() {
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          const x = col * cellSize + cellSize;
          const y = row * cellSize + cellSize;
          const cell = matrix[row][col];
          
          // Draw cell background based on energy level
          ctx.fillStyle = cell.color;
          ctx.globalAlpha = cell.energy / 100; // Transparency based on energy level
          ctx.fillRect(x, y, cellSize - 5, cellSize - 5);
          
          // Draw entanglement effect (circular overlay)
          ctx.beginPath();
          ctx.arc(
            x + cellSize / 2,
            y + cellSize / 2,
            (cell.entanglement / 100) * (cellSize / 2), // Radius based on entanglement level
            0,
            Math.PI * 2
          );
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.closePath();
          
          // Draw energy and entanglement values inside the cell
          ctx.globalAlpha = 1;
          ctx.fillStyle = '#fff';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(
            `E:${Math.round(cell.energy)}%`,
            x + cellSize / 2,
            y + cellSize / 2 - 10
          );
          ctx.fillText(
            `En:${Math.round(cell.entanglement)}%`,
            x + cellSize / 2,
            y + cellSize / 2 + 10
          );
          
          // Draw connections as lines between cells
          cell.connections.forEach((connection: any) => {
            const connectionX = connection.col * cellSize + cellSize + cellSize / 2;
            const connectionY = connection.row * cellSize + cellSize + cellSize / 2;
            
            ctx.beginPath();
            ctx.moveTo(x + cellSize / 2, y + cellSize / 2);
            ctx.lineTo(connectionX, connectionY);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.closePath();
          });
        }
      }
    }
    
    function updateMatrix() {
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          const cell = matrix[row][col];
          cell.energy = Math.max(0, Math.min(100, cell.energy + (Math.random() - 0.5) * 5));
          cell.entanglement = Math.max(0, Math.min(100, cell.entanglement + (Math.random() - 0.5) * 5));
        }
      }
    }
    
    function drawTetrahedron() {
      ctx.beginPath();
      ctx.moveTo(tetrahedronPoints[0].x, tetrahedronPoints[0].y);
      for (let i = 1; i < 4; i++) {
        ctx.lineTo(tetrahedronPoints[i].x, tetrahedronPoints[i].y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw vertices
      tetrahedronPoints.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.closePath();
      });
    }
    
    function drawGyroid() {
      gyroidPoints.forEach((point, index) => {
        const oscillation = Math.sin(Date.now() / 1000 + index * 0.1) * 10;
        const x = point.x + Math.cos(index) * oscillation;
        const y = point.y + Math.sin(index) * oscillation;
        
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();
        ctx.closePath();
      });
      
      // Connect gyroid points to form a toroidal structure
      for (let i = 0; i < gyroidPoints.length; i++) {
        const nextIndex = (i + 1) % gyroidPoints.length;
        const p1 = gyroidPoints[i];
        const p2 = gyroidPoints[nextIndex];
        
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
      }
    }
    
    function drawVortex() {
      vortexLines.forEach(line => {
        line.angle += line.speed;
        const x = centralX + Math.cos(line.angle) * line.radius;
        const y = centralY + Math.sin(line.angle) * line.radius;
        
        ctx.beginPath();
        ctx.moveTo(centralX, centralY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
      });
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      const gradient = ctx.createRadialGradient(centralX, centralY, 0, centralX, centralY, canvas.width / 2);
      gradient.addColorStop(0, 'rgba(10, 20, 40, 1)');
      gradient.addColorStop(1, 'rgba(5, 10, 20, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      drawTetrahedron(); // Draw tetrahedral crystal lattice
      drawGyroid(); // Draw gyroidial toroid
      drawVortex(); // Draw hypertaurus vortex
      drawMatrix(); // Draw digital power station matrix
      updateMatrix(); // Update matrix values
      
      animationRef.current = requestAnimationFrame(animate);
    }
    
    animate();
  };
  
  // Initialize the energy generator subsystem
  const initEnergyGenerator = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Here we would initialize the energy generator visualization
    // For brevity, we'll just set up a system that connects with the main system
    
    // This function would be called in a full implementation
    function updateEnergyMetrics(power: number, entanglement: number) {
      setTotalPower(power);
      setEntanglementStrength(entanglement);
    }
    
    // Simulate energy generation
    setInterval(() => {
      const newPower = Math.min(100, 30 + Math.random() * 70);
      const newEntanglement = Math.min(100, 40 + Math.random() * 60);
      updateEnergyMetrics(newPower, newEntanglement);
    }, 2000);
  };
  
  // Initialize the sacred geometry subsystem
  const initSacredGeometry = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // For brevity, we'll just set up the connection points with the main system
    
    // Simulate sacred geometry calculations
    setInterval(() => {
      // Calculate based on current frequency and chamber
      const frequencyFactor = activeFrequency === "528" ? 1.5 : 
                             activeFrequency === "432" ? 1.2 : 1.3;
      
      const chamberFactor = activeChamber === "pyramid" ? 1.2 :
                           activeChamber === "sphere" ? 1.0 : 0.9;
      
      const newResonance = Math.min(100, 40 + Math.random() * 30 * frequencyFactor);
      const newConvergence = Math.min(100, 30 + Math.random() * 40 * frequencyFactor * chamberFactor);
      
      setResonanceLevel(newResonance);
      setConvergencePower(newConvergence);
    }, 2000);
  };
  
  const handleFrequencyChange = (freq: string) => {
    setActiveFrequency(freq);
  };
  
  const handleChamberChange = (chamber: string) => {
    setActiveChamber(chamber);
  };
  
  const switchSystemMode = (mode: string) => {
    setSystemMode(mode);
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#000,_#1a1a1a)] z-0"></div>
      
      {/* Canvas layers - stacked but only one visible based on mode */}
      <canvas 
        ref={mainCanvasRef} 
        className="block absolute inset-0 z-10"
      ></canvas>
      
      <canvas 
        ref={energyCanvasRef} 
        className="block absolute inset-0 z-10 hidden" 
      ></canvas>
      
      <canvas 
        ref={geometryCanvasRef} 
        className="block absolute inset-0 z-10 hidden"
      ></canvas>
      
      {/* Unified header */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-center text-2xl text-[#FFD700] z-20">
        Unified Nonlinear Power Station<br/>
        <span className="text-base text-[#00FFFF]">Entangled Multifunctional Syncronistic System</span>
      </div>
      
      {/* Mode switcher - replaces navigation */}
      <div className="fixed top-0 right-0 z-30 m-4">
        <div className="flex space-x-4 bg-black/50 p-2 rounded-lg">
          <button 
            onClick={() => switchSystemMode("visualization")}
            className={`text-white px-3 py-1 rounded ${systemMode === 'visualization' ? 'bg-purple-700' : 'hover:bg-purple-900'}`}
          >
            Cosmic Core
          </button>
          <button 
            onClick={() => switchSystemMode("generator")}
            className={`text-white px-3 py-1 rounded ${systemMode === 'generator' ? 'bg-purple-700' : 'hover:bg-purple-900'}`}
          >
            Energy Amplifier
          </button>
          <button 
            onClick={() => switchSystemMode("geometry")}
            className={`text-white px-3 py-1 rounded ${systemMode === 'geometry' ? 'bg-purple-700' : 'hover:bg-purple-900'}`}
          >
            Sacred Geometry
          </button>
        </div>
      </div>
      
      {/* Integrated control panel */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[90%] lg:w-[80%] bg-black/50 p-4 rounded-lg z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Power metrics */}
          <div>
            <h3 className="text-xl text-[#FFD700] mb-2">Power Metrics</h3>
            
            <div className="space-y-2">
              <div>
                <h4 className="text-[#00FFFF]">Energy Output</h4>
                <div className="w-full bg-gray-900 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-yellow-500 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${totalPower}%` }}
                  ></div>
                </div>
                <div className="text-white text-right">{Math.round(totalPower)}%</div>
              </div>
              
              <div>
                <h4 className="text-[#00FFFF]">Entanglement</h4>
                <div className="w-full bg-gray-900 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${entanglementStrength}%` }}
                  ></div>
                </div>
                <div className="text-white text-right">{Math.round(entanglementStrength)}%</div>
              </div>
            </div>
          </div>
          
          {/* Frequency controls */}
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
          
          {/* Chamber controls */}
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
        
        {/* Unified system metrics */}
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
        
        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white">
            Amplify Resonance
          </button>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white">
            Transmute Energy
          </button>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white">
            Stabilize Matrix
          </button>
          <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded text-white">
            Entangle Systems
          </button>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white">
            Maximize Output
          </button>
        </div>
        
        {/* Sacred symbols */}
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
      
      {/* Inspirational quote */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-center text-xl text-[#00FFFF] z-20">
        Energy cannot be created or destroyed, only transformed and amplified through sacred resonance.
      </div>
    </div>
  );
};

export default UnifiedPowerSystem;
