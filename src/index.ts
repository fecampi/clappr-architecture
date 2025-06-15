import { Player, Plugins, Playbacks } from "./CustomPlayerBundle";

if (Playbacks && Plugins) {
  const player = new Player({ type: "html5" });

  player.registerPlayback(Playbacks.HTML5Playback);
  player.registerPlayback(Playbacks.HLSPlayback);
  player.registerPlugin(Plugins.MediaControl);

  // Criar select com opções de vídeos
  const videoSelect = document.createElement("select");
  videoSelect.id = "video-select";

  // Opções de vídeos demo
  const videos = [
    { label: "Selecione um vídeo...", url: "" },
    { label: "Big Buck Bunny (MP4)", url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4" },
    { label: "Sintel Trailer (MP4)", url: "https://media.w3.org/2010/05/sintel/trailer.mp4" },
    { label: "HLS Test Stream (m3u8)", url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" },
    { label: "Apple Sample Stream (m3u8)", url: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8" }
  ];

  videos.forEach(({ label, url }) => {
    const option = document.createElement("option");
    option.value = url;
    option.textContent = label;
    videoSelect.appendChild(option);
  });

  // Criar botão para carregar o vídeo selecionado
  const loadVideoButton = document.createElement("button");
  loadVideoButton.id = "load-video";
  loadVideoButton.textContent = "Carregar vídeo";

  // Adicionar select e botão ao body ou container
  document.body.appendChild(videoSelect);
  document.body.appendChild(loadVideoButton);

  // Evento do botão
  loadVideoButton.addEventListener("click", () => {
    const url = videoSelect.value;
    if (!url) {
      alert("Por favor, selecione um vídeo válido.");
      return;
    }
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
