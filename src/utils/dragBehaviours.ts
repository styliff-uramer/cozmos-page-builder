import * as THREE from "three";
import { DragControls } from "three-stdlib";
import { Item } from "../_store/pageBuilderStore";
import gsap from "gsap";

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
      gsap.to(object.scale, {
        x: 1.1,
        y: 1.1,
        z: 1.1,
        duration: 0.1,
        ease: "power1.inOut",
      });
    }
  });

  dragControls.addEventListener("dragend", (event: any) => {
    const object = event.object as THREE.Mesh;
    if (object instanceof THREE.Mesh) {
      console.log("drag End");
      gsap.to(object.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
        ease: "power1.inOut",
      });

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
