vec3 getWorldNormal(vec3 normal_object_space) {
    return normalize((modelMatrix * vec4(normal_object_space, 1.)).xyz);
}
