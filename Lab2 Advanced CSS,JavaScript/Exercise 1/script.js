const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#3498db';
ctx.fillRect(50, 50, 150, 80); 

ctx.beginPath();
ctx.arc(350, 100, 40, 0, Math.PI * 2); 
ctx.fillStyle = '#e74c3c'; 
ctx.fill();

ctx.beginPath();
ctx.moveTo(50, 200);   
ctx.lineTo(450, 200);  
ctx.strokeStyle = '#2c3e50'; 
ctx.lineWidth = 5;
ctx.stroke();

ctx.font = '30px Arial';
ctx.fillStyle = '#2e53ccff'; 
ctx.textAlign = 'center';
ctx.fillText('HTML5 Canvas', canvas.width / 2, 260); 