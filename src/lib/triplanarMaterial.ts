import { LinearSRGBColorSpace, MathUtils, MeshStandardMaterial, RepeatWrapping, ShaderChunk, SRGBColorSpace, TextureLoader } from 'three';
// import { ShaderChunk } from 'three/src/renderers/shaders/ShaderChunk';
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import getWorldPosition_Function from './shaders/getWorldPosition.glsl';
import getWorldNormal_Function from './shaders/getWorldNormal.glsl';

import structs_Fragment from './shaders/structs_FRAG.glsl';
import getSafeAxisSign_Function from './shaders/getSafeAxisSign.glsl';
import getRotatedUv_Function from './shaders/getRotatedUv.glsl';
import getTbn_Function from './shaders/getTbn.glsl';

import triplanarVertexShader from './shaders/triplanar_VERT.glsl';
import triplanarFragmentShader from './shaders/triplanar_FRAG.glsl';

const textureLoader = new TextureLoader();

const baseColorX_TEX = await textureLoader.loadAsync('/textures/Testing_Images_basecolorX.png');
baseColorX_TEX.colorSpace = SRGBColorSpace;
baseColorX_TEX.wrapS = RepeatWrapping;
baseColorX_TEX.wrapT = RepeatWrapping;

const baseColorY_TEX = await textureLoader.loadAsync('/textures/Testing_Images_basecolorY.png');
baseColorY_TEX.colorSpace = SRGBColorSpace;
baseColorY_TEX.wrapS = RepeatWrapping;
baseColorY_TEX.wrapT = RepeatWrapping;

const baseColorZ_TEX = await textureLoader.loadAsync('/textures/Testing_Images_basecolorZ.png');
baseColorZ_TEX.colorSpace = SRGBColorSpace;
baseColorZ_TEX.wrapS = RepeatWrapping;
baseColorZ_TEX.wrapT = RepeatWrapping;

const normalX_TEX = await textureLoader.loadAsync('/textures/Testing_Images_normalX.png');
normalX_TEX.colorSpace = LinearSRGBColorSpace;
normalX_TEX.wrapS = RepeatWrapping;
normalX_TEX.wrapT = RepeatWrapping;

const normalY_TEX = await textureLoader.loadAsync('/textures/Testing_Images_normalY.png');
normalY_TEX.colorSpace = LinearSRGBColorSpace;
normalY_TEX.wrapS = RepeatWrapping;
normalY_TEX.wrapT = RepeatWrapping;

const normalZ_TEX = await textureLoader.loadAsync('/textures/Testing_Images_normalZ.png');
normalZ_TEX.colorSpace = LinearSRGBColorSpace;
normalZ_TEX.wrapS = RepeatWrapping;
normalZ_TEX.wrapT = RepeatWrapping;

const roughnessX_TEX = await textureLoader.loadAsync('/textures/Testing_Images_roughnessX.png');
roughnessX_TEX.colorSpace = LinearSRGBColorSpace;
roughnessX_TEX.wrapS = RepeatWrapping;
roughnessX_TEX.wrapT = RepeatWrapping;

const roughnessY_TEX = await textureLoader.loadAsync('/textures/Testing_Images_roughnessY.png');
roughnessY_TEX.colorSpace = LinearSRGBColorSpace;
roughnessY_TEX.wrapS = RepeatWrapping;
roughnessY_TEX.wrapT = RepeatWrapping;

const roughnessZ_TEX = await textureLoader.loadAsync('/textures/Testing_Images_roughnessZ.png');
roughnessZ_TEX.colorSpace = LinearSRGBColorSpace;
roughnessZ_TEX.wrapS = RepeatWrapping;
roughnessZ_TEX.wrapT = RepeatWrapping;

const triPlanarDefaultUniforms = {
    u_mapY: {
        value: baseColorY_TEX,
    },
    u_mapZ: {
        value: baseColorZ_TEX,
    },
    u_normalMapX: {
        value: normalX_TEX,
    },
    u_normalMapY: {
        value: normalY_TEX,
    },
    u_normalMapZ: {
        value: normalZ_TEX,
    },
    u_roughnessMapX: {
        value: roughnessX_TEX,
    },
    u_roughnessMapY: {
        value: roughnessY_TEX,
    },
    u_roughnessMapZ: {
        value: roughnessZ_TEX,
    },
    u_mapScale: {
        value: 2,
    },
    u_blendExponent: {
        value: 6,
    },
    u_debug: {
        value: false,
    },
};

const createTriplanarMaterial = ({ useWorldPosition = true, useWorldNormal = true }: { useWorldPosition: boolean; useWorldNormal: boolean }) => {
    const triPlanarParams = {
        baseMaterial: MeshStandardMaterial,
        // defines: {
        //     USE_TRIPLANAR: ' ',
        // },
        map: baseColorX_TEX,
        metalness: 1,
        roughness: 0.2,
        vertexShader: getWorldPosition_Function + getWorldNormal_Function + triplanarVertexShader,
        fragmentShader: structs_Fragment + getRotatedUv_Function + getSafeAxisSign_Function + getTbn_Function + triplanarFragmentShader,
        patchMap: {
            '*': {
                '#include <normal_fragment_begin>': normal_fragment_begin_PATCHED,
            },
        },
        uniforms: {
            ...triPlanarDefaultUniforms,
            u_seWorldPosition: {
                value: useWorldPosition,
            },
            u_seWorldNormal: {
                value: useWorldNormal,
            },
        },
    };

    const triPlanarShaderMaterial = new CustomShaderMaterial(triPlanarParams);
    return triPlanarShaderMaterial;
};

const comparisonMaterial = new MeshStandardMaterial({ map: baseColorX_TEX, normalMap: normalX_TEX, metalness: 1, roughnessMap: roughnessX_TEX });

export { createTriplanarMaterial, comparisonMaterial };

const { normal_fragment_begin } = ShaderChunk;

const normal_fragment_begin_PATCHED = normal_fragment_begin.replace('vec3 normal = normalize( vNormal );', 'vec3 normal = normalize(triplanar_normal);');
