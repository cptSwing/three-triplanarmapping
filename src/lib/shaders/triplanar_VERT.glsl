varying vec3 csm_vPosition;
varying vec3 csm_vNormal;

void main() {
    csm_vPosition = csm_Position;
    csm_vNormal = csm_Normal;
}
