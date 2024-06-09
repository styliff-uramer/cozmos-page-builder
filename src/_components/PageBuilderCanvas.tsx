import { useEffect } from "react";
import * as THREE from "three";
import { useThree } from "../_context/ThreeContext";

const PageBuilderCanvas = () => {
  const { scene } = useThree();

  useEffect(() => {
    const geometry = new THREE.PlaneGeometry(10, 6);
    const material = new THREE.MeshBasicMaterial({ color: 0xebebeb });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI * 2;
    plane.position.y = -0.5;

    scene.add(plane);

    return () => {
      scene.remove(plane);
    };
  }, [scene]);

  return null;
};

export default PageBuilderCanvas;
