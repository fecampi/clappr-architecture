import Core from "./core/Core";

interface PlayerOptions {
  type?: string;
  [key: string]: any;
}

type PluginConstructor = new (core: Core) => any;
type PlaybackConstructor = new (core: Core, options: any) => any;

class Player {
  private core: Core;

  constructor(options: PlayerOptions) {
    this.core = new Core(options);
  }

  load(src: string): void {
    this.core.load(src);
  }

  registerPlugin(plugin: PluginConstructor): void {
    this.core.registerPlugin(plugin);
  }

  registerPlayback(playback: PlaybackConstructor): void {
    this.core.registerPlayback(playback);
  }
}

export { Player };
