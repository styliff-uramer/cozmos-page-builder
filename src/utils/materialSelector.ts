import * as THREE from "three";
import overlayMaterial from "../customMaterials/overlayMaterial";
import invertMaterial from "../customMaterials/invertMaterial";

const materialSelector = (index: number, texture: THREE.Texture) => {
  if (index === 1) {
    return overlayMaterial(texture);
  } else if (index === 2) {
    return invertMaterial(texture);
  }
  return new THREE.MeshBasicMaterial({ map: texture });
};

export default materialSelector;
