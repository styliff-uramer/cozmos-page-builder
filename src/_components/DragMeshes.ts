import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { useThree } from "../_context/ThreeContext";

const DragMeshes = ({ meshes }) => {
  const { camera, renderer } = useThree();

  const controlsRef = useRef();

  useEffect(() => {
    const controls = new DragControls(meshes, camera, renderer.domElement);
    controlsRef.current = controls;

    controls.addEventListener("dragstart", (event) => {
      //   event.object.material.emissive.set(0xaaaaaa);
    });

    controls.addEventListener("dragend", (event) => {
      //   event.object.material.emissive.set(0x000000);
    });

    return () => {
      controls.dispose();
    };
  }, [meshes]);

  return null;
};

export default DragMeshes;
