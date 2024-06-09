import { useRef, useEffect, useState } from "react";
import usePageBuilderStore from "../_store/pageBuilderStore";

// gsap
import * as THREE from "three";
import { useThree } from "../_context/ThreeContext";

import dragBehaviours from "../utils/dragBehaviours";
import gsap from "gsap";

type Props = {};

const MediaItems = (props: Props) => {
  const { scene, camera, renderer } = useThree();
  const { items, editItem } = usePageBuilderStore();

  const meshesRef = useRef<THREE.Mesh[]>([]);

  const [addedIds, setAddedIds] = useState<number[]>([]);

  useEffect(() => {
    console.log("items", items);
    items.forEach((item, i) => {
      const shouldAnimate = !addedIds.includes(item.id);
      const geometry = new THREE.PlaneGeometry(1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0xeb0034 });
      const plane = new THREE.Mesh(geometry, material);
      const initialScale = shouldAnimate ? 0 : 1;
      plane.scale.set(initialScale, initialScale, initialScale);
      plane.rotation.x = Math.PI * 2;
      plane.position.x = item.position.x;
      plane.position.y = item.position.y;
      plane.position.z = 0.1;
      plane.userData.id = item.id; // Use this to link the mesh to the stateItem when removing or editing
      scene.add(plane);

      if (shouldAnimate) {
        gsap.to(plane.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      }

      meshesRef.current[i] = plane;
      setAddedIds((prev) => [...prev, item.id]); //used to monitor and work out when a mesh is newly added to the scene
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
