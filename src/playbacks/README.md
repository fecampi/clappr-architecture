# Playbacks Integrados - Clappr Architecture

## Introdução

Nesta seção, apresentamos os playbacks integrados ao Clappr, componentes responsáveis por tornar o player compatível com diferentes formatos de mídia e protocolos de streaming. Os playbacks atuam como pontes entre o núcleo do player e as tecnologias de reprodução, permitindo que o Clappr funcione de forma flexível e eficiente em diversos cenários, como vídeos locais, streaming adaptativo e transmissões ao vivo.

Cada playback implementa uma interface comum, facilitando a integração e a troca entre diferentes soluções conforme a necessidade da plataforma. Exemplos de playbacks utilizados incluem HTML5, HLS.js e outros, cada um especializado em um tipo de mídia ou protocolo.

## Arquitetura dos Playbacks

### Classe Base: `Playback`

A classe `Playback` serve como base para todos os playbacks específicos no Clappr. Ela define:

- **Interface padrão**: Métodos como `load()`, `play()`, `pause()`, `stop()` e `seek()`
- **Gerenciamento de estado**: Controle de estados de reprodução, rede e mídia
- **Sistema de eventos**: Comunicação bidirecional com o core do Clappr
- **Propriedades comuns**: Volume, tempo atual, duração, buffers

```typescript
// Exemplo de estrutura base
class Playback extends BaseObject {
  protected core: any;
  public duration: number = 0;
  public currentTime: number = 0;
  public state: PlaybackState = PlaybackState.IDLE;
  // ... outras propriedades essenciais
}
```

### Playbacks Implementados

#### 1. HTML5Playback
**Responsabilidade**: Reprodução de mídia usando a API nativa HTML5 Video

- **Formatos suportados**: MP4, WebM, OGV
- **Características**: 
  - Reprodução básica sem adaptação de bitrate
  - Compatível com todos os navegadores modernos
  - Ideal para vídeos simples e conteúdo local

```typescript
static canPlay(src: string): boolean {
  return [".mp4", ".webm", ".ogg"].some((ext) => src.endsWith(ext));
}
```

#### 2. HLSPlayback
**Responsabilidade**: Streaming adaptativo via protocolo HLS (HTTP Live Streaming)

- **Formatos suportados**: Playlists M3U8
- **Características**:
  - Adaptação automática de qualidade baseada na largura de banda
  - Suporte a live streaming e VOD (Video on Demand)
  - Integração com bibliotecas como HLS.js para compatibilidade cross-browser

```typescript
static canPlay(src: string): boolean {
  return src.endsWith('.m3u8');
}
```

## Fluxo de Integração

### 1. Detecção Automática
O Clappr utiliza o método estático `canPlay()` de cada playback para determinar qual implementação usar:

```typescript
// Processo de seleção automática
const availablePlaybacks = [HTML5Playback, HLSPlayback];
const selectedPlayback = availablePlaybacks.find(pb => pb.canPlay(mediaUrl));
```

### 2. Ciclo de Vida
1. **Inicialização**: Playback é instanciado com configurações específicas
2. **Configuração**: Setup interno baseado nas opções fornecidas
3. **Carregamento**: Mídia é carregada via método `load()`
4. **Reprodução**: Controle através dos métodos padrão da interface
5. **Cleanup**: Limpeza de recursos quando necessário

### 3. Comunicação via Eventos
Os playbacks comunicam mudanças de estado através do sistema de eventos:


falta construir a parte de eventos  baseadas no clappr, pode ser algo assim, alterando os eventos,...
```typescript
// Exemplos de eventos disparados
this.trigger("playback:load", src);
this.trigger("playback:play");
this.trigger("playback:timeupdate", currentTime);
this.trigger("playback:ended");
```
---

**Nota**: Esta documentação faz parte do projeto de estudos da arquitetura Clappr e serve como referência para compreensão dos padrões e práticas utilizados no desenvolvimento de players de vídeo modernos.