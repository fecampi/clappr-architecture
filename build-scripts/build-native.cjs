const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const outDir = path.resolve(__dirname, '../dist/native');
const outFile = path.resolve(outDir, 'index.js');

async function buildNative() {
  // Verifica se build já existe
  if (fs.existsSync(outFile)) {
    console.log('⚡ Build native já existe, pulando build...');
    return;
  }

  // Cria a pasta dist/native se não existir
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Build com esbuild
  await esbuild.build({
    entryPoints: [path.resolve(__dirname, '../src/index.ts')],
    outfile: outFile,
    bundle: true,
    platform: 'node',
    target: 'node18',
    sourcemap: true,
  });

  console.log('✅ Build native finalizado!');
}

buildNative().catch((e) => {
  console.error(e);
  process.exit(1);
});
