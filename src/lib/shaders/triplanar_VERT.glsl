uniform bool u_seWorldPosition;
uniform bool u_seWorldNormal;

varying vec3 vWorldPosition;
varying vec3 vPositionChoice;
varying vec3 vNormalChoice;

void main() {
    vWorldPosition = getWorldPosition(csm_Position);
    // vPositionChoice = u_seWorldPosition ? vWorldPosition : csm_Position;
    // vNormalChoice = u_seWorldNormal ? getWorldNormal(csm_Normal) : csm_Normal;

    vPositionChoice = csm_Position;
    vNormalChoice = csm_Normal;

}
