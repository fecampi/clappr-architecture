import { CoreInterface } from "../core/Interfaces";

// Opções de configuração para plugins
export interface PluginOptions {
  enabled?: boolean;
  priority?: number;
  [key: string]: any;
}

// Interface para construtores de classes de plugin
export interface PluginConstructor {
  new (core: any, options?: PluginOptions): PluginInstance;
}

// Interface que define a API de uma instância de plugin
export interface PluginInstance {
  // Estado do plugin
  enabled: boolean;

  // Lifecycle methods
  enable(): void;
  disable(): void;
  destroy(): void;
  isEnabled(): boolean;

  // Métodos opcionais do ciclo de vida
  onEnable?(): void;
  onDisable?(): void;
  onDestroy?(): void;

  // Referência ao construtor para identificação
  constructor: { name: string };
}

// Interface específica para plugins de UI
export interface UIPluginInstance extends PluginInstance {
  // Método de renderização
  render(): HTMLElement | void;

  // Elemento DOM do plugin
  element: HTMLElement | null;

  // Utilitários
  getElement(): HTMLElement | null;
}

// Tipos para diferentes categorias de plugins
export type PluginCategory = 'ui' | 'core' | 'container' | 'playback';

export interface PluginMetadata {
  name: string;
  version: string;
  category: PluginCategory;
  description?: string;
  author?: string;
  dependencies?: string[];
}

// Interface para registro de plugins
export interface PluginRegistry {
  [pluginName: string]: {
    constructor: PluginConstructor;
    metadata: PluginMetadata;
    options?: PluginOptions;
  };
}