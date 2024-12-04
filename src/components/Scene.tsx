import { OrbitControls, RoundedBox } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const Scene = () => {
    return (
        <Canvas>
            <OrbitControls />
            <ambientLight intensity={0.1} />
            <directionalLight color='red' position={[0, 0, 5]} />

            <RoundedBox args={[1, 1, 1]} radius={0.05} smoothness={4} bevelSegments={4} creaseAngle={0.4}>
                <meshPhongMaterial color='#f3f3f3' wireframe />
            </RoundedBox>
        </Canvas>
    );
};

export default Scene;
