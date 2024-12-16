#include ./triBlend.frag;
#include /node_modules/glsl-functions/fragment/safeSign.frag;

uniform sampler2D u_mapY;
uniform sampler2D u_mapZ;
uniform sampler2D u_normalMapX;
uniform sampler2D u_normalMapY;
uniform sampler2D u_normalMapZ;
uniform sampler2D u_roughnessMapX;
uniform sampler2D u_roughnessMapY;
uniform sampler2D u_roughnessMapZ;
uniform float u_mapScale;
uniform float u_blendExponent;

varying vec3 csm_vPosition;
varying vec3 csm_vNormal;

// UDN Blend, as described here: https://github.com/bgolus/Normal-Mapping-for-a-Triplanar-Shader/blob/master/TriplanarUDN.shader
void main() {
    vec3 blending_factor = triBlend(csm_vNormal, u_blendExponent);

    vec2 uvX = csm_vPosition.zy * u_mapScale;
    vec2 uvY = csm_vPosition.xz * u_mapScale;
    vec2 uvZ = csm_vPosition.xy * u_mapScale;

    // flip mirrored uv's
    vec3 axisSign = safeSign(csm_vNormal);
    uvX.x *= -axisSign.x;
    uvY.x *= -axisSign.y;
    uvZ.x *= axisSign.z;

    // --> COLOR

    // get color values at texture, blend
    vec3 color_X = texture(map, uvX).rgb * blending_factor.x;
    vec3 color_Y = texture(u_mapY, uvY).rgb * blending_factor.y;
    vec3 color_Z = texture(u_mapZ, uvZ).rgb * blending_factor.z;

    // add blended color values for each axis, pass to CSM
    vec3 tp_color = color_X + color_Y + color_Z;
    csm_DiffuseColor = vec4(tp_color, opacity);

    // --> ROUGHNESS

    // get roughness values at texture, blend
    float roughness_X = texture(u_roughnessMapX, uvX).r * blending_factor.x;
    float roughness_Y = texture(u_roughnessMapY, uvY).r * blending_factor.y;
    float roughness_Z = texture(u_roughnessMapZ, uvZ).r * blending_factor.z;

    // add blended roughness values for each axis, pass to CSM
    float tp_roughness = roughness_X + roughness_Y + roughness_Z;
    csm_Roughness = tp_roughness;

    // --> NORMALS

    // get unpacked [-1,1] normal values at texture
    vec3 unpacked_normal_X = unpackRGBToNormal(texture(u_normalMapX, uvX).rgb);
    vec3 unpacked_normal_Y = unpackRGBToNormal(texture(u_normalMapY, uvY).rgb);
    vec3 unpacked_normal_Z = unpackRGBToNormal(texture(u_normalMapZ, uvZ).rgb);

    // flip normal maps' x axis to account for flipped UVs
    unpacked_normal_X.x *= -axisSign.x;
    unpacked_normal_Y.x *= -axisSign.y;
    unpacked_normal_Z.x *= axisSign.z;

    // swizzle world normals to match tangent space and apply ala UDN normal blending
    vec3 tnormalX = vec3(unpacked_normal_X.xy + vNormal.zy, vNormal.x);
    vec3 tnormalY = vec3(unpacked_normal_Y.xy + vNormal.xz, vNormal.y);
    vec3 tnormalZ = vec3(unpacked_normal_Z.xy + vNormal.xy, vNormal.z);

    // swizzle tangent normals to match world normal and blend together, this variable is referenced in CMS's patchMap
    vec3 triplanar_normal = normalize(tnormalX.zyx * blending_factor.x +
        tnormalY.xzy * blending_factor.y +
        tnormalZ.xyz * blending_factor.z);
}
