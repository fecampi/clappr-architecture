import { Player, Plugins, Playbacks } from "./CustomPlayerBundle";
import videoOptions from "./config/videoOptions";

if (Playbacks && Plugins) {
  const player = new Player({ type: "html5" });

  player.registerPlayback(Playbacks.HTML5Playback);
  player.registerPlayback(Playbacks.HLSPlayback);
  player.registerPlayback(Playbacks.ShakaPlayback);
  player.registerPlugin(Plugins.MediaControl);

  // Criar seletor de vídeos
  const videoSelect = document.createElement("select");
  videoSelect.id = "video-selector";

  videoOptions.forEach((opt, idx) => {
    const option = document.createElement("option");
    option.value = opt.url;
    option.textContent = opt.label;
    if (idx === 0) option.selected = true;
    videoSelect.appendChild(option);
  });

  document.body.appendChild(videoSelect);

  // Botão OK para carregar vídeo
  const okButton = document.createElement("button");
  okButton.textContent = "OK";
  okButton.id = "ok-button";
  document.body.appendChild(okButton);

  // Botão Remover para remover vídeo
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remover";
  removeButton.id = "remove-button";
  document.body.appendChild(removeButton);

  okButton.addEventListener("click", () => {
    const url = videoSelect.value;
    const selectedVideo = videoOptions.find((opt) => opt.url === url);
    if (selectedVideo) {
      const { url, options } = selectedVideo;
      player.load(url, options);
    }
  });

  removeButton.addEventListener("click", () => {
    document.querySelectorAll("video").forEach((video) => video.remove());
  });
} else {
  console.error("Playbacks ou Plugins não estão definidos");
}
