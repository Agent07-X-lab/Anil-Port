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

        // Small colorful stars - increased for more visual impact
        const starCount = 1200;
        const positions = new Float32Array(starCount * 3);
        const starVelocities = new Float32Array(starCount);
        const starColors = new Float32Array(starCount * 3);
        const starGeometry = new THREE.BufferGeometry();

        const smallStarColors = [new THREE.Color('#ff8a5b'), new THREE.Color('#86a8e7'), new THREE.Color('#91EAE4'), new THREE.Color('#7f7fd5')];

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 10;
            positions[i3 + 1] = (Math.random() - 0.5) * 10;
            positions[i3 + 2] = (Math.random() - 0.5) * 10;
            starVelocities[i] = 0.005 + Math.random() * 0.015;

            const color = smallStarColors[Math.floor(Math.random() * smallStarColors.length)];
            starColors[i3] = color.r;
            starColors[i3 + 1] = color.g;
            starColors[i3 + 2] = color.b;
        }
        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
        
        // Custom shader for glowing colorful stars
        const starVertexShader = `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            varying float vOpacity;

            void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z) * 3.0;
                vOpacity = 1.0;
                gl_Position = projectionMatrix * mvPosition;
            }
        `;
        
        const starFragmentShader = `
            uniform float time;
            varying vec3 vColor;
            varying float vOpacity;

            void main() {
                vec2 center = gl_PointCoord - vec2(0.5);
                float dist = length(center);

                // Create glowing star effect
                float glow = 1.0 - smoothstep(0.0, 0.5, dist);
                glow = pow(glow, 0.5);

                // Add twinkling effect
                float twinkle = sin(time * 2.0) * 0.3 + 0.7;

                // Outer glow halo
                float halo = 1.0 - smoothstep(0.3, 0.8, dist);
                halo = pow(halo, 2.0) * 0.6;

                vec3 color = vColor * (glow + halo) * twinkle;
                float alpha = (glow * 0.9 + halo * 0.3) * vOpacity * twinkle;

                gl_FragColor = vec4(color, alpha);
            }
        `;
        
        const starMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 }
            },
            vertexShader: starVertexShader,
            fragmentShader: starFragmentShader,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            transparent: true,
            vertexColors: true
        });
        
        // Add size attribute for varying star sizes
        const starSizes = new Float32Array(starCount);
        for (let i = 0; i < starCount; i++) {
            starSizes[i] = 0.02 + Math.random() * 0.02;
        }
        starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
        
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // Big colorful stars
        const bigStarCount = 50;
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

        // Custom shader for glowing colorful stars
        const bigStarVertexShader = `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            varying float vOpacity;

            void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z) * 4.5;
                vOpacity = 1.0;
                gl_Position = projectionMatrix * mvPosition;
            }
        `;
        
        const bigStarFragmentShader = `
            uniform float time;
            varying vec3 vColor;
            varying float vOpacity;

            void main() {
                vec2 center = gl_PointCoord - vec2(0.5);
                float dist = length(center);

                // Create intense glowing star effect for colorful stars
                float glow = 1.0 - smoothstep(0.0, 0.6, dist);
                glow = pow(glow, 0.4);

                // Add pulsing effect
                float pulse = sin(time * 1.5 + dist * 10.0) * 0.2 + 0.8;

                // Outer glow halo with color
                float halo = 1.0 - smoothstep(0.4, 1.0, dist);
                halo = pow(halo, 1.5) * 0.8;

                vec3 finalColor = vColor * (glow * 1.5 + halo) * pulse;
                float alpha = (glow * 1.0 + halo * 0.5) * vOpacity * pulse;

                gl_FragColor = vec4(finalColor, alpha);
            }
        `;
        
        const bigStarMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 }
            },
            vertexShader: bigStarVertexShader,
            fragmentShader: bigStarFragmentShader,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            transparent: true,
            vertexColors: true
        });
        
        // Add size attribute for varying big star sizes
        const bigStarSizes = new Float32Array(bigStarCount);
        for (let i = 0; i < bigStarCount; i++) {
            bigStarSizes[i] = 0.04 + Math.random() * 0.04;
        }
        bigStarGeometry.setAttribute('size', new THREE.BufferAttribute(bigStarSizes, 1));
        
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

            // Update shader time uniforms for glow animation
            if (starMaterial.uniforms) {
                starMaterial.uniforms.time.value = elapsedTime;
            }
            if (bigStarMaterial.uniforms) {
                bigStarMaterial.uniforms.time.value = elapsedTime;
            }

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

            // Shader error checking (only in development)
            if (process.env.NODE_ENV === 'development') {
                const gl = renderer.getContext();
                const starProgram = (starMaterial as any).program;
                if (starProgram && !gl.getProgramParameter(starProgram, gl.LINK_STATUS)) {
                    const infoLog = gl.getProgramInfoLog(starProgram);
                    if (infoLog) {
                        console.error('Star program error:', infoLog);
                    }
                }
                const bigStarProgram = (bigStarMaterial as any).program;
                if (bigStarProgram && !gl.getProgramParameter(bigStarProgram, gl.LINK_STATUS)) {
                    const infoLog = gl.getProgramInfoLog(bigStarProgram);
                    if (infoLog) {
                        console.error('Big star program error:', infoLog);
                    }
                }
            }
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
