import esbuild from 'esbuild';

const production = process.argv[2] === 'production';

esbuild.build({
  entryPoints: ['src/main.js'],
  bundle: true,
  external: [
    'obsidian', 'electron',
    '@codemirror/*', '@lezer/*',
    // Node.js built-ins available in Electron's renderer process
    'child_process', 'fs', 'path', 'os', 'crypto', 'stream', 'events', 'util',
  ],
  format: 'cjs',
  target: 'es2020',
  logLevel: 'info',
  sourcemap: production ? false : 'inline',
  treeShaking: true,
  outfile: 'main.js',
  minify: production,
}).catch(() => process.exit(1));
