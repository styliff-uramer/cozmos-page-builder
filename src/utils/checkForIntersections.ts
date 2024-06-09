import * as THREE from "three";
import { RefObject } from "react";

const checkForIntersections = (
  paintArea: RefObject<THREE.Mesh | null>,
  object: THREE.Mesh
): number => {
  const meshCorners: THREE.Vector3[] = [];
  const mediaTileVertices = object.geometry.attributes.position.array;

  if (mediaTileVertices) {
    const worldMatrix = object.matrixWorld;

    for (let i = 0; i < mediaTileVertices.length; i += 3) {
      const localVertex = new THREE.Vector3(
        mediaTileVertices[i],
        mediaTileVertices[i + 1],
        mediaTileVertices[i + 2]
      );
      const worldVertex = localVertex.applyMatrix4(worldMatrix);
      meshCorners.push(worldVertex);
    }

    const raycaster = new THREE.Raycaster();
    let intersections = [];

    meshCorners.forEach((corner) => {
      const origin = corner;
      const direction = new THREE.Vector3(0, 0, -1);
      raycaster.set(origin, direction);

      const intersects = raycaster.intersectObject(paintArea.current!);
      if (intersects.length > 0) {
        intersections.push(corner);
      }
    });

    return intersections?.length;
  }
  return 0;
};

export default checkForIntersections;
