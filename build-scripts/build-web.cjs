const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');
const { spawnSync } = require('child_process');

const outDir = path.resolve(__dirname, '../dist/web');
const outFile = path.resolve(outDir, 'index.js');
const htmlFile = path.resolve(outDir, 'index.html');
const srcDir = path.resolve(__dirname, '../src');

async function buildAndWatch() {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Copia arquivo HTML
  fs.copyFileSync(path.resolve(srcDir, 'index.html'), htmlFile);

  // Copia shaka-player compilado para libs/
  const libsDir = path.resolve(outDir, 'libs');
  if (!fs.existsSync(libsDir)) {
    fs.mkdirSync(libsDir, { recursive: true });
  }
  const shakaSource = path.resolve(__dirname, '../node_modules/shaka-player/dist/shaka-player.compiled.js');
  const shakaTarget = path.resolve(libsDir, 'shaka-player.compiled.js');
  if (fs.existsSync(shakaSource)) {
    fs.copyFileSync(shakaSource, shakaTarget);
    console.log('📦 Shaka Player copiado para dist/web/libs/');
  }

  // Copia shaka-player debug
  const shakaDebugSource = path.resolve(__dirname, '../node_modules/shaka-player/dist/shaka-player.compiled.debug.js');
  const shakaDebugTarget = path.resolve(libsDir, 'shaka-player.compiled.debug.js');
  if (fs.existsSync(shakaDebugSource)) {
    fs.copyFileSync(shakaDebugSource, shakaDebugTarget);
    console.log('🐛 Shaka Player (debug) copiado para dist/web/libs/');
  }

  // Copia hls.js compilado para libs/
  const hlsSource = path.resolve(__dirname, '../node_modules/hls.js/dist/hls.min.js');
  const hlsTarget = path.resolve(libsDir, 'hls.min.js');
  if (fs.existsSync(hlsSource)) {
    fs.copyFileSync(hlsSource, hlsTarget);
    console.log('📦 HLS.js copiado para dist/web/libs/');
  }

  // cria o contexto de build (para watch e serve)
  const ctx = await esbuild.context({
    entryPoints: [path.resolve(srcDir, 'index.ts')],
    outfile: outFile,
    bundle: true,
    platform: 'browser',
    target: 'es2020',
    sourcemap: true,
    external: ['shaka-player', 'hls.js'],
  });

  // habilita watch
  await ctx.watch();

  console.log('🚀 Build inicial completa, iniciando live-server...');

  spawnSync('npx', ['live-server', outDir, '--open'], {
    stdio: 'inherit',
  });
}

buildAndWatch().catch((e) => {
  console.error(e);
  process.exit(1);
});
