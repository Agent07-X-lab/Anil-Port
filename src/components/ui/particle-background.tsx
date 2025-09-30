'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ParticleBackground() {
    const mountRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 200;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        const particlesCount = 200;
        const positions = new Float32Array(particlesCount * 3);
        const velocities = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount; i++) {
            positions[i * 3] = (Math.random() * 2 - 1) * 300;
            positions[i * 3 + 1] = (Math.random() * 2 - 1) * 300;
            positions[i * 3 + 2] = (Math.random() * 2 - 1) * 300;

            velocities[i * 3] = (Math.random() - 0.5) * 0.2;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({ color: '#00f5ff', size: 1.5, transparent: true, opacity: 0.7 });
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        const linesGeometry = new THREE.BufferGeometry();
        const linesMaterial = new THREE.LineBasicMaterial({ color: '#00f5ff', transparent: true, opacity: 0.1 });
        const linePositions = new Float32Array(particlesCount * particlesCount * 3);
        linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
        scene.add(lines);

        const onMouseMove = (event: MouseEvent) => {
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', onMouseMove);

        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onResize);

        const animate = () => {
            requestAnimationFrame(animate);

            const positionAttribute = particles.geometry.getAttribute('position');
            const linePositionAttribute = lines.geometry.getAttribute('position');
            let lineVertexIndex = 0;

            for (let i = 0; i < particlesCount; i++) {
                positionAttribute.setX(i, positionAttribute.getX(i) + velocities[i * 3]);
                positionAttribute.setY(i, positionAttribute.getY(i) + velocities[i * 3 + 1]);
                positionAttribute.setZ(i, positionAttribute.getZ(i) + velocities[i * 3 + 2]);

                if (positionAttribute.getX(i) > 300 || positionAttribute.getX(i) < -300) velocities[i * 3] *= -1;
                if (positionAttribute.getY(i) > 300 || positionAttribute.getY(i) < -300) velocities[i * 3 + 1] *= -1;
                if (positionAttribute.getZ(i) > 300 || positionAttribute.getZ(i) < -300) velocities[i * 3 + 2] *= -1;

                for (let j = i + 1; j < particlesCount; j++) {
                    const dx = positionAttribute.getX(i) - positionAttribute.getX(j);
                    const dy = positionAttribute.getY(i) - positionAttribute.getY(j);
                    const dz = positionAttribute.getZ(i) - positionAttribute.getZ(j);
                    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (distance < 50) {
                        linePositionAttribute.setXYZ(lineVertexIndex++, positionAttribute.getX(i), positionAttribute.getY(i), positionAttribute.getZ(i));
                        linePositionAttribute.setXYZ(lineVertexIndex++, positionAttribute.getX(j), positionAttribute.getY(j), positionAttribute.getZ(j));
                    }
                }
            }
            linePositionAttribute.needsUpdate = true;
            (lines.geometry as THREE.BufferGeometry).setDrawRange(0, lineVertexIndex);

            positionAttribute.needsUpdate = true;
            
            camera.position.x += (mouse.current.x * 50 - camera.position.x) * 0.05;
            camera.position.y += (-mouse.current.y * 50 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            mountRef.current?.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 -z-10" />;
}
