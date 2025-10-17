import { Player } from './Player.ts';
import { MediaControl } from './plugins/MediaControl/MediaControl.ts';
import HTML5Playback from './playbacks/html5-playback/HTML5Playback';
import HLSPlayback from './playbacks/hlsjs-playback/HLSPlayback.ts';
import ShakaPlayback from "./playbacks/shaka-playback/ShakaPlayback.ts"

export const Plugins = {
  MediaControl,
};

export const Playbacks = {
  HTML5Playback,
  HLSPlayback,
  ShakaPlayback, 
};

export { Player };
