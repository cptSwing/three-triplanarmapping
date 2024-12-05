# three-triplanarmapping

## A threeJs shader for object-space triplanar mapping (WIP)

..using [CustomShaderMaterial](https://github.com/FarazzShaikh/THREE-CustomShaderMaterial). Thrown together in typescript.

- Working version leaning heavily on https://github.com/bgolus/Normal-Mapping-for-a-Triplanar-Shader/blob/master/TriplanarUDN.shader
- Supports diffuse, normal, roughness maps for now
- clones a PBR THREE.MeshStandardMaterial
- `createTriplanarMaterial()` returns a triplanar material, check `lib/triplanarMaterial.ts` for parameters
- `yarn install` and `yarn dev` to view test [react-three-fiber](https://github.com/pmndrs/react-three-fiber) scene (`Scene.tsx`)

ToDo:
[] World Space shader
[] Extend to emissive, metalness etc
[] Remove unnecessary samples when not all axes have separate textures supplied - use textureX on Y, Z
[] different blend options (only YZ, for example)
[] Clean up and separate material return function from test scene
[] list as package?

[1](./screen1.jpg)
[2](./screen2.jpg)
[3](./screen3.jpg)
