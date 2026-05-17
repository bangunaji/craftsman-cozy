import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ForgeBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0f172a, 0.05);

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 15;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);

        const bottomLight = new THREE.PointLight(0xf59e0b, 8, 30);
        bottomLight.position.set(0, -10, 5);
        scene.add(bottomLight);

        const topLight = new THREE.PointLight(0x3b82f6, 3, 30);
        topLight.position.set(0, 15, 5);
        scene.add(topLight);

        // Embers / Particles setup
        const particleCount = 200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const colors = new Float32Array(particleCount * 3);

        const colorPalette = [
            new THREE.Color(0xf59e0b), // Amber
            new THREE.Color(0xef4444), // Red
            new THREE.Color(0x10b981), // Emerald (rare Pi forge ember)
            new THREE.Color(0xd97706)  // Dark amber
        ];

        for (let i = 0; i < particleCount; i++) {
            // Position
            positions[i * 3] = (Math.random() - 0.5) * 30;     // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15; // z

            // Velocity (drifting upward and swirling)
            velocities[i * 3] = (Math.random() - 0.5) * 0.02;  // vx
            velocities[i * 3 + 1] = 0.02 + Math.random() * 0.05; // vy
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02; // vz

            sizes[i] = Math.random() * 3 + 1;

            const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = col.r;
            colors[i * 3 + 1] = col.g;
            colors[i * 3 + 2] = col.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        // Create custom circular texture for glowing particles
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
        const pTexture = new THREE.CanvasTexture(canvas);

        const material = new THREE.PointsMaterial({
            size: 0.8,
            map: pTexture,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            transparent: true,
            opacity: 0.8
        });

        const particleSystem = new THREE.Points(geometry, material);
        scene.add(particleSystem);

        // Animation loop
        let animationFrameId;
        let clock = new THREE.Clock();

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            const elapsedTime = clock.getElapsedTime();
            const posAttr = geometry.attributes.position;
            const posArr = posAttr.array;

            for (let i = 0; i < particleCount; i++) {
                // Update position
                posArr[i * 3] += velocities[i * 3];
                posArr[i * 3 + 1] += velocities[i * 3 + 1];
                posArr[i * 3 + 2] += velocities[i * 3 + 2];

                // Add slight sine wave wobble to X and Z
                posArr[i * 3] += Math.sin(elapsedTime * 2 + i) * 0.005;

                // Reset particle if it floats too high
                if (posArr[i * 3 + 1] > 15) {
                    posArr[i * 3 + 1] = -15;
                    posArr[i * 3] = (Math.random() - 0.5) * 30;
                }
            }
            posAttr.needsUpdate = true;

            // Slow camera breathing effect
            camera.position.x = Math.sin(elapsedTime * 0.3) * 0.5;
            camera.position.y = Math.cos(elapsedTime * 0.2) * 0.5;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        const handleResize = () => {
            if (!container) return;
            const width = window.innerWidth;
            const height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            pTexture.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div 
            ref={mountRef} 
            style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                zIndex: 0, 
                pointerEvents: 'none' 
            }} 
        />
    );
};
