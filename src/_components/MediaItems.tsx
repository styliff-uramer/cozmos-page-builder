import { useRef, useEffect } from "react";
import usePageBuilderStore from "../_store/pageBuilderStore";

import * as THREE from "three";
import { useThree } from "../_context/ThreeContext";
import DragMeshes from "./DragMeshes";
import dragBehaviours from "../utils/dragBehaviours";

type Props = {};

const MediaItems = (props: Props) => {
  const { scene, camera, renderer } = useThree();
  const { items, editItem } = usePageBuilderStore();

  const meshesRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    console.log("items", items);
    items.forEach((item, i) => {
      const geometry = new THREE.PlaneGeometry(1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0xeb0034 });
      const plane = new THREE.Mesh(geometry, material);
      plane.rotation.x = Math.PI * 2;
      plane.position.x = item.position.x;
      plane.position.y = item.position.y;
      //   plane.position.x = 0;
      //   plane.position.y = 0;

      plane.position.z = 0.1;
      plane.userData.id = item.id; // Use this to link the mesh to the stateItem when removing or editing
      scene.add(plane);
      meshesRef.current[i] = plane;
    });

    const cleanUpDragControls = dragBehaviours(
      meshesRef.current,
      camera,
      renderer.domElement,
      items,
      editItem
    );

    return () => {
      cleanUpDragControls();
      meshesRef.current.forEach((mesh) => {
        scene.remove(mesh);
      });
    };
  }, [items]);

  return null;
};

export default MediaItems;
