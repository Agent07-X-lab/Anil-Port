'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ParticleBackground() {
    const mountRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!mountRef.current) return;

        const handleMouseMove = (event: MouseEvent) => {
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        const starCount = 5000;
        const positions = new Float32Array(starCount * 3);
        const starVelocities = new Float32Array(starCount);

        const geometry = new THREE.BufferGeometry();

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 10;
            positions[i3 + 1] = (Math.random() - 0.5) * 10;
            positions[i3 + 2] = (Math.random() - 0.5) * 10;
            starVelocities[i] = 0.005 + Math.random() * 0.015;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const material = new THREE.PointsMaterial({
            color: '#ffffff',
            size: 0.01,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        const stars = new THREE.Points(geometry, material);
        scene.add(stars);

        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onResize);

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            const positions = stars.geometry.attributes.position.array as Float32Array;

            for (let i = 0; i < starCount; i++) {
                const i3 = i * 3;
                positions[i3 + 2] += starVelocities[i];

                if (positions[i3 + 2] > 5) {
                    positions[i3 + 2] = -5;
                }
            }

            stars.geometry.attributes.position.needsUpdate = true;
            
            // Animate camera to follow mouse
            camera.position.x += (mouse.current.x * 0.1 - camera.position.x) * 0.02;
            camera.position.y += (mouse.current.y * 0.1 - camera.position.y) * 0.02;
            camera.lookAt(scene.position);
            
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            geometry?.dispose();
            material?.dispose();
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 -z-10" />;
}
