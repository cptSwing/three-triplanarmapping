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

varying vec3 vPositionChoice;
varying vec3 vNormalChoice;

vec3 getBlendingFactor(vec3 normal, float exponent) {
    vec3 bf = normalize(abs(normal));
    bf = saturate(pow(bf, vec3(exponent)));
    bf /= max(dot(bf, vec3(1.)), 0.00001);
    return bf;
}

// UDN Blend
void main() {
    vec3 blending_factor = getBlendingFactor(vNormalChoice, u_blendExponent);

    vec2 uvX = vPositionChoice.zy * u_mapScale;
    vec2 uvY = vPositionChoice.xz * u_mapScale;
    vec2 uvZ = vPositionChoice.xy * u_mapScale;

    // // flip mirrored sides (only working in local for now??):
    vec3 axisSign = getSafeAxisSign(vNormalChoice);
    uvX.x *= axisSign.x;
    uvY.x *= axisSign.y;
    uvZ.x *= -axisSign.z;

    triplanar_lookup_struct triplanar_lookup = triplanar_lookup_struct(uvX, uvY, uvZ);

    // get color values at texture, blend
    vec3 color_X = texture(map, triplanar_lookup.uvX).rgb * blending_factor.x;
    vec3 color_Y = texture(u_mapY, triplanar_lookup.uvY).rgb * blending_factor.y;
    vec3 color_Z = texture(u_mapZ, triplanar_lookup.uvZ).rgb * blending_factor.z;

    // add blended color values for each axis, pass to CSM
    vec3 tp_color = color_X + color_Y + color_Z;
    csm_DiffuseColor = vec4(tp_color, opacity);

        // get roughness values at texture, blend
    float roughness_X = texture(u_roughnessMapX, triplanar_lookup.uvX).r * blending_factor.x;
    float roughness_Y = texture(u_roughnessMapY, triplanar_lookup.uvY).r * blending_factor.y;
    float roughness_Z = texture(u_roughnessMapZ, triplanar_lookup.uvZ).r * blending_factor.z;

    // add blended roughness values for each axis, pass to CSM
    float tp_roughness = roughness_X + roughness_Y + roughness_Z;
    csm_Roughness = tp_roughness;

    // get unpacked [-1,1] normal values at texture
    vec3 unpacked_normal_X = unpackRGBToNormal(texture(u_normalMapX, triplanar_lookup.uvX).rgb);
    vec3 unpacked_normal_Y = unpackRGBToNormal(texture(u_normalMapY, triplanar_lookup.uvY).rgb);
    vec3 unpacked_normal_Z = unpackRGBToNormal(texture(u_normalMapZ, triplanar_lookup.uvZ).rgb);

    // flip normal maps' x axis to account for flipped UVs
    unpacked_normal_X.x *= axisSign.x;
    unpacked_normal_Y.x *= axisSign.y;
    // unpacked_normal_Z.x *= axisSign.z;

    unpacked_normal_Y.y *= axisSign.y;

    // swizzle world normals to match tangent space and apply ala UDN normal blending
    vec3 tnormalX = vec3(unpacked_normal_X.xy + vNormal.zy, vNormal.x);
    vec3 tnormalY = vec3(unpacked_normal_Y.xy + vNormal.xz, vNormal.y);
    vec3 tnormalZ = vec3(unpacked_normal_Z.xy + vNormal.xy, vNormal.z);

    // swizzle tangent normals to match world normal and blend together
    vec3 triplanar_normal = normalize(tnormalX.zyx * blending_factor.x +
        tnormalY.xzy * blending_factor.y +
        tnormalZ.xyz * blending_factor.z);
}
