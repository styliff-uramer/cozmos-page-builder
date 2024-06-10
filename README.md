# Cozmos Page Builder

## Table of Contents

- [Intro](#intro)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Instructions for Use](#instructions-for-use)
  - [Arranging the media on your canvas](#arranging-the-media-on-your-canvas)
  - [Deleting the Media](#deleting-the-media)
  - [Applying the filters](#applying-the-filters)
- [Further bits](#further-bits)
- [Pretask brainstorming and planning](#pretask-ideas-and-planning)
  - [Prebuild component plan](#prebuild-component-plan)
  - [Prebuild ideas](#prebuild-ideas)

## Intro

This is a mock up of a page builder website create with Vite, React, Typescript and Three.js

https://github.com/willmadd/cozmos-page-builder/assets/39624752/f643ff64-90c8-4fb1-975d-658be4f7b87b

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- yarn

### Installation

1. **Clone the repository**

```sh
git clone https://github.com/willmadd/cozmos-page-builder.git
```

```sh
cd cozmos-page-builder
```

2. **Install dependencies**

```sh
yarn install
```

3. **Start Development Server**

```sh
yarn dev
```

## Instructions for Use

In the input box paste a link to any publicly accessible image or video

Supported formats are

- jpg
- png
- mov
- mp4

### Arranging the media on your canvas

- Drag the media to move is

### Deleting the Media

- Drag the media off the canvas

### Applying the filters

- Click on the toggle button above the media to apply the filters, there are 4 filters to chose from.

  - Unfiltered
  - Black overlay
  - Inverted Colours
  - Bland and White

  I have only used simple glsl filters here due to time constraints, but please see links below for some other filters I have written and would have implemented if I had had more time

  - https://twitter.com/WillMaddicott/status/1650596978936487937
  - https://twitter.com/WillMaddicott/status/1648791950894432259

## Further bits

Due to time constraints I was unable to finish all the extra tasks, but here's how I would have implemented them given more time

**The state of the canvas can be saved and restored**

- To do this I would simply serialise the data (to account for the THREE.Vector3's in the data array) and store them in either a database, or local storage depending on the use case

**items can be rotated**

- This would have been handled the same way as I am currently storing the mesh positions

**ideas of optimizations for extreme quantities of items (500+)**

- To further optimise the canvas for dealing with large numbers of items there are a few methods I could investigate
  - First would be using a texture atlas, loading in just one image with all the textures stored at certain co-ordinates, which are then mapped onto meshes. This means just one material us used for multiple meshes
  - If we were looking for an advanced solution then I would need to investigate Occlusion culling, not natively supported in three.js, but theoretically possible in glsl
  - We could also look at some client or server side image and video optimisation to reduce file sizes and hence memory use. e.g. https://github.com/FatehAK/vite-plugin-image-optimizer

**Due to time constraints I have not optimised this for mobile, it is assumed you are using this on a desktop device.**

**There are code comments in the code where I have explained why I've done something or what it's doing. These are my own, and not from chat GPT**

## Pretask ideas and planning

This section contains the notes that I made before starting the project

### Prebuild component plan

![diagram of potential component layout](/public/images/component-plan.png)

### Prebuild ideas

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

8. Possible optimisations

- Client side image optomisation on upload - possible use https://github.com/FatehAK/vite-plugin-image-optimizer ?
- Occlusion culling
- Instanced Meshed, may not be suitable here, need to share a texture
- Texture Atlas - also may not be suitable as

### Additional features brainstorm

- Snap to grid
- Position suggestions
