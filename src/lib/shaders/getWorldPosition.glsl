vec3 getWorldPosition(vec3 position_object_space) {
    return (modelMatrix * vec4(position_object_space, 1.)).xyz;
}
