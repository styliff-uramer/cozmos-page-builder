# Cozmos Page Builder

## Setup Instructions

### Prebuild component plan

![diagram of potential component layout](/public/images/component-plan.png)

### Prebuild brainstorm

1. Create ‘canvas’ mesh

2. HTML input box to store URL,

- Zustand used to store following data about each upload.
  - Image url
  - Position
  - Rotation
  - Filter enabled
  - type - image/video

3. Make PaintableCanvas Element

4. Create Image/Video container component, map over zustand state to display on paintableCanvas

5. Make items Draggable

- Raycasting?
- Drag controls?
- Gsap or vertex shader to add "vibrate" animation while dragging

6. If dropped on canvas, record location and add to state, if dragged off canvas, discard

- Raycasting?
- Manually work out corner positions then compare?

7. Add Filters

- glsl!
- Add glsl colour overlay
- Implement ink outline (https://twitter.com/WillMaddicott/status/1648791950894432259)
- Imlement pencil shading (https://twitter.com/WillMaddicott/status/1650596978936487937)

8. Possible optomisations

- Client side image optomisation on upload - possible use https://github.com/FatehAK/vite-plugin-image-optimizer ?
- Occlusion culling
- Instanced Meshed, may not be suitable here, need to share a texture
- Texture Atlas - also may not be suitable as

### Additional features brainstorm

- Snap to grid
- Position suggestions
