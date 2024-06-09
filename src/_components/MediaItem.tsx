import { useEffect } from "react";
import { useThree } from "../_context/ThreeContext";
import * as THREE from "three";
import { Item } from "../_store/pageBuilderStore";
type Props = {
  item: Item;
};

const MediaItem = (props: Props) => {
  const { scene } = useThree();

  useEffect(() => {
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0034 });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI * 2;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 1;
    scene.add(plane);
  }, []);

  return null;
};

export default MediaItem;
