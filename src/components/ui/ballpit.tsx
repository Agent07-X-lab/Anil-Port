'use client';

import React, { useRef, useEffect } from 'react';

const Ballpit: React.FC<{
  count?: number;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  followCursor?: boolean;
  minRadius?: number;
  maxRadius?: number;
}> = ({
  count = 50,
  gravity = 0,
  friction = 0.98,
  wallBounce = 0.9,
  followCursor = true,
  minRadius = 20,
  maxRadius = 35
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const balls = useRef<any[]>([]);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      if(!canvas.parentElement) return;
      canvas.width = canvas.parentElement!.clientWidth;
      canvas.height = canvas.parentElement!.clientHeight;
    };
    resizeCanvas();

    if (balls.current.length === 0) {
      for (let i = 0; i < count; i++) {
        balls.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: Math.random() * (maxRadius - minRadius) + minRadius,
          color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        });
      }
    }
    
    const handleMouseMove = (e: MouseEvent) => {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        mouse.current.x = e.clientX - rect.left;
        mouse.current.y = e.clientY - rect.top;
    };
    
    if (followCursor) {
        window.addEventListener('mousemove', handleMouseMove);
    }
    
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balls.current.forEach(ball => {
        // Gravity
        ball.vy += gravity;

        // Mouse interaction
        if(followCursor) {
            const dx = ball.x - mouse.current.x;
            const dy = ball.y - mouse.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                const angle = Math.atan2(dy, dx);
                ball.vx += Math.cos(angle) * 1.5;
                ball.vy += Math.sin(angle) * 1.5;
            }
        }
        
        // Friction
        ball.vx *= friction;
        ball.vy *= friction;

        // Update position
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Wall bounce
        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
          ball.vx *= -wallBounce;
          ball.x = ball.x - ball.radius < 0 ? ball.radius : canvas.width - ball.radius;
        }
        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
          ball.vy *= -wallBounce;
          ball.y = ball.y - ball.radius < 0 ? ball.radius : canvas.height - ball.radius;
        }


        // Draw ball
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
      });


      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      if (followCursor) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [count, gravity, friction, wallBounce, followCursor, minRadius, maxRadius]);

  return <canvas ref={canvasRef} />;
};

export default Ballpit;
