import { MeshStandardMaterial, MeshStandardMaterialParameters, ShaderChunk, Texture } from 'three';
import CustomShaderMaterial, { CSMPatchMap } from 'three-custom-shader-material/vanilla';
import triplanarVertexShader from './shaders/triplanar_VERT.glsl';
import triplanarFragmentShader from './shaders/triplanar_FRAG.glsl';
import { testTextures } from './loadTextures';

const { normal_fragment_begin } = ShaderChunk;
const normal_fragment_begin_PATCHED = normal_fragment_begin.replace('vec3 normal = normalize( vNormal );', 'vec3 normal = normalize(triplanar_normal);');

const { mapX, mapY, mapZ, normalMapX, normalMapY, normalMapZ, roughnessMapX, roughnessMapY, roughnessMapZ } = testTextures;

export const triplanarDefaultUniforms: TriplanarUniforms = {
    u_mapY: {
        value: mapY,
    },
    u_mapZ: {
        value: mapZ,
    },
    u_normalMapX: {
        value: normalMapX,
    },
    u_normalMapY: {
        value: normalMapY,
    },
    u_normalMapZ: {
        value: normalMapZ,
    },
    u_roughnessMapX: {
        value: roughnessMapX,
    },
    u_roughnessMapY: {
        value: roughnessMapY,
    },
    u_roughnessMapZ: {
        value: roughnessMapZ,
    },
    u_mapScale: {
        value: 2,
    },
    u_blendExponent: {
        value: 6,
    },
};

const triplanarDefaults: TriplanarDefaults = {
    baseMaterial: MeshStandardMaterial,
    map: mapX,
    metalness: 1,
    roughness: 0.2,
    vertexShader: triplanarVertexShader,
    fragmentShader: triplanarFragmentShader,
    patchMap: {
        '*': {
            '#include <normal_fragment_begin>': normal_fragment_begin_PATCHED,
        },
    },
    uniforms: triplanarDefaultUniforms,
};

const createTriplanarMaterial = (params: TriplanarParams) => new CustomShaderMaterial({ ...triplanarDefaults, ...params });

export { createTriplanarMaterial };

// Types

type TriplanarParams = Pick<MeshStandardMaterialParameters, 'map' | 'metalness' | 'roughness'> & {
    uniforms: TriplanarUniforms;
};

type TriplanarDefaults = TriplanarParams & {
    baseMaterial: typeof MeshStandardMaterial;
    vertexShader: string;
    fragmentShader: string;
    patchMap: CSMPatchMap;
};

type TriplanarUniforms = {
    u_mapY: {
        value: Texture;
    };
    u_mapZ: {
        value: Texture;
    };
    u_normalMapX: {
        value: Texture;
    };
    u_normalMapY: {
        value: Texture;
    };
    u_normalMapZ: {
        value: Texture;
    };
    u_roughnessMapX: {
        value: Texture;
    };
    u_roughnessMapY: {
        value: Texture;
    };
    u_roughnessMapZ: {
        value: Texture;
    };
    u_mapScale: {
        value: number;
    };
    u_blendExponent: {
        value: number;
    };
};
