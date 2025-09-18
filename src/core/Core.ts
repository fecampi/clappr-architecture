import Container from "./Container.js";
import UIPlugin from "../plugins/UIPlugin.js";
import BaseObject from "../base/BaseObject.js";
import { PlaybackConstructor, PlaybackInstance, PlaybackOptions } from "../playbacks/Interfaces.js";
import { PluginConstructor, PluginInstance } from "../plugins/Interfaces.js";

class Core extends BaseObject {
  containers: Container[];
  plugins: PluginInstance[];
  playbacks: PlaybackConstructor[];
  activeContainer: Container | null;

  constructor(options?: any) {
    super();
    this.containers = [new Container()]; // Novo: inicia com um container padrão
    this.activeContainer = this.containers[0]; // Define o primeiro container como ativo
    this.plugins = [];
    this.playbacks = [];
  }

  createPlayback(options: PlaybackOptions): void {
    console.log("Tentando criar playback para:", options);
    console.log(
      "Playbacks registrados:",
      this.playbacks.map((p) => p.name)
    );

    if (!this.activeContainer) {
      console.log("Nenhum container ativo disponível");
      return;
    }

    for (const PlaybackClass of this.playbacks) {
      if (PlaybackClass?.canPlay?.(options.src || '')) {
        console.log("Playback encontrado:", PlaybackClass.name);
        const playbackInstance = new PlaybackClass(this, options);
        this.activeContainer.setPlayback(playbackInstance);
        return;
      }
    }

    console.log(
      "Nenhum playback disponível pode reproduzir a mídia fornecida."
    );
  }

  load(src: string): void {
    this.createPlayback({ src });
    const activePlayback = this.activeContainer?.getPlayback();
    if (activePlayback?.load instanceof Function) {
      console.log(
        "Carregando mídia com playback:",
        activePlayback.constructor.name
      );
      activePlayback.load(src);
    } else {
      console.log("Nenhum playback disponível para carregar a mídia.");
    }
  }

  registerPlugin(plugin: PluginConstructor): void {
    console.log(`[Core] Registrando plugin: ${plugin.name}`);
    const pluginInstance = new plugin(this);
    this.plugins.push(pluginInstance);
    if (pluginInstance instanceof UIPlugin) {
      console.log("[Core] Plugin UI detectado, adicionando aos containers");
      this.containers.forEach(container => container.addUIPlugin(pluginInstance));
    }
  }

  registerPlayback(playback: PlaybackConstructor): void {
    console.log("Registrando playback:", playback.name);
    this.playbacks.push(playback);
  }

  isPlaying(): boolean {
    return false;
  }

  // Removidos: play() e pause() - lógica movida para Player

  unregisterPlugin(plugin: PluginConstructor): void {
    const pluginIndex = this.plugins.findIndex((p) => p.constructor === plugin);
    if (pluginIndex !== -1) {
      const [pluginInstance] = this.plugins.splice(pluginIndex, 1);
      if (pluginInstance instanceof UIPlugin) {
        this.containers.forEach(container => container.removeUIPlugin(pluginInstance));
      }
      pluginInstance.destroy();
    }
  }

  // Novos métodos para gerenciar múltiplos containers
  addContainer(container: Container): void {
    this.containers.push(container);
  }

  removeContainer(container: Container): void {
    const index = this.containers.indexOf(container);
    if (index !== -1) {
      this.containers.splice(index, 1);
    }
  }

  // Método para obter o playback ativo (para delegação)
  getActivePlayback(): PlaybackInstance | null {
    return this.activeContainer?.getPlayback() || null;
  }

  destroy(): void {
    // Destruir todos os plugins
    this.plugins.forEach(plugin => {
      if (typeof plugin.destroy === 'function') {
        plugin.destroy();
      }
    });
    this.plugins = [];

    // Destruir todos os containers
    this.containers.forEach(container => {
      // Remover elementos DOM se existirem
      if (container.element && container.element.parentNode) {
        container.element.parentNode.removeChild(container.element);
      }
    });
    this.containers = [];
    this.activeContainer = null;
  }
}

export default Core;
