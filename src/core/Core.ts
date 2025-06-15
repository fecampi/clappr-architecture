import Container from "./Container.ts";
import UIPlugin from "../plugins/UIPlugin/UIPlugin.ts";
import BaseObject from "../base/BaseObject.ts";

interface PlaybackConstructor {
  new (core: Core, options: any): PlaybackInstance;
  canPlay?(src: string): boolean;
  name: string;
}

interface PlaybackInstance {
  load?(src: string): void;
  play(): void;
  pause(): void;
  constructor: { name: string };
}

type PluginConstructor = new (core: Core) => PluginInstance;

interface PluginInstance {
  destroy(): void;
}

class Core extends BaseObject {
  container: Container;
  plugins: PluginInstance[];
  playbacks: PlaybackConstructor[];
  playback: PlaybackInstance | null;

  constructor(options?: any) {
    super();
    this.container = new Container(); // instanciar Container sem argumentos
    this.plugins = [];
    this.playbacks = [];
    this.playback = null;
  }

  createPlayback(options: { src: string }): void {
    console.log("Tentando criar playback para:", options);
    console.log(
      "Playbacks registrados:",
      this.playbacks.map((p) => p.name)
    );

    for (const PlaybackClass of this.playbacks) {
      if (PlaybackClass?.canPlay?.(options.src)) {
        console.log("Playback encontrado:", PlaybackClass.name);
        this.playback = new PlaybackClass(this, options);
        return;
      }
    }

    console.log(
      "Nenhum playback disponível pode reproduzir a mídia fornecida."
    );
  }

  load(src: string): void {
    this.createPlayback({ src });
    if (this.playback?.load instanceof Function) {
      console.log(
        "Carregando mídia com playback:",
        this.playback.constructor.name
      );
      this.playback.load(src);
    } else {
      console.log("Nenhum playback disponível para carregar a mídia.");
    }
  }

  registerPlugin(plugin: PluginConstructor): void {
    console.log(`[Core] Registrando plugin: ${plugin.name}`);
    const pluginInstance = new plugin(this);
    this.plugins.push(pluginInstance);
    if (pluginInstance instanceof UIPlugin) {
      console.log("[Core] Plugin UI detectado, adicionando ao container");
      this.container.addUIPlugin(pluginInstance);
    }
  }

  registerPlayback(playback: PlaybackConstructor): void {
    console.log("Registrando playback:", playback.name);
    this.playbacks.push(playback);
  }

  isPlaying(): boolean {
    return false;
  }

  play(): void {
    if (this.playback) {
      console.log(
        "Reproduzindo mídia com playback:",
        this.playback.constructor.name
      );
      this.playback.play();
    } else {
      console.log("Nenhum playback disponível para reproduzir a mídia.");
    }
  }

  pause(): void {
    if (this.playback) {
      console.log(
        "Pausando mídia com playback:",
        this.playback.constructor.name
      );
      this.playback.pause();
    } else {
      console.log("Nenhum playback disponível para pausar a mídia.");
    }
  }

  unregisterPlugin(plugin: PluginConstructor): void {
    const pluginIndex = this.plugins.findIndex((p) => p.constructor === plugin);
    if (pluginIndex !== -1) {
      const [pluginInstance] = this.plugins.splice(pluginIndex, 1);
      if (pluginInstance instanceof UIPlugin) {
        this.container.removeUIPlugin(pluginInstance);
      }
      pluginInstance.destroy();
    }
  }
}

export default Core;
