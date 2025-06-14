import { Player } from './Player.ts';
import { MediaControl } from './plugins/MediaControl/MediaControl.ts';
import HTML5Playback from './playbacks/HTML5Playback';
import HLSPlayback from './playbacks/HLSPlayback';

export const Plugins = {
  MediaControl,
};

export const Playbacks = {
  HTML5Playback,
  HLSPlayback,
};

export { Player };
