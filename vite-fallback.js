// vite-fallback.js
const path = require('path');

// 1. Force correct esbuild binary
try {
  process.env.ESBUILD_BINARY_PATH = 
    path.join(__dirname, 'node_modules', '@esbuild', 'win32-x64', 'esbuild.exe');
} catch {
  console.warn('Using esbuild WASM fallback');
}

// 2. Force correct Rollup binary
try {
  require('@rollup/rollup-win32-x64-msvc');
} catch {
  console.warn('Using Rollup WASM fallback');
}

// 3. Launch Vite
require('vite/dist/node/cli');