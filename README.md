# Projeto de Estudo da Arquitetura do Clappr

Este projeto foi criado para fins de estudo da arquitetura do player Clappr, com foco em compreender como seus componentes, plugins e playbacks interagem. O objetivo é explorar a estrutura, modularidade e padrões usados no Clappr para fins educacionais.

## Descrição do Projeto

Este estudo explora a arquitetura modular do Clappr, composta por camadas principais:

- **Player**: Classe principal que controla o fluxo do player.
- **Core**: Núcleo que gerencia plugins, containers e a lógica central.
- **Container**: Agrupa elementos visuais e gerencia o playback ativo.
- **Playback**: Módulo que representa tipos de reprodução (ex: HLS, DASH, MP4).

Utiliza uma hierarquia baseada em:

- **BaseObject**: Classe base com funcionalidades comuns como sistema de eventos.
- **Plugins e UIPlugins**: Para extensão e interface visual.
- **CorePlugin, ContainerPlugin e suas variações UI**: Plugins especializados em cada camada.



## Funcionalidades
- [x] Registro e gerenciamento de plugins
- [x] Registro e seleção dinâmica de playbacks
- [x] Eventos básicos para controle de mídia (play, pause)
- [x] Estrutura organizada em módulos TypeScript
- [ ] Separação clara entre lógica e interface (view)

## Tarefas pendentes
- [ ] Separar claramente a view dos componentes
- [ ] Implementar playbacks reais (HTML5, Shaka, HLS)

## Como usar
- [x] Clone este repositório
- [x] Instale dependências (se houver)
- [x] Explore o código-fonte para entender a arquitetura
- [x] Execute exemplos ou testes para ver o player em ação
