// https://gist.github.com/ayamflow/c06bc0c8a64f985dd431bd0ac5b557cd?permalink_comment_id=4729130#gistcomment-4729130
vec2 getRotatedUv(vec2 uv, float rotationRad) {
    float cosAngle = cos(rotationRad);
    float sinAngle = sin(rotationRad);
    vec2 p = uv - vec2(0.5);
    return vec2(cosAngle * p.x + sinAngle * p.y + 0.5, cosAngle * p.y - sinAngle * p.x + 0.5);
}

vec2 getRotatedUv(vec2 uv, float rotationRad, vec2 mid) {
    float cosAngle = cos(rotationRad);
    float sinAngle = sin(rotationRad);
    vec2 p = uv - mid;
    return vec2(cosAngle * p.x + sinAngle * p.y + mid.x, cosAngle * p.y - sinAngle * p.x + mid.y);
}

vec2 getRotatedUv(vec2 uv, float rotationRad, float mid) {
    float cosAngle = cos(rotationRad);
    float sinAngle = sin(rotationRad);
    vec2 p = uv - vec2(mid);
    return vec2(cosAngle * p.x + sinAngle * p.y + mid, cosAngle * p.y - sinAngle * p.x + mid);
}
