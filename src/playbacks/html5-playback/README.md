# HTML5Playback – Introdução

O `HTML5Playback` é responsável por reproduzir vídeos utilizando o elemento nativo `<video>` do HTML5, sem dependências externas. É a solução mais simples e compatível para reprodução de arquivos locais ou streams suportados diretamente pelo navegador.

---

## Formatos Suportados
- MP4 (`.mp4`)
- WebM (`.webm`)
- OGG (`.ogg`)
- MPEG-TS (`.ts`) – suporte depende do navegador

---

## Fluxo de Integração
1. O método `load(src)` cria um elemento `<video>`, define o `src` e adiciona ao DOM.
2. O método `play()` inicia a reprodução do vídeo carregado.
3. O método estático `canPlay(src)` verifica se o arquivo possui extensão suportada.

---

## Principais Eventos do `<video>`
Você pode monitorar eventos do elemento `<video>` para depuração e controle:
- `loadedmetadata`: metadados do vídeo carregados
- `canplay`: vídeo pronto para reprodução
- `play`: reprodução iniciada
- `pause`: reprodução pausada
- `ended`: vídeo finalizado
- `error`: erro na reprodução


## Eventos

Falta mapear eventos...


---

## Referências
- [MDN Web Docs – HTMLVideoElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement)


---

Este componente é ideal para cenários onde o navegador já suporta o formato de vídeo desejado, garantindo simplicidade, performance e compatibilidade ampla.
