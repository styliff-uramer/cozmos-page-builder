import * as THREE from "three";
import overlayMaterial from "../customMaterials/overlayMaterial";
import invertMaterial from "../customMaterials/invertMaterial";
import blackAndWhiteMaterial from "../customMaterials/bAndWMaterial";

const materialSelector = (
  index: number,
  texture: THREE.Texture
): THREE.Material => {
  if (index === 1) {
    return overlayMaterial(texture);
  } else if (index === 2) {
    return invertMaterial(texture);
  } else if (index === 3) {
    return blackAndWhiteMaterial(texture);
  }
  return new THREE.MeshBasicMaterial({ map: texture });
};

export default materialSelector;
