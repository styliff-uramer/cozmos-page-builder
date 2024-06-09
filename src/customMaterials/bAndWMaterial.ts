import * as THREE from "three";

const blackAndWhiteMaterial = (texture: any) =>
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

          float gray = dot(baseColor.rgb, vec3(0.299, 0.587, 0.114));
          vec4 grayscaleColor = vec4(gray, gray, gray, baseColor.a);

         vec4 overlayColor = vec4(0.0, 0.0, 0.0, 0.6);
         gl_FragColor = mix(grayscaleColor, overlayColor, overlayColor.a);
        }
        `,
  });

export default blackAndWhiteMaterial;
