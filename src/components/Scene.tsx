import { Backdrop, Environment, OrbitControls, RoundedBox, Sphere } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { comparisonMaterial, createTriplanarMaterial } from '../lib/triplanarMaterial';
import { MathUtils, MeshStandardMaterial } from 'three';

const triplanar_MAT = createTriplanarMaterial({ useWorldPosition: false, useWorldNormal: false });
const triplanarWorldNormal_MAT = createTriplanarMaterial({ useWorldPosition: false, useWorldNormal: true });
const triplanarAllWorld_MAT = createTriplanarMaterial({ useWorldPosition: true, useWorldNormal: true });

const Scene = () => {
    return (
        <Canvas shadows={true}>
            <OrbitControls />
            <directionalLight color='white' position={[2, 4, 2]} intensity={1} castShadow />
            <directionalLight color='white' position={[-2, 4, -2]} intensity={1} castShadow />
            <Environment preset='city' background />

            <Sphere args={[1.1]} position={[-2.5, 2, -1]} material={triplanarWorldNormal_MAT} castShadow />
            <Sphere args={[1.1]} position={[-4.5, 1.5, 0]} material={triplanarWorldNormal_MAT} castShadow />

            <Sphere args={[1.1]} position={[-2, 2.5, 5]} material={triplanar_MAT} castShadow />
            <Sphere args={[1.1]} position={[-4.5, 2.5, 4]} material={comparisonMaterial} castShadow />

            <RoundedBox
                args={[2, 2, 2]}
                rotation={[MathUtils.degToRad(45), MathUtils.degToRad(45), 0]}
                position={[-1.5, 6, 4]}
                radius={0.1}
                bevelSegments={4}
                creaseAngle={0.5}
                material={triplanar_MAT}
                castShadow
            />
            <RoundedBox
                args={[2, 2, 2]}
                rotation={[MathUtils.degToRad(45), MathUtils.degToRad(45), 0]}
                position={[1.5, 6, 4]}
                radius={0.1}
                bevelSegments={4}
                creaseAngle={0.5}
                material={comparisonMaterial}
                castShadow
            />

            <RoundedBox
                args={[2, 2, 2]}
                position={[5, 5, 4]}
                radius={0.1}
                bevelSegments={4}
                creaseAngle={0.5}
                material={new MeshStandardMaterial({ roughness: 0.05, metalness: 1, color: 'white' })}
                castShadow
            />
            <RoundedBox args={[2, 2, 2]} position={[5, 7.5, 4]} radius={0.1} bevelSegments={4} creaseAngle={0.5} material={triplanar_MAT} castShadow />
            <RoundedBox args={[2, 2, 2]} position={[5, 2.5, 4]} radius={0.1} bevelSegments={4} creaseAngle={0.5} material={comparisonMaterial} castShadow />

            <RoundedBox args={[2, 2, 2]} position={[3, 2, -1]} radius={0.1} bevelSegments={4} creaseAngle={0.5} material={triplanarAllWorld_MAT} castShadow />
            <RoundedBox args={[2, 2, 2]} position={[5, 1.5, 0]} radius={0.1} bevelSegments={4} creaseAngle={0.5} material={triplanarAllWorld_MAT} castShadow />

            <axesHelper args={[10]} />
            <Backdrop
                floor={1.2} // Stretches the floor segment, 0.25 by default
                segments={20} // Mesh-resolution, 20 by default
                scale={[15, 5, 5]}
                position={[0, 0, -1]}
                receiveShadow
            >
                <meshStandardMaterial color='#353540' />
            </Backdrop>
        </Canvas>
    );
};

export default Scene;
