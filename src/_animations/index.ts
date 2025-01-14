import * as THREE from "three";
import { gsap } from "gsap";

export const animateBounceIn = (el: THREE.Vector3) => {
  gsap.to(el, {
    x: 1,
    y: 1,
    z: 1,
    duration: 0.5,
    ease: "elastic.out(1, 0.3)",
  });
};

export const animateScaleUp = (el: THREE.Vector3) => {
  gsap.to(el, {
    x: 1.05,
    y: 1.05,
    z: 1.05,
    duration: 0.1,
    ease: "power1.inOut",
  });
};
export const animateRevertScale = (el: THREE.Vector3) => {
  gsap.to(el, {
    x: 1,
    y: 1,
    z: 1,
    duration: 0.2,
    ease: "power1.inOut",
  });
};

export const animateFadeIn = (el: HTMLButtonElement) => {
  gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.5 });
};
