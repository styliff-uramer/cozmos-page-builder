import { createContext, useContext, ReactNode, useEffect } from "react";
import * as THREE from "three";

interface ThreeContextType {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
}

const ThreeContext = createContext<ThreeContextType | null>(null);

export const useThree = (): ThreeContextType => {
  const context = useContext(ThreeContext);
  if (!context) {
    throw new Error("useThree must be used within a ThreeProvider");
  }
  return context;
};

interface ThreeProviderProps {
  children: ReactNode;
}

export const ThreeProvider: React.FC<ThreeProviderProps> = ({ children }) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();

  camera.position.z = 5;
  renderer.setSize(window.innerWidth, window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [camera, renderer]);

  const value = { scene, camera, renderer };

  return (
    <ThreeContext.Provider value={value}>{children}</ThreeContext.Provider>
  );
};
