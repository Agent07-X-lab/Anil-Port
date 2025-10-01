'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ParticleBackground() {
    const mountRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const start = performance.now();
        console.log('ParticleBackground: Starting setup');

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

        // Small white stars
        const starCount = 1000;
        const positions = new Float32Array(starCount * 3);
        const starVelocities = new Float32Array(starCount);
        const starGeometry = new THREE.BufferGeometry();

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 10;
            positions[i3 + 1] = (Math.random() - 0.5) * 10;
            positions[i3 + 2] = (Math.random() - 0.5) * 10;
            starVelocities[i] = 0.005 + Math.random() * 0.015;
        }
        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const starMaterial = new THREE.PointsMaterial({
            color: '#ffffff',
            size: 0.01,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // Big colorful stars
        const bigStarCount = 20;
        const bigPositions = new Float32Array(bigStarCount * 3);
        const bigColors = new Float32Array(bigStarCount * 3);
        const bigStarVelocities = new Float32Array(bigStarCount);
        const bigStarGeometry = new THREE.BufferGeometry();
        const colors = [new THREE.Color('#ff8a5b'), new THREE.Color('#86a8e7'), new THREE.Color('#91EAE4'), new THREE.Color('#7f7fd5')];

        for (let i = 0; i < bigStarCount; i++) {
            const i3 = i * 3;
            bigPositions[i3] = (Math.random() - 0.5) * 12;
            bigPositions[i3 + 1] = (Math.random() - 0.5) * 12;
            bigPositions[i3 + 2] = (Math.random() - 0.5) * 10;
            bigStarVelocities[i] = 0.002 + Math.random() * 0.008;

            const color = colors[Math.floor(Math.random() * colors.length)];
            bigColors[i3] = color.r;
            bigColors[i3 + 1] = color.g;
            bigColors[i3 + 2] = color.b;
        }
        bigStarGeometry.setAttribute('position', new THREE.BufferAttribute(bigPositions, 3));
        bigStarGeometry.setAttribute('color', new THREE.BufferAttribute(bigColors, 3));

        const bigStarMaterial = new THREE.PointsMaterial({
            size: 0.08,
            vertexColors: true,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
        const bigStars = new THREE.Points(bigStarGeometry, bigStarMaterial);
        scene.add(bigStars);


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

            // Animate small stars
            const positions = stars.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < starCount; i++) {
                const i3 = i * 3;
                positions[i3 + 2] += starVelocities[i];
                if (positions[i3 + 2] > 5) {
                    positions[i3 + 2] = -5;
                }
            }
            stars.geometry.attributes.position.needsUpdate = true;
            
            // Animate big stars
            const bigPositions = bigStars.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < bigStarCount; i++) {
                const i3 = i * 3;
                bigPositions[i3 + 2] += bigStarVelocities[i];
                if (bigPositions[i3 + 2] > 5) {
                    bigPositions[i3 + 2] = -5;
                }
            }
            bigStars.geometry.attributes.position.needsUpdate = true;

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
            starGeometry?.dispose();
            starMaterial?.dispose();
            bigStarGeometry?.dispose();
            bigStarMaterial?.dispose();
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 -z-10" />;
}
