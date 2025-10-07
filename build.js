import { build } from 'esbuild';
import { readdirSync } from 'fs';

// Bundle client-side JavaScript
build({
  entryPoints: ['public/index.js', 'public/data-viz.js', 'public/map-layers.js'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: 'es2020',
  outdir: 'public/dist',
  splitting: true,
  format: 'esm',
  loader: {
    '.js': 'js'
  }
}).catch(() => process.exit(1));

console.log('Client bundle built successfully');
