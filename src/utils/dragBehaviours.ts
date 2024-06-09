import * as THREE from "three";
import { DragControls } from "three-stdlib";
import { Item } from "../_store/pageBuilderStore";
import { animateScaleUp, animateRevertScale } from "../_animations";
import checkForIntersections from "./checkForIntersections";

const dragBehaviours = (
  meshes: THREE.Mesh[],
  camera: THREE.Camera,
  rendererDomElement: HTMLElement,
  items: Item[],
  editItem: (item: Item) => void,
  setIsDragging: (isDragging: number | null) => void,
  canvasArea: React.MutableRefObject<THREE.Mesh | null>
) => {
  const dragControls = new DragControls(meshes, camera, rendererDomElement);

  dragControls.addEventListener("dragstart", (event: any) => {
    const object = event.object as THREE.Mesh;
    if (object instanceof THREE.Mesh) {
      animateScaleUp(object.scale);
      setIsDragging(object.userData.id);
    }
  });

  dragControls.addEventListener("dragend", (event: any) => {
    const object = event.object as THREE.Mesh;
    if (object instanceof THREE.Mesh) {
      animateRevertScale(object.scale);
      setIsDragging(null);
      const intersections = checkForIntersections(canvasArea, object);
      console.log("intersections", intersections);
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
