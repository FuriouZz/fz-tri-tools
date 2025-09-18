# fz-tri-tools

A bunch of tools for working in 3D on the web.

You will find:
- `packages/transformer` which optimize glb files and convert .exr, .hdr files into gainmap.
   - use [@monogrid/gainmap-js](https://gainmap-creator.monogrid.com/)
- `packages/viewer` to display glb files and environment map

This repository depends on:
  - [three.js](https://threejs.org/)
  - [@monogrid/gainmap-js](https://gainmap-creator.monogrid.com/)
  - [gltf-transform](https://gltf-transform.dev/)
  - [toktx](https://github.khronos.org/KTX-Software/ktxtools/toktx.html)

To use this project, you need `pnpm`, `node` and `biome` (please refers to `mise.toml`)

## How to transform your assets

You need to create `assets.config.ts` or edit one provided in this repository, then run:

```sh
pnpm run transform
```

## How to launch the viewer

```sh
pnpm run viewer
```
