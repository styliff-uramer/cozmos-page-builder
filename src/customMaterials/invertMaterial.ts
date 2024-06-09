import * as THREE from "three";

const invertMaterial = (texture: any) =>
  new THREE.ShaderMaterial({
    uniforms: {
      image: { value: texture },
    },
    vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
    fragmentShader: `
        uniform float uTime;
        uniform sampler2D image;
        uniform bool overlay;
        varying vec2 vUv;
        
        void main() {
          vec4 baseColor = texture2D(image, vUv);
          gl_FragColor = vec4(vec3(1.0) - baseColor.rgb, baseColor.a);
        }
        `,
  });

export default invertMaterial;
