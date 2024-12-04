import { MeshStandardMaterial, ShaderChunk, ShaderMaterial } from 'three';
// import { ShaderChunk } from 'three/src/renderers/shaders/ShaderChunk';
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import triplanarVertexShader from './shaders/triplanar_VERT.glsl';
import triplanarFragmentShader from './shaders/triplanar_FRAG.glsl';

export type TriPlanarDefaultUniforms = typeof triPlanarDefaultUniforms;

export const triPlanarDefaultUniforms = {
    u_polishedMaterialRoughnessValue: {
        value: 0.05,
    },
    u_mapScale: {
        value: 250,
    },
    u_blendExponent: {
        value: 2,
    },
    u_debug: {
        value: false,
    },
};

/**
 * Creates a triplanar shader material with custom properties.
 *
 * @param {Partial<MetalMaterial>} params - Parameters to customize the material.
 * @returns {MetalMaterial} A MetalMaterial instance with triplanar mapping and custom shaders.
 *
 * @description
 * This function generates a MetalMaterial using the CustomShaderMaterial class, configured with
 * triplanar mapping shaders. It allows for custom properties such as color, metalness, roughness, and various maps.
 */
export const createTriplanarMaterial = (params: Partial<MeshStandardMaterial & ShaderMaterial>) => {
    const { map, metalness, roughness, uniforms } = params;

    const triPlanarParams = {
        baseMaterial: MeshStandardMaterial,
        // defines: {
        //     USE_TRIPLANAR: getOrthogonalVector_FUNCTION + createTriPlTBN_FUNCTION,
        // },
        map,
        metalness,
        roughness,
        vertexShader: triplanarVertexShader,
        fragmentShader: triplanarFragmentShader,
        uniforms,
    };

    const triPlanarShaderMaterial = new CustomShaderMaterial(triPlanarParams);
    return triPlanarShaderMaterial;
};

const { normal_fragment_maps } = ShaderChunk;

const normal_fragment_maps_PATCHED = normal_fragment_maps.replace(
    /* We - mostly - do not have tangents, yet need to transform the resulting mapN (triPlanarNormalsOS) by a TBN matrix - so we build one. Should probably be doing this on CPU (how?) */
    '#elif defined( USE_NORMALMAP_TANGENTSPACE )',
    /* glsl */ `
    // BEGIN patched normal_fragment_maps

    #elif defined ( USE_TRIPLANAR )

        vec3 existingNormal = normal;

        mat3 triPlanarTBN = createTriPlTBN(normal);
        csm_TangentTriPlanarNormals.xy *= normalScale;

        vec3 triPlanarNormalsOS = normalize(triPlanarTBN * csm_TangentTriPlanarNormals);

        // Would prefer to do this in fragmentShader, but at that point in shader execution, we do not have correct 'rest-normals' yet
        normal = mix(existingNormal, triPlanarNormalsOS, vIsPointingOutwards); 

    #elif defined ( USE_NORMALMAP_TANGENTSPACE )

    // END patched normal_fragment_maps
    `,
);
