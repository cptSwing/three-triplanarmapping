import { LinearSRGBColorSpace, RepeatWrapping, SRGBColorSpace, TextureLoader } from 'three';

const textureLoader = new TextureLoader();

const baseColorXTesting_TEX = await textureLoader.loadAsync('/textures/Testing_basecolorX.png');
baseColorXTesting_TEX.colorSpace = SRGBColorSpace;
baseColorXTesting_TEX.wrapS = RepeatWrapping;
baseColorXTesting_TEX.wrapT = RepeatWrapping;

const baseColorYTesting_TEX = await textureLoader.loadAsync('/textures/Testing_basecolorY.png');
baseColorYTesting_TEX.colorSpace = SRGBColorSpace;
baseColorYTesting_TEX.wrapS = RepeatWrapping;
baseColorYTesting_TEX.wrapT = RepeatWrapping;

const baseColorZTesting_TEX = await textureLoader.loadAsync('/textures/Testing_basecolorZ.png');
baseColorZTesting_TEX.colorSpace = SRGBColorSpace;
baseColorZTesting_TEX.wrapS = RepeatWrapping;
baseColorZTesting_TEX.wrapT = RepeatWrapping;

const normalXTesting_TEX = await textureLoader.loadAsync('/textures/Testing_normalX.png');
normalXTesting_TEX.colorSpace = LinearSRGBColorSpace;
normalXTesting_TEX.wrapS = RepeatWrapping;
normalXTesting_TEX.wrapT = RepeatWrapping;

const normalYTesting_TEX = await textureLoader.loadAsync('/textures/Testing_normalY.png');
normalYTesting_TEX.colorSpace = LinearSRGBColorSpace;
normalYTesting_TEX.wrapS = RepeatWrapping;
normalYTesting_TEX.wrapT = RepeatWrapping;

const normalZTesting_TEX = await textureLoader.loadAsync('/textures/Testing_normalZ.png');
normalZTesting_TEX.colorSpace = LinearSRGBColorSpace;
normalZTesting_TEX.wrapS = RepeatWrapping;
normalZTesting_TEX.wrapT = RepeatWrapping;

const roughnessXTesting_TEX = await textureLoader.loadAsync('/textures/Testing_roughnessX.png');
roughnessXTesting_TEX.colorSpace = LinearSRGBColorSpace;
roughnessXTesting_TEX.wrapS = RepeatWrapping;
roughnessXTesting_TEX.wrapT = RepeatWrapping;

const roughnessYTesting_TEX = await textureLoader.loadAsync('/textures/Testing_roughnessY.png');
roughnessYTesting_TEX.colorSpace = LinearSRGBColorSpace;
roughnessYTesting_TEX.wrapS = RepeatWrapping;
roughnessYTesting_TEX.wrapT = RepeatWrapping;

const roughnessZTesting_TEX = await textureLoader.loadAsync('/textures/Testing_roughnessZ.png');
roughnessZTesting_TEX.colorSpace = LinearSRGBColorSpace;
roughnessZTesting_TEX.wrapS = RepeatWrapping;
roughnessZTesting_TEX.wrapT = RepeatWrapping;

const testTextures = {
    mapX: baseColorXTesting_TEX,
    mapY: baseColorYTesting_TEX,
    mapZ: baseColorZTesting_TEX,
    normalMapX: normalXTesting_TEX,
    normalMapY: normalYTesting_TEX,
    normalMapZ: normalZTesting_TEX,
    roughnessMapX: roughnessXTesting_TEX,
    roughnessMapY: roughnessYTesting_TEX,
    roughnessMapZ: roughnessZTesting_TEX,
};

const baseColorXTerrain_TEX = await textureLoader.loadAsync('/textures/Terrain_basecolorX.png');
baseColorXTerrain_TEX.colorSpace = SRGBColorSpace;
baseColorXTerrain_TEX.wrapS = RepeatWrapping;
baseColorXTerrain_TEX.wrapT = RepeatWrapping;

const baseColorYTerrain_TEX = await textureLoader.loadAsync('/textures/Terrain_basecolorY.png');
baseColorYTerrain_TEX.colorSpace = SRGBColorSpace;
baseColorYTerrain_TEX.wrapS = RepeatWrapping;
baseColorYTerrain_TEX.wrapT = RepeatWrapping;

const baseColorZTerrain_TEX = await textureLoader.loadAsync('/textures/Terrain_basecolorZ.png');
baseColorZTerrain_TEX.colorSpace = SRGBColorSpace;
baseColorZTerrain_TEX.wrapS = RepeatWrapping;
baseColorZTerrain_TEX.wrapT = RepeatWrapping;

const normalXTerrain_TEX = await textureLoader.loadAsync('/textures/Terrain_normalX.png');
normalXTerrain_TEX.colorSpace = LinearSRGBColorSpace;
normalXTerrain_TEX.wrapS = RepeatWrapping;
normalXTerrain_TEX.wrapT = RepeatWrapping;

const normalYTerrain_TEX = await textureLoader.loadAsync('/textures/Terrain_normalY.png');
normalYTerrain_TEX.colorSpace = LinearSRGBColorSpace;
normalYTerrain_TEX.wrapS = RepeatWrapping;
normalYTerrain_TEX.wrapT = RepeatWrapping;

const normalZTerrain_TEX = await textureLoader.loadAsync('/textures/Terrain_normalZ.png');
normalZTerrain_TEX.colorSpace = LinearSRGBColorSpace;
normalZTerrain_TEX.wrapS = RepeatWrapping;
normalZTerrain_TEX.wrapT = RepeatWrapping;

const roughnessXTerrain_TEX = await textureLoader.loadAsync('/textures/Terrain_roughnessX.png');
roughnessXTerrain_TEX.colorSpace = LinearSRGBColorSpace;
roughnessXTerrain_TEX.wrapS = RepeatWrapping;
roughnessXTerrain_TEX.wrapT = RepeatWrapping;

const roughnessYTerrain_TEX = await textureLoader.loadAsync('/textures/Terrain_roughnessY.png');
roughnessYTerrain_TEX.colorSpace = LinearSRGBColorSpace;
roughnessYTerrain_TEX.wrapS = RepeatWrapping;
roughnessYTerrain_TEX.wrapT = RepeatWrapping;

const roughnessZTerrain_TEX = await textureLoader.loadAsync('/textures/Terrain_roughnessZ.png');
roughnessZTerrain_TEX.colorSpace = LinearSRGBColorSpace;
roughnessZTerrain_TEX.wrapS = RepeatWrapping;
roughnessZTerrain_TEX.wrapT = RepeatWrapping;

const terrainTextures = {
    mapX: baseColorXTerrain_TEX,
    mapY: baseColorYTerrain_TEX,
    mapZ: baseColorZTerrain_TEX,
    normalMapX: normalXTerrain_TEX,
    normalMapY: normalYTerrain_TEX,
    normalMapZ: normalZTerrain_TEX,
    roughnessMapX: roughnessXTerrain_TEX,
    roughnessMapY: roughnessYTerrain_TEX,
    roughnessMapZ: roughnessZTerrain_TEX,
};

const baseColorXMetal_TEX = await textureLoader.loadAsync('/textures/Metal_basecolorX.png');
baseColorXMetal_TEX.colorSpace = SRGBColorSpace;
baseColorXMetal_TEX.wrapS = RepeatWrapping;
baseColorXMetal_TEX.wrapT = RepeatWrapping;

const baseColorYMetal_TEX = await textureLoader.loadAsync('/textures/Metal_basecolorY.png');
baseColorYMetal_TEX.colorSpace = SRGBColorSpace;
baseColorYMetal_TEX.wrapS = RepeatWrapping;
baseColorYMetal_TEX.wrapT = RepeatWrapping;

const baseColorZMetal_TEX = await textureLoader.loadAsync('/textures/Metal_basecolorZ.png');
baseColorZMetal_TEX.colorSpace = SRGBColorSpace;
baseColorZMetal_TEX.wrapS = RepeatWrapping;
baseColorZMetal_TEX.wrapT = RepeatWrapping;

const normalXMetal_TEX = await textureLoader.loadAsync('/textures/Metal_normalX.png');
normalXMetal_TEX.colorSpace = LinearSRGBColorSpace;
normalXMetal_TEX.wrapS = RepeatWrapping;
normalXMetal_TEX.wrapT = RepeatWrapping;

const normalYMetal_TEX = await textureLoader.loadAsync('/textures/Metal_normalY.png');
normalYMetal_TEX.colorSpace = LinearSRGBColorSpace;
normalYMetal_TEX.wrapS = RepeatWrapping;
normalYMetal_TEX.wrapT = RepeatWrapping;

const normalZMetal_TEX = await textureLoader.loadAsync('/textures/Metal_normalZ.png');
normalZMetal_TEX.colorSpace = LinearSRGBColorSpace;
normalZMetal_TEX.wrapS = RepeatWrapping;
normalZMetal_TEX.wrapT = RepeatWrapping;

const roughnessXMetal_TEX = await textureLoader.loadAsync('/textures/Metal_roughnessX.png');
roughnessXMetal_TEX.colorSpace = LinearSRGBColorSpace;
roughnessXMetal_TEX.wrapS = RepeatWrapping;
roughnessXMetal_TEX.wrapT = RepeatWrapping;

const roughnessYMetal_TEX = await textureLoader.loadAsync('/textures/Metal_roughnessY.png');
roughnessYMetal_TEX.colorSpace = LinearSRGBColorSpace;
roughnessYMetal_TEX.wrapS = RepeatWrapping;
roughnessYMetal_TEX.wrapT = RepeatWrapping;

const roughnessZMetal_TEX = await textureLoader.loadAsync('/textures/Metal_roughnessZ.png');
roughnessZMetal_TEX.colorSpace = LinearSRGBColorSpace;
roughnessZMetal_TEX.wrapS = RepeatWrapping;
roughnessZMetal_TEX.wrapT = RepeatWrapping;

const metalTextures = {
    mapX: baseColorXMetal_TEX,
    mapY: baseColorYMetal_TEX,
    mapZ: baseColorZMetal_TEX,
    normalMapX: normalXMetal_TEX,
    normalMapY: normalYMetal_TEX,
    normalMapZ: normalZMetal_TEX,
    roughnessMapX: roughnessXMetal_TEX,
    roughnessMapY: roughnessYMetal_TEX,
    roughnessMapZ: roughnessZMetal_TEX,
};

export { testTextures, terrainTextures, metalTextures };
