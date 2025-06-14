const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');
const { spawn } = require('child_process');

const outDir = path.resolve(__dirname, '../dist/web');
const outFile = path.resolve(outDir, 'index.js');
const htmlFile = path.resolve(outDir, 'index.html');
const srcDir = path.resolve(__dirname, '../src');

async function buildAndWatch() {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.copyFileSync(path.resolve(srcDir, 'index.html'), htmlFile);

  // cria o contexto de build (para watch e serve)
  const ctx = await esbuild.context({
    entryPoints: [path.resolve(srcDir, 'index.ts')],
    outfile: outFile,
    bundle: true,
    platform: 'browser',
    target: 'es2020',
    sourcemap: true,
  });

  // habilita watch
  await ctx.watch();

  console.log('🚀 Build inicial completa, iniciando live-server...');

  spawn('npx', ['live-server', outDir, '--quiet', '--open='], {
    stdio: 'inherit',
    shell: true,
  });
}

buildAndWatch().catch((e) => {
  console.error(e);
  process.exit(1);
});
