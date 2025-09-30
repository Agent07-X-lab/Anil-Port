'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ParticleBackground() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        const particlesCount = 5000;
        const positions = new Float32Array(particlesCount * 3);
        const velocities = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);

        const color = new THREE.Color();

        for (let i = 0; i < particlesCount; i++) {
            const radius = Math.random() * 200 + 5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            
            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            velocities[i * 3] = 0;
            velocities[i * 3 + 1] = 0;
            velocities[i * 3 + 2] = 0;
            
            color.setHSL(Math.random() * 0.2 + 0.5, 0.8, 0.6);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({ 
            size: 0.5, 
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
        });
        
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onResize);

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            
            const positionAttribute = particles.geometry.getAttribute('position');
            const velocityAttribute = particles.geometry.getAttribute('velocity');

            for (let i = 0; i < particlesCount; i++) {
                const x = positionAttribute.getX(i);
                const y = positionAttribute.getY(i);
                const z = positionAttribute.getZ(i);

                const distance = Math.sqrt(x*x + y*y + z*z);
                
                // Gravitational pull towards the center
                const gravity = -0.5 / (distance * distance + 1);
                
                velocityAttribute.setX(i, velocityAttribute.getX(i) + x * gravity * delta);
                velocityAttribute.setY(i, velocityAttribute.getY(i) + y * gravity * delta);
                velocityAttribute.setZ(i, velocityAttribute.getZ(i) + z * gravity * delta);
                
                positionAttribute.setX(i, x + velocityAttribute.getX(i));
                positionAttribute.setY(i, y + velocityAttribute.getY(i));
                positionAttribute.setZ(i, z + velocityAttribute.getZ(i));

                // Reset particles that get too close to the center
                if (distance < 1) {
                    const radius = Math.random() * 200 + 50;
                    const theta = Math.random() * Math.PI * 2;
                    const phi = Math.acos((Math.random() * 2) - 1);
                    positionAttribute.setX(i, radius * Math.sin(phi) * Math.cos(theta));
                    positionAttribute.setY(i, radius * Math.sin(phi) * Math.sin(theta));
                    positionAttribute.setZ(i, radius * Math.cos(phi));
                    velocityAttribute.setXYZ(i, 0, 0, 0);
                }
            }
            positionAttribute.needsUpdate = true;
            
            particles.rotation.y += 0.0005;
            
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('resize', onResize);
            mountRef.current?.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 -z-10" />;
}
