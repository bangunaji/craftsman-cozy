import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Ore3DView = ({ oreType, onMine }) => {
    const containerRef = useRef(null);
    const meshRef = useRef(null);
    const sparksRef = useRef([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const width = container.clientWidth || 240;
        const height = container.clientHeight || 240;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.z = 6;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xffffff, 2, 20);
        pointLight1.position.set(5, 5, 5);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(
            oreType === 'crystal' ? 0x06b6d4 : 0xf59e0b, 
            3, 
            20
        );
        pointLight2.position.set(-5, -5, 2);
        scene.add(pointLight2);

        // Geometry & Material per oreType
        let geometry, material;

        if (oreType === 'stone') {
            geometry = new THREE.DodecahedronGeometry(1.8, 1);
            material = new THREE.MeshStandardMaterial({
                color: 0x64748b, // Slate grey
                roughness: 0.9,
                metalness: 0.1,
                bumpScale: 0.05
            });
        } else if (oreType === 'iron') {
            // Clustered octahedrons
            geometry = new THREE.OctahedronGeometry(1.6, 0);
            material = new THREE.MeshStandardMaterial({
                color: 0x94a3b8, // Metallic silver
                roughness: 0.3,
                metalness: 0.85,
                emissive: 0x1e293b
            });
        } else {
            // Crystal (Gemstone octahedron)
            geometry = new THREE.OctahedronGeometry(1.7, 1);
            material = new THREE.MeshPhysicalMaterial({
                color: 0x96c8f3, // Pastel Cyan
                emissive: 0x4fa8d1,
                emissiveIntensity: 0.2,
                roughness: 0.1,
                metalness: 0.1,
                transparent: false,
                opacity: 1,
                wireframe: false
            });
        }

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        meshRef.current = mesh;

        // Animation Loop
        let animationFrameId;
        let clock = new THREE.Clock();
        let targetScale = new THREE.Vector3(1, 1, 1);
        let currentScale = new THREE.Vector3(1, 1, 1);

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const delta = clock.getDelta();
            const elapsed = clock.getElapsedTime();

            if (mesh) {
                // Gentle floating rotation
                mesh.rotation.y += delta * 0.5;
                mesh.rotation.x = Math.sin(elapsed * 1.5) * 0.2;
                mesh.position.y = Math.sin(elapsed * 2) * 0.15;

                // Scale lerp for click impact bounce
                currentScale.lerp(targetScale, 0.2);
                mesh.scale.copy(currentScale);
            }

            renderer.render(scene, camera);
        };
        animate();

        // Trigger Impact Function
        meshRef.current.triggerImpact = () => {
            // Impact scale bounce
            currentScale.set(0.75, 0.75, 0.75);
            targetScale.set(1, 1, 1);
        };

        const handleResize = () => {
            if (!container) return;
            const newW = container.clientWidth || 240;
            const newH = container.clientHeight || 240;
            camera.aspect = newW / newH;
            camera.updateProjectionMatrix();
            renderer.setSize(newW, newH);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, [oreType]);

    const handleClick = (e) => {
        if (meshRef.current && meshRef.current.triggerImpact) {
            meshRef.current.triggerImpact();
        }
        if (onMine) {
            onMine(e);
        }
    };

    return (
        <div 
            ref={containerRef} 
            onClick={handleClick}
            style={{ 
                width: '220px', 
                height: '220px', 
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto',
                filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.2))'
            }} 
        />
    );
};
