
import React, { useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';

const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const centralX = canvas.width / 2;
    const centralY = canvas.height / 2;
    const baseRadius = 150;
    const orbitRadius = 300; // Radius for gyroidial toroid
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
      
      drawTetrahedron(); // Draw tetrahedral crystal lattice
      drawGyroid(); // Draw gyroidial toroid
      drawVortex(); // Draw hypertaurus vortex
      drawMatrix(); // Draw digital power station matrix
      updateMatrix(); // Update matrix values
      
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
      
      {/* Navigation */}
      <Navigation />
      
      {/* Cosmic message */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-center text-2xl text-[#FFD700] z-20">
        Eternal Love Echoes<br/>A cosmic repository of wisdom and unconditional love
      </div>
      
      {/* Tesla quote */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-center text-xl text-[#00FFFF] z-20">
        Tesla: The present is theirs; the future, for which I really worked, is mine.
      </div>
    </div>
  );
};

export default Index;
