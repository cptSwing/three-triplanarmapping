import { Backdrop, Environment, OrbitControls, RoundedBox, Sphere } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { createTriplanarMaterial } from '../lib/triplanarMaterial';
import { MathUtils, MeshStandardMaterial } from 'three';
import { testTextures, terrainTextures, metalTextures } from '../lib/loadTextures';
import { TeapotGeometry } from 'three-stdlib';
import { useMemo } from 'react';

const mirrorMaterial = new MeshStandardMaterial({ metalness: 1, roughness: 0 });

const testing_triplanarParams = {
    map: testTextures.mapX,
    metalness: 1,
    roughness: 0.2,
    uniforms: {
        u_mapY: {
            value: testTextures.mapY,
        },
        u_mapZ: {
            value: testTextures.mapZ,
        },
        u_normalMapX: {
            value: testTextures.normalMapX,
        },
        u_normalMapY: {
            value: testTextures.normalMapY,
        },
        u_normalMapZ: {
            value: testTextures.normalMapZ,
        },
        u_roughnessMapX: {
            value: testTextures.roughnessMapX,
        },
        u_roughnessMapY: {
            value: testTextures.roughnessMapY,
        },
        u_roughnessMapZ: {
            value: testTextures.roughnessMapZ,
        },
        u_mapScale: {
            value: 1.7125,
        },
        u_blendExponent: {
            value: 6,
        },
    },
};

const terrain_triplanarParams = {
    map: terrainTextures.mapX,
    metalness: 0,
    roughness: 0.2,
    uniforms: {
        u_mapY: {
            value: terrainTextures.mapY,
        },
        u_mapZ: {
            value: terrainTextures.mapZ,
        },
        u_normalMapX: {
            value: terrainTextures.normalMapX,
        },
        u_normalMapY: {
            value: terrainTextures.normalMapY,
        },
        u_normalMapZ: {
            value: terrainTextures.normalMapZ,
        },
        u_roughnessMapX: {
            value: terrainTextures.roughnessMapX,
        },
        u_roughnessMapY: {
            value: terrainTextures.roughnessMapY,
        },
        u_roughnessMapZ: {
            value: terrainTextures.roughnessMapZ,
        },
        u_mapScale: {
            value: 1,
        },
        u_blendExponent: {
            value: 6,
        },
    },
};

const metal_triplanarParams = {
    map: metalTextures.mapX,
    metalness: 1,
    roughness: 0.2,
    uniforms: {
        u_mapY: {
            value: metalTextures.mapY,
        },
        u_mapZ: {
            value: metalTextures.mapZ,
        },
        u_normalMapX: {
            value: metalTextures.normalMapX,
        },
        u_normalMapY: {
            value: metalTextures.normalMapY,
        },
        u_normalMapZ: {
            value: metalTextures.normalMapZ,
        },
        u_roughnessMapX: {
            value: metalTextures.roughnessMapX,
        },
        u_roughnessMapY: {
            value: metalTextures.roughnessMapY,
        },
        u_roughnessMapZ: {
            value: metalTextures.roughnessMapZ,
        },
        u_mapScale: {
            value: 0.5,
        },
        u_blendExponent: {
            value: 6,
        },
    },
};

const testing_triplanar_MAT = createTriplanarMaterial(testing_triplanarParams);
const terrain_triplanar_MAT = createTriplanarMaterial(terrain_triplanarParams);
const metal_triplanar_MAT = createTriplanarMaterial(metal_triplanarParams);

const Scene = () => {
    const teapotGeo_Memo = useMemo(() => new TeapotGeometry(2), []);

    return (
        <Canvas shadows={true}>
            <OrbitControls />
            <directionalLight color='white' position={[3, 7, 2]} intensity={1} castShadow target-position={[0, 0, 0]}>
                <orthographicCamera attach='shadow-camera' args={[-12.5, 12.5, 12.5, -12.5]} />
            </directionalLight>
            <directionalLight color='white' position={[-1, 5, 2]} intensity={0.3} target-position={[0, 0, 0]} />
            <directionalLight color='white' position={[0, 3, -3]} intensity={0.5} target-position={[0, 0, 0]} />

            <RoundedBox args={[2.5, 2.5, 2.5]} position={[0, 7.5, 4.5]} radius={0.25} bevelSegments={4} creaseAngle={0.5} material={testing_triplanar_MAT} />

            <Sphere args={[1.5]} position={[-5.5, 4, 0.5]} rotation={[0, MathUtils.degToRad(90), 0]} material={terrain_triplanar_MAT} castShadow />
            <mesh position={[0, 4.5, 0]} rotation={[0, MathUtils.degToRad(-45), 0]} geometry={teapotGeo_Memo} material={terrain_triplanar_MAT} castShadow />
            <RoundedBox
                args={[2.5, 2.5, 2.5]}
                position={[5.5, 4, 0.5]}
                radius={0.2}
                bevelSegments={4}
                creaseAngle={0.5}
                material={terrain_triplanar_MAT}
                castShadow
            />

            <Sphere args={[1.5]} position={[-5.5, 2, 8]} rotation={[0, MathUtils.degToRad(90), 0]} material={metal_triplanar_MAT} castShadow />
            <mesh position={[0, 2.5, 8]} rotation={[0, MathUtils.degToRad(-135), 0]} geometry={teapotGeo_Memo} material={metal_triplanar_MAT} castShadow />
            <RoundedBox
                args={[2.5, 2.5, 2.5]}
                position={[5.5, 2, 8]}
                radius={0.05}
                bevelSegments={4}
                creaseAngle={0.5}
                material={metal_triplanar_MAT}
                castShadow
            />

            <RoundedBox args={[5, 4, 3]} position={[0, 9, -6]} material={mirrorMaterial} />

            <axesHelper args={[5]} position={[0, 9, -6]} />

            <Backdrop floor={1.5} segments={20} scale={[20, 6, 7]} position={[0, 0, -1]} receiveShadow>
                <meshStandardMaterial color='#353540' />
            </Backdrop>
            <Environment preset='city' background />
        </Canvas>
    );
};

export default Scene;
