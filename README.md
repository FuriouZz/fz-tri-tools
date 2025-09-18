# fz-tri-tools

A bunch of tools for working in 3D on the web.

You will find:
- `packages/transformer` which optimize glb files and convert .exr, .hdr files into gainmap.
   - use [gltf-transform](https://gltf-transform.dev/)
   - use [toktx](https://github.khronos.org/KTX-Software/ktxtools/toktx.html)
   - use [@monogrid/gainmap-js](https://gainmap-creator.monogrid.com/)
- `packages/viewer` to display glb files and environment map
  - use [three.js](https://threejs.org/)
  - use [@monogrid/gainmap-js](https://gainmap-creator.monogrid.com/)

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
