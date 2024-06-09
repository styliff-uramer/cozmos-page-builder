import { useRef, useEffect, useState } from "react";
import usePageBuilderStore from "../_store/pageBuilderStore";
import * as THREE from "three";
import { useThree } from "../_context/ThreeContext";
import dragBehaviours from "../utils/dragBehaviours";
import { animateBounceIn } from "../_animations";
import useSiteStatusStore from "../_store/siteStatusStore";
import materialSelector from "../utils/materialSelector";

type Props = {
  canvasArea: React.MutableRefObject<THREE.Mesh | null>;
};

const MediaItems = ({ canvasArea }: Props) => {
  const { scene, camera, renderer } = useThree();
  const { items, editItem } = usePageBuilderStore();
  const { setIsDragging } = useSiteStatusStore();

  const meshesRef = useRef<THREE.Mesh[]>([]);

  const [addedIds, setAddedIds] = useState<number[]>([]);

  useEffect(() => {
    items.forEach((item, i) => {
      const shouldAnimate = !addedIds.includes(item.id);
      const geometry = new THREE.PlaneGeometry(item.aspectRatio, 1);
      const material = materialSelector(item.filter, item.texture);
      const plane = new THREE.Mesh(geometry, material);
      const initialScale = shouldAnimate ? 0 : 1;
      plane.scale.set(initialScale, initialScale, initialScale);
      plane.rotation.x = Math.PI * 2;
      plane.position.x = item.position.x;
      plane.position.y = item.position.y;
      plane.position.z = 0.1;
      plane.userData.id = item.id; // this is to link the mesh to the stateItem when removing or editing
      scene.add(plane);

      if (shouldAnimate) {
        animateBounceIn(plane.scale);
      }

      meshesRef.current[i] = plane;
      setAddedIds((prev) => [...prev, item.id]); //used to monitor and work out when a mesh is newly added to the scene
    });

    const cleanUpDragControls = dragBehaviours(
      meshesRef.current,
      camera,
      renderer.domElement,
      items,
      editItem,
      setIsDragging,
      canvasArea
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
