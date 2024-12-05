// http://www.thetenthplanet.de/archives/1180
mat3 cotangent_frame(vec3 vertex_normal, vec3 point, vec2 uv) { 
    // get edge vectors of the pixel triangle
    vec3 dp1 = dFdx(point);
    vec3 dp2 = dFdy(point);
    vec2 duv1 = dFdx(uv);
    vec2 duv2 = dFdy(uv);  
    // solve the linear system
    vec3 dp2perp = cross(dp2, vertex_normal);
    vec3 dp1perp = cross(vertex_normal, dp1);
    vec3 T = dp2perp * duv1.x + dp1perp * duv2.x;
    vec3 B = dp2perp * duv1.y + dp1perp * duv2.y;  
    // construct a scale-invariant frame
    float invmax = inversesqrt(max(dot(T, T), dot(B, B)));
    return mat3(T * invmax, B * invmax, vertex_normal);
}

mat3 getCustomTangentFrame(vec3 eye_pos, vec3 surf_norm, vec2 uv) {
    vec3 q0 = dFdx(eye_pos.xyz);
    vec3 q1 = dFdy(eye_pos.xyz);
    vec2 st0 = dFdx(uv.st);
    vec2 st1 = dFdy(uv.st);

    vec3 N = surf_norm; // normalized

    vec3 q1perp = cross(q1, N);
    vec3 q0perp = cross(N, q0);

    vec3 T = q1perp * st0.x + q0perp * st1.x;
    vec3 B = q1perp * st0.y + q0perp * st1.y;

    float det = max(dot(T, T), dot(B, B));
    float scale = (det == 0.0) ? 0.0 : inversesqrt(det);

    return mat3(T * scale, B * scale, N);
}

triplanar_tbn_struct getCustomTangentFrameStruct(vec3 eye_pos, vec3 surf_norm, triplanar_lookup_struct uvs) {
    mat3 tbn_x = getCustomTangentFrame(eye_pos, surf_norm, uvs.uvX);
    mat3 tbn_y = getCustomTangentFrame(eye_pos, surf_norm, uvs.uvY);
    mat3 tbn_z = getCustomTangentFrame(eye_pos, surf_norm, uvs.uvZ);

    return triplanar_tbn_struct(tbn_x, tbn_y, tbn_z);
}

// triplanar_tbn_struct getCustomTangentFrameStruct(vec3 eye_pos, vec3 surf_norm, triplanar_lookup_struct uvs) {
//     vec3 q0 = dFdx(eye_pos.xyz);
//     vec3 q1 = dFdy(eye_pos.xyz);

//     vec2 stX0 = dFdx(uvs.uvX.st);
//     vec2 stX1 = dFdy(uvs.uvX.st);
//     vec2 stY0 = dFdx(uvs.uvY.st);
//     vec2 stY1 = dFdy(uvs.uvY.st);
//     vec2 stZ0 = dFdx(uvs.uvZ.st);
//     vec2 stZ1 = dFdy(uvs.uvZ.st);

//     vec3 N = surf_norm;

//     vec3 q1perp = cross(q1, N);
//     vec3 q0perp = cross(N, q0);

//     vec3 T_x = q1perp * stX0.x + q0perp * stX1.x;
//     vec3 B_x = q1perp * stX0.y + q0perp * stX1.y;
//     float det_x = max(dot(T_x, T_x), dot(B_x, B_x));
//     float scale_x = (det_x == 0.0) ? 0.0 : inversesqrt(det_x);

//     mat3 tbn_x = mat3(T_x * scale_x, B_x * scale_x, N);

//     vec3 T_y = q1perp * stY0.x + q0perp * stY1.x;
//     vec3 B_y = q1perp * stY0.y + q0perp * stY1.y;
//     float det_y = max(dot(T_y, T_y), dot(B_y, B_y));
//     float scale_y = (det_y == 0.0) ? 0.0 : inversesqrt(det_y);

//     mat3 tbn_y = mat3(T_y * scale_y, B_y * scale_y, N);

//     vec3 T_z = q1perp * stZ0.x + q0perp * stZ1.x;
//     vec3 B_z = q1perp * stZ0.y + q0perp * stZ1.y;
//     float det_z = max(dot(T_z, T_z), dot(B_z, B_z));
//     float scale_z = (det_z == 0.0) ? 0.0 : inversesqrt(det_z);

//     mat3 tbn_z = mat3(T_z * scale_z, B_z * scale_z, N);

//     return triplanar_tbn_struct(tbn_x, tbn_y, tbn_z);
// }

vec3 getOrthogonalVector(vec3 v) {
    return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0) : vec3(0.0, -v.z, v.y));
}

mat3 getTbn(vec3 normal) {
    vec3 tangent = getOrthogonalVector(normal);
    vec3 bitangent = normalize(cross(normal, tangent));
    vec3 newNormal = normalize(cross(tangent, bitangent));
    return mat3(tangent, bitangent, newNormal);
}
