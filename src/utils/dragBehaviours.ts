import * as THREE from "three";
import { DragControls } from "three-stdlib";

const dragBehaviours = (
  meshes: THREE.Mesh[],
  camera: THREE.Camera,
  rendererDomElement: HTMLElement
) => {
  const dragControls = new DragControls(meshes, camera, rendererDomElement);

  dragControls.addEventListener("dragstart", (event: any) => {
    const object = event.object as THREE.Mesh;
    if (object instanceof THREE.Mesh) {
      console.log("drag start");
    }
  });
  dragControls.addEventListener("drag", (event: any) => {
    const object = event.object as THREE.Mesh;
    if (object instanceof THREE.Mesh) {
      console.log("is Dragging");
    }
  });

  dragControls.addEventListener("dragstart", (event: any) => {
    const object = event.object as THREE.Mesh;
    if (object instanceof THREE.Mesh) {
      console.log("drag end");
    }
  });

  return () => {
    dragControls.dispose();
  };
};

export default dragBehaviours;
