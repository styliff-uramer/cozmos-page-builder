import * as THREE from "three";
import { DragControls } from "three-stdlib";
import { Item } from "../_store/pageBuilderStore";

const dragBehaviours = (
  meshes: THREE.Mesh[],
  camera: THREE.Camera,
  rendererDomElement: HTMLElement,
  items: Item[],
  editItem: (item: Item) => void
) => {
  const dragControls = new DragControls(meshes, camera, rendererDomElement);

  dragControls.addEventListener("dragstart", (event: any) => {
    const object = event.object as THREE.Mesh;
    if (object instanceof THREE.Mesh) {
      console.log("drag start");
    }
  });

  dragControls.addEventListener("dragend", (event: any) => {
    const object = event.object as THREE.Mesh;
    if (object instanceof THREE.Mesh) {
      const itemId = object.userData.id;
      const updatedItem = items.find((item) => item.id === itemId);
      if (updatedItem) {
        updatedItem.position = object.position;
        editItem(updatedItem);
      }
    }
  });

  return () => {
    dragControls.dispose();
  };
};

export default dragBehaviours;
