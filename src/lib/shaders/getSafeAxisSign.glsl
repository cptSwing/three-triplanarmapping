// Since sign() can return 0.0 if the component equals 0
vec3 getSafeAxisSign(vec3 axes) {
    float xSign = axes.x > 0. ? -1. : 1.;
    float ySign = axes.y > 0. ? -1. : 1.;
    float zSign = axes.z > 0. ? -1. : 1.;
    return vec3(xSign, ySign, zSign);
}
