import { Player, Plugins, Playbacks } from "./CustomPlayerBundle";

if (Playbacks && Plugins) {
  const player = new Player({ type: "html5" });

  player.registerPlayback(Playbacks.HTML5Playback);
  player.registerPlayback(Playbacks.HLSPlayback);
  player.registerPlugin(Plugins.MediaControl);

  // Criar input de texto
  const urlInput = document.createElement("input");
  urlInput.type = "text";
  urlInput.id = "video-url";
  urlInput.placeholder = "URL do vídeo";

  // Criar botão
  const loadVideoButton = document.createElement("button");
  loadVideoButton.id = "load-video";
  loadVideoButton.textContent = "OK";

  // Adicionar ao body ou a uma div/container específico
  document.body.appendChild(urlInput);
  document.body.appendChild(loadVideoButton);

  // Adicionar evento de click no botão
  loadVideoButton.addEventListener("click", () => {
    const url = urlInput.value || "";
    player.load(url);
  });
} else {
  console.error("Playbacks ou Plugins não estão definidos");
}

function logHello() {
  console.log("Olá! Este código roda tanto no Node.js quanto no navegador.");
}

if (typeof window !== "undefined") {
  logHello();
}
