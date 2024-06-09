import * as THREE from "three";
import { DragControls } from "three-stdlib";
import { Item } from "../_store/pageBuilderStore";
import { animateScaleUp, animateRevertScale } from "../_animations";

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
      animateScaleUp(object.scale);
    }
  });

  dragControls.addEventListener("dragend", (event: any) => {
    const object = event.object as THREE.Mesh;
    if (object instanceof THREE.Mesh) {
      animateRevertScale(object.scale);

      const meshId = object.userData.id;
      const updatedStateItem = items.find(
        (stateItem) => stateItem.id === meshId
      );
      if (updatedStateItem) {
        updatedStateItem.position = object.position;
        editItem(updatedStateItem);
      }
    }
  });

  return () => {
    dragControls.dispose();
  };
};

export default dragBehaviours;
