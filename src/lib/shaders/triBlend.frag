vec3 triBlend(vec3 normal, float exponent) {
    vec3 bf = normalize(abs(normal));
    bf = clamp(pow(bf, vec3(exponent)), 0., 1.);
    bf /= max(dot(bf, vec3(1.)), 0.0001);
    return bf;
}
