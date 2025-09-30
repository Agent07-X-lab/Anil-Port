'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ParticleBackground() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 100;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        const particlesCount = 5000;
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);
        const particleProps = new Float32Array(particlesCount * 2); // angle, radius

        const color = new THREE.Color();

        for (let i = 0; i < particlesCount; i++) {
            const radius = Math.random() * 200 + 5;
            const angle = Math.random() * Math.PI * 2;
            
            positions[i * 3] = radius * Math.cos(angle);
            positions[i * 3 + 1] = radius * Math.sin(angle);
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // small z variation

            particleProps[i * 2] = angle;
            particleProps[i * 2 + 1] = radius;
            
            color.setHSL(Math.random() * 0.2 + 0.5, 0.8, 0.6);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('particleProps', new THREE.BufferAttribute(particleProps, 2));
        
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
            const propsAttribute = particles.geometry.getAttribute('particleProps');

            for (let i = 0; i < particlesCount; i++) {
                let angle = propsAttribute.getX(i);
                let radius = propsAttribute.getY(i);
                
                // speed is higher for particles closer to the center
                const angularSpeed = 0.5 / (radius * 0.1 + 1); 
                angle += angularSpeed * delta;
                
                // pull particles to the center
                radius -= 2 * delta;

                // reset particles that reach the center
                if (radius < 1) {
                    radius = Math.random() * 150 + 50;
                    angle = Math.random() * Math.PI * 2;
                }

                positionAttribute.setX(i, radius * Math.cos(angle));
                positionAttribute.setY(i, radius * Math.sin(angle));
                
                propsAttribute.setX(i, angle);
                propsAttribute.setY(i, radius);
            }
            positionAttribute.needsUpdate = true;
            propsAttribute.needsUpdate = true;
            
            particles.rotation.z += 0.0005;
            
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
