const videoOptions = [
  {
    label: "Big Buck Bunny (Apple HLS .m3u8)",
    url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8",
    options: {},
  },
  {
    label: "Bunny (FairPlay .m3u8)",
    url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_4x3_variant/master.m3u8",
    options: {},
  },
  {
    label: "Multi-bitrate (16x9 .m3u8)",
    url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_16x9_variant/master.m3u8",
    options: {},
  },
  {
    label: "Segmento MPEG-TS (.ts)",
    url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/v4_1_a.ts",
    options: {},
  },
  {
    label: "Big Buck Bunny MP4 (.mp4)",
    url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
    options: {},
  },
  {
    label: "Sintel WebM (.webm)",
    url: "https://storage.googleapis.com/webm-samples/animation/sintel_trailer-480p.webm",
    options: {},
  },
  {
    label: "Shaka Demo DASH (CORS liberado)",
    url: "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd",
    options: {},
  },
  {
    label: "HLS Interstitial Demo (MP4)",
    url: "https://devstreaming-cdn.apple.com/videos/wwdc/2022/10145/4/1BA9D9C4-C8EC-4D33-A67A-2DFEBD032041/downloads/wwdc2022-10145_hd.mp4?dl=1",
    options: { isInterstitial: true },
  },
];

export default videoOptions;
