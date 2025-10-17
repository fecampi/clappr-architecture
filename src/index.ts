import { Player, Plugins, Playbacks } from "./CustomPlayerBundle";

if (Playbacks && Plugins) {
  const player = new Player({ type: "html5" });

  player.registerPlayback(Playbacks.HTML5Playback);
  player.registerPlayback(Playbacks.HLSPlayback);
  player.registerPlayback(Playbacks.ShakaPlayback);
  player.registerPlugin(Plugins.MediaControl);

  // Criar seletor de vídeos
  const videoSelect = document.createElement("select");
  videoSelect.id = "video-selector";

  const videoOptions = [
    {
      label: "Big Buck Bunny (Apple HLS .m3u8)",
      url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8",
    },
    {
      label: "Bunny (FairPlay .m3u8)",
      url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_4x3_variant/master.m3u8",
    },
    {
      label: "Multi-bitrate (16x9 .m3u8)",
      url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_16x9_variant/master.m3u8",
    },
    {
      label: "Segmento MPEG-TS (.ts)",
      url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/v4_1_a.ts",
    },
    {
      label: "Big Buck Bunny MP4 (.mp4)",
      url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
    },
    {
      label: "Sintel WebM (.webm)",
      url: "https://storage.googleapis.com/webm-samples/animation/sintel_trailer-480p.webm",
    },
    {
      label: "Shaka Demo DASH (CORS liberado)",
      url: "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd",
    },
  ];

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
    player.load(url);
  });

  removeButton.addEventListener("click", () => {
    // Remove todos os elementos <video> do body
    document.querySelectorAll('video').forEach(video => video.remove());
  });

  // Carregar o primeiro vídeo automaticamente
  player.load(videoOptions[0].url);
} else {
  console.error("Playbacks ou Plugins não estão definidos");
}

function logHello() {
  console.log("Olá! Este código roda tanto no Node.js quanto no navegador.");
}

if (typeof window !== "undefined") {
  logHello();
}
