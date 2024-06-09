import * as THREE from "three";

const overlayMaterial = (texture: any) =>
  new THREE.ShaderMaterial({
    uniforms: {
      image: { value: texture },
      overlay: { value: true },
    },
    vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
    fragmentShader: `
        uniform sampler2D image;
        uniform bool overlay;
        varying vec2 vUv;

        void main() {
          vec4 baseColor = texture2D(image, vUv);
          vec4 overlayColor = vec4(0.0, 0.0, 0.0, 0.6);
            gl_FragColor = mix(baseColor, overlayColor, overlayColor.a);

        }
        `,
  });

export default overlayMaterial;
