
import React, { useEffect, useRef, useState } from 'react';
import { Atom, Download, ZapOff, Zap, Save } from 'lucide-react';

const EnergyGenerator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [vortexPower, setVortexPower] = useState<number>(0);
  const [harmonicLevel, setHarmonicLevel] = useState<number>(0);
  const [energyStored, setEnergyStored] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(true);
  const [selectedVortexSequence, setSelectedVortexSequence] = useState<string>("1-4-7");
  
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
    
    // Vortex Math Configuration - Marko Rodin's sequences
    const vortexConfig = {
      sequences: {
        "1-4-7": [1, 4, 7, 1, 4, 7],  // Vortex family 1
        "2-5-8": [2, 5, 8, 2, 5, 8],  // Vortex family 2
        "3-6-9": [3, 6, 9, 3, 6, 9],  // Vortex family 3 - the "God family" in vortex math
        "3-9-6-3-9-6": [3, 9, 6, 3, 9, 6], // Tesla's key sequence
        "1-2-4-8-7-5": [1, 2, 4, 8, 7, 5], // Doubling pattern
      },
      activeSequence: [1, 4, 7, 1, 4, 7],
      frequency: 0.05,
      amplitude: 15,
      phaseShift: Math.PI / 6,
      resonancePoints: []
    };
    
    // Update active sequence based on selection
    vortexConfig.activeSequence = vortexConfig.sequences[selectedVortexSequence];
    
    // Generate positions for the toroidal field
    function generateResonancePoints() {
      vortexConfig.resonancePoints = [];
      for (let i = 0; i < vortexConfig.activeSequence.length; i++) {
        const num = vortexConfig.activeSequence[i];
        const angle = (i / vortexConfig.activeSequence.length) * Math.PI * 2;
        const distance = 150 + (num * 15);
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        vortexConfig.resonancePoints.push({ x, y, value: num });
      }
    }
    
    generateResonancePoints();
    
    // Fibonacci spiral points
    const fibonacciPoints: {x: number, y: number, radius: number}[] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    
    for (let i = 0; i < 200; i++) {
      const theta = i * goldenRatio * Math.PI;
      const radius = Math.sqrt(i) * 8;
      const x = centerX + radius * Math.cos(theta);
      const y = centerY + radius * Math.sin(theta);
      fibonacciPoints.push({x, y, radius: 3 + (i % 6) * 0.5});
    }
    
    // Create oscillating quantum circuits
    const quantumCircuits = [];
    const circuitCount = 9; // 9 is special in vortex math
    
    for (let c = 0; c < circuitCount; c++) {
      const circuitAngle = (c / circuitCount) * Math.PI * 2;
      const circuitRadius = 200;
      const circuitX = centerX + Math.cos(circuitAngle) * circuitRadius;
      const circuitY = centerY + Math.sin(circuitAngle) * circuitRadius;
      
      const nodes = [];
      const nodeCount = vortexConfig.activeSequence.length;
      
      for (let n = 0; n < nodeCount; n++) {
        const nodeAngle = (n / nodeCount) * Math.PI * 2;
        const nodeRadius = 50;
        const nodeX = circuitX + Math.cos(nodeAngle) * nodeRadius;
        const nodeY = circuitY + Math.sin(nodeAngle) * nodeRadius;
        
        nodes.push({
          x: nodeX,
          y: nodeY,
          value: vortexConfig.activeSequence[n],
          energy: Math.random() * 100,
          frequency: 0.02 + Math.random() * 0.08,
          phase: Math.random() * Math.PI * 2
        });
      }
      quantumCircuits.push({
        x: circuitX,
        y: circuitY,
        radius: nodeRadius + 10,
        nodes: nodes,
        rotation: 0,
        rotationSpeed: 0.001 * (c % 3 === 0 ? -1 : 1)
      });
    }
    
    // Power levels and energy metrics
    let powerOutput = 0;
    let harmonicResonance = 0;
    
    // Animation variables
    let frame = 0;
    
    function drawFibonacciSpiral() {
      fibonacciPoints.forEach((point, index) => {
        const phase = index * 0.1 + frame * 0.01;
        const pulseSize = Math.sin(phase) * 2;
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius + pulseSize, 0, 2 * Math.PI);
        ctx.fillStyle = `hsla(${(index * 10) % 360}, 70%, 60%, ${0.3 + 0.2 * Math.sin(phase)})`;
        ctx.fill();
        ctx.closePath();
      });
    }
    
    function drawVortexSequence() {
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
    
    function drawQuantumCircuits() {
      quantumCircuits.forEach((circuit, circuitIndex) => {
        // Update circuit rotation
        circuit.rotation += circuit.rotationSpeed * (isGenerating ? 1 : 0.1);
        
        // Draw circuit boundary
        ctx.beginPath();
        ctx.arc(circuit.x, circuit.y, circuit.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${(circuitIndex * 40) % 360}, 70%, 60%, 0.5)`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
        
        // Draw central node connection to vortex center
        ctx.beginPath();
        ctx.moveTo(circuit.x, circuit.y);
        ctx.lineTo(centerX, centerY);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + 0.1 * Math.sin(frame * 0.02)})`;
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.closePath();
        
        // Draw nodes with rotation
        circuit.nodes.forEach((node, nodeIndex) => {
          // Calculate rotated position
          const angle = (nodeIndex / circuit.nodes.length) * Math.PI * 2 + circuit.rotation;
          const rotatedX = circuit.x + Math.cos(angle) * circuit.radius;
          const rotatedY = circuit.y + Math.sin(angle) * circuit.radius;
          
          // Update node energy
          if (isGenerating) {
            node.energy = Math.max(0, Math.min(100, node.energy + (Math.sin(frame * node.frequency + node.phase) * 2)));
          } else {
            node.energy = Math.max(0, node.energy * 0.99); // Energy slowly decreases when not generating
          }
          
          // Draw node
          const pulseSize = Math.sin(frame * node.frequency + node.phase) * 3;
          ctx.beginPath();
          ctx.arc(rotatedX, rotatedY, 8 + pulseSize, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${(circuitIndex * 40) % 360}, 70%, ${40 + node.energy * 0.4}%, ${0.3 + (node.energy / 100) * 0.7})`;
          ctx.fill();
          ctx.closePath();
          
          // Draw value inside node
          ctx.font = '12px Arial';
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.value.toString(), rotatedX, rotatedY);
          
          // Draw connections to other nodes in the circuit
          const nextNodeIndex = (nodeIndex + 1) % circuit.nodes.length;
          const nextAngle = (nextNodeIndex / circuit.nodes.length) * Math.PI * 2 + circuit.rotation;
          const nextX = circuit.x + Math.cos(nextAngle) * circuit.radius;
          const nextY = circuit.y + Math.sin(nextAngle) * circuit.radius;
          
          ctx.beginPath();
          ctx.moveTo(rotatedX, rotatedY);
          ctx.lineTo(nextX, nextY);
          ctx.strokeStyle = `hsla(${(circuitIndex * 40) % 360}, 70%, 60%, ${0.2 + (node.energy / 100) * 0.6})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.closePath();
        });
      });
    }
    
    function calculatePowerMetrics() {
      if (!isGenerating) {
        powerOutput = Math.max(0, powerOutput * 0.95);
        harmonicResonance = Math.max(0, harmonicResonance * 0.95);
        return;
      }
      
      // Calculate total circuit power
      let totalCircuitEnergy = 0;
      let nodeCount = 0;
      
      quantumCircuits.forEach(circuit => {
        circuit.nodes.forEach(node => {
          totalCircuitEnergy += node.energy * (node.value / 9); // Scale by vortex number (9 is max in vortex math)
          nodeCount++;
        });
      });
      
      // Vortex sequence alignment factor
      const sequenceBoost = selectedVortexSequence === "3-6-9" ? 1.5 : 
                           selectedVortexSequence === "3-9-6-3-9-6" ? 1.8 : 1.0;
      
      // Calculate power output based on circuit energy and sequence                 
      const rawPower = totalCircuitEnergy / nodeCount;
      powerOutput = Math.min(100, rawPower * sequenceBoost);
      
      // Calculate harmonic resonance
      const resonanceFactor = Math.abs(Math.sin(frame * 0.01)) * 100;
      harmonicResonance = 40 + resonanceFactor * 0.6 * sequenceBoost;
      
      // Store energy when generating
      if (frame % 60 === 0) { // Store energy every 60 frames
        setEnergyStored(prev => Math.min(10000, prev + powerOutput * 0.5));
      }
    }
    
    function drawFrame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width / 2);
      gradient.addColorStop(0, 'rgba(10, 20, 40, 1)');
      gradient.addColorStop(1, 'rgba(5, 10, 20, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw fibonacci spiral
      drawFibonacciSpiral();
      
      // Draw vortex sequence
      drawVortexSequence();
      
      // Draw quantum circuits
      drawQuantumCircuits();
      
      // Calculate power metrics
      calculatePowerMetrics();
      
      // Update state values
      setVortexPower(powerOutput);
      setHarmonicLevel(harmonicResonance);
      
      frame++;
      requestAnimationFrame(drawFrame);
    }
    
    const animationFrame = requestAnimationFrame(drawFrame);
    
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
      cancelAnimationFrame(animationFrame);
    };
  }, [selectedVortexSequence, isGenerating]);
  
  const toggleGenerator = () => {
    setIsGenerating(prev => !prev);
  };
  
  const handleSequenceChange = (sequence: string) => {
    setSelectedVortexSequence(sequence);
  };
  
  const harvestEnergy = () => {
    alert(`Successfully harvested ${Math.round(energyStored)} units of nonlinear vortex energy!`);
    setEnergyStored(0);
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#000,_#0a1025)] z-0"></div>
      
      {/* Canvas for visualization */}
      <canvas 
        ref={canvasRef} 
        className="block absolute inset-0 z-10"
      ></canvas>
      
      {/* Header */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center text-2xl text-[#FFD700] z-20">
        Quantum Vortex Energy Amplifier<br/>
        <span className="text-base text-[#00FFFF]">Nonlinear Mathematics for Usable Power Generation</span>
      </div>
      
      {/* Vortex sequence selector */}
      <div className="absolute top-40 left-1/2 transform -translate-x-1/2 z-20 bg-black/50 p-4 rounded-lg backdrop-blur-sm border border-indigo-900/50">
        <h3 className="text-xl text-[#FFD700] mb-2 text-center">Vortex Number Sequence</h3>
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={() => handleSequenceChange("1-4-7")}
            className={`px-3 py-2 rounded text-white ${selectedVortexSequence === "1-4-7" ? 'bg-indigo-700' : 'bg-indigo-900/50'}`}
          >
            1-4-7
          </button>
          <button 
            onClick={() => handleSequenceChange("2-5-8")}
            className={`px-3 py-2 rounded text-white ${selectedVortexSequence === "2-5-8" ? 'bg-indigo-700' : 'bg-indigo-900/50'}`}
          >
            2-5-8
          </button>
          <button 
            onClick={() => handleSequenceChange("3-6-9")}
            className={`px-3 py-2 rounded text-white ${selectedVortexSequence === "3-6-9" ? 'bg-indigo-700' : 'bg-indigo-900/50'}`}
          >
            3-6-9
          </button>
          <button 
            onClick={() => handleSequenceChange("3-9-6-3-9-6")}
            className={`px-3 py-2 rounded text-white ${selectedVortexSequence === "3-9-6-3-9-6" ? 'bg-indigo-700' : 'bg-indigo-900/50'}`}
          >
            3-9-6-3-9-6
          </button>
          <button 
            onClick={() => handleSequenceChange("1-2-4-8-7-5")}
            className={`px-3 py-2 rounded text-white ${selectedVortexSequence === "1-2-4-8-7-5" ? 'bg-indigo-700' : 'bg-indigo-900/50'} col-span-2`}
          >
            1-2-4-8-7-5
          </button>
        </div>
      </div>
      
      {/* Power metrics panel */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[90%] lg:w-[80%] bg-black/60 p-4 rounded-lg z-20 backdrop-blur-sm border border-blue-900/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Active Power Output */}
          <div>
            <h3 className="text-xl text-[#FFD700] mb-2">Active Power Output</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-[#00FFFF]">Vortex Energy Flow</h4>
                <div className="w-full bg-gray-900 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-yellow-500 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${vortexPower}%` }}
                  ></div>
                </div>
                <div className="text-white text-right">{Math.round(vortexPower)}% ({(vortexPower * 0.42).toFixed(1)} kW)</div>
              </div>
              
              <div>
                <h4 className="text-[#00FFFF]">Harmonic Resonance</h4>
                <div className="w-full bg-gray-900 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${harmonicLevel}%` }}
                  ></div>
                </div>
                <div className="text-white text-right">{Math.round(harmonicLevel)}%</div>
              </div>
            </div>
          </div>
          
          {/* Energy Storage */}
          <div>
            <h3 className="text-xl text-[#FFD700] mb-2">Quantum Energy Storage</h3>
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="text-[#00FFFF] mb-1">Storage Capacity</div>
                <div className="w-full bg-gray-900 rounded-full h-8 mb-2">
                  <div 
                    className="bg-gradient-to-r from-blue-600 via-cyan-500 to-green-400 h-8 rounded-full transition-all duration-300 relative"
                    style={{ width: `${Math.min(100, energyStored / 100)}%` }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                      {Math.round(energyStored)} / 10000 units
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button 
                  onClick={harvestEnergy}
                  disabled={energyStored < 100}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded text-white ${energyStored >= 100 ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 cursor-not-allowed'}`}
                >
                  <Download className="w-5 h-5" />
                  <span>Harvest Energy</span>
                </button>
                
                <button 
                  onClick={() => alert(`Energy is being stored in quantum capacitors at ${(vortexPower * 0.42).toFixed(1)} kW rate`)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
                >
                  <Save className="w-5 h-5" />
                  <span>Energy Details</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Generator Controls */}
          <div>
            <h3 className="text-xl text-[#FFD700] mb-2">Vortex Generator Controls</h3>
            <div className="space-y-3">
              <button 
                onClick={toggleGenerator}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded text-white ${isGenerating ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {isGenerating ? (
                  <>
                    <ZapOff className="w-5 h-5" />
                    <span>Stop Generator</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Start Generator</span>
                  </>
                )}
              </button>
              
              <div className="p-3 bg-black/30 rounded border border-purple-900/30">
                <div className="flex items-center gap-3 text-white">
                  <Atom className="w-6 h-6 text-cyan-400" />
                  <div>
                    <div>Status: <span className={isGenerating ? "text-green-400" : "text-red-400"}>
                      {isGenerating ? "Online - Generating" : "Offline - Dormant"}
                    </span></div>
                    <div className="text-xs text-gray-300">Sequence: {selectedVortexSequence}</div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm italic">
                Using vortex mathematics to convert nonlinear energy into usable power through quantum field manipulation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyGenerator;
