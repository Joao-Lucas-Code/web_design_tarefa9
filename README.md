# Projeto Agência Criativa - Tarefa 9: Aprofundando a Interatividade com Eventos JavaScript

Bem-vindo à documentação da Tarefa 9 do projeto "Agência Criativa". Esta fase representa uma evolução significativa da interatividade do site, com foco na implementação de novos eventos de JavaScript para criar uma experiência de usuário ainda mais rica, responsiva e dinâmica.

Além da adição de novos eventos, o projeto foi massivamente expandido com várias novas seções de conteúdo (`Processo`, `Equipe`, `Depoimentos`, `Blog`) para atender aos requisitos de volume de código, resultando em uma aplicação web front-end completa e robusta, com mais de 700 linhas de HTML, 400 de CSS e 300 de JS.

---

## ✨ Visão Geral da Tarefa 9

O objetivo principal desta tarefa foi aprofundar os conhecimentos em manipulação de eventos do DOM. Foram adicionados 5 novos tipos de eventos de JavaScript, seguindo as melhores práticas e aplicando-os em contextos que melhoram a usabilidade e o feedback visual da página.

Para cumprir os requisitos de tamanho de arquivo de forma significativa, o site foi expandido de uma simples landing page para um site "one-page" completo, com seções detalhadas que um cliente real esperaria de uma agência.

---

## 🚀 Tecnologias e Conceitos Aplicados

Este projeto continua a ser construído com as tecnologias fundamentais do front-end, reforçando os conceitos aprendidos:

* **HTML5:** A estrutura foi enriquecida com múltiplas tags semânticas (`<section>`, `<article>`, `<nav>`, `<footer>`). O uso de `data-*` como hooks para JavaScript e atributos ARIA (`aria-expanded`, `aria-label`) foi mantido para garantir acessibilidade. O arquivo ultrapassa 700 linhas com conteúdo e comentários detalhados.

* **CSS3:** Foram adicionados novos estilos para todas as novas seções (Blog, Processo, Equipe, Depoimentos, Footer Detalhado) e para os estados visuais acionados pelos novos eventos (`.highlight`, `.focused`). O uso de `Grid Layout` e `Flexbox` foi combinado para criar layouts complexos e responsivos. O arquivo ultrapassa 400 linhas.

* **JavaScript (ES6+):** O foco principal da tarefa. O `script.js` foi refatorado para incluir novas funções que lidam com os seguintes eventos: `mouseover`, `mouseout`, `focus`, `blur` e `keydown`, e atualizado para lidar com a nova estrutura de seções. O arquivo ultrapassa 300 linhas.

---

## 📋 Funcionalidades e Eventos Implementados

O site agora conta com mais de 15 interações e eventos distintos.

### Bloco 1: Novos Eventos (Tarefa 9)

#### 1. Eventos `mouseover` e `mouseout`: Destaque Interativo

* **Descrição:** Para fornecer um feedback visual mais forte, os cards na seção "Nossos Serviços" agora reagem quando o usuário passa o mouse sobre eles. Eles se destacam com uma sombra mais pronunciada, uma borda colorida e um leve efeito de zoom.
* **Implementação Técnica:** Dois `eventListener`s foram adicionados a cada card:
    * `mouseover`: Adiciona a classe `.highlight` ao card, que ativa as transições CSS para o efeito de destaque.
    * `mouseout`: Remove a classe `.highlight`, retornando o card ao seu estado original de forma suave.
* **Localização no Código:** `initServiceCardHighlight()` em `script.js`.

#### 2. Eventos `focus` e `blur`: Melhoria de Acessibilidade no Formulário

* **Descrição:** Para melhorar a experiência de preenchimento do formulário, especialmente para usuários que navegam via teclado, os campos agora têm um feedback visual claro quando estão selecionados. A `label` e a borda do campo mudam de cor, indicando qual elemento está ativo.
* **Implementação Técnica:**
    * `focus`: Adiciona a classe `.focused` ao `div` pai (`.form-group`) do input, permitindo que tanto a `label` quanto o `input` sejam estilizados via CSS.
    * `blur`: Remove a classe `.focused` quando o campo perde o foco.
* **Localização no Código:** `initFormFocusEvents()` em `script.js`.

#### 3. Evento `keydown`: Atalho de Teclado para Acessibilidade

* **Descrição:** Como uma funcionalidade extra de acessibilidade e conveniência, foi implementado um atalho de teclado. O usuário pode pressionar a tecla **"T"** em qualquer lugar da página para alternar entre os temas claro e escuro.
* **Implementação Técnica:** Um `eventListener` de `keydown` foi adicionado ao `document`. A função de callback verifica se a tecla pressionada foi `t` (insensível a maiúsculas/minúsculas) e se o foco não está em um campo de texto (para não interferir na digitação). Se as condições forem atendidas, a função `toggleTheme()` é chamada.
* **Localização no Código:** `initThemeKeyboardShortcut()` em `script.js`.

#### 4. Evento `copy`: Microinteração de Conteúdo

* **Descrição:** Quando um usuário seleciona e copia qualquer texto da página, uma mensagem é registrada no console. Em produção, isso poderia acionar um toast de "Conteúdo copiado!".
* **Implementação Técnica:** Um `eventListener` de `copy` é anexado ao `document`.
* **Localização no Código:** `initCopyEvent()` em `script.js`.

#### 5. Evento `contextmenu`: Personalização da Experiência

* **Descrição:** Para fins de demonstração, o menu de contexto padrão do navegador (clique direito) é interceptado, e uma mensagem é registrada no console.
* **Implementação Técnica:** Um `eventListener` de `contextmenu` no `document` é capturado. O `event.preventDefault()` (comentado no código) pode ser usado para impedir a ação padrão.
* **Localização no Código:** `initContextMenuOverride()` em `script.js`.

---

### Bloco 2: Funcionalidades de Base (Tarefa 8)

* **Menu Mobile (Hamburger):** Controla a navegação em telas pequenas.
* **Rolagem Suave (Smooth Scroll):** Rola suavemente para todas as 9 seções do site.
* **Destaque de Link Ativo:** Destaca o link no menu correspondente à seção visível.
* **Validação de Formulário:** Verifica os campos de contato em tempo real.
* **Modal de Confirmação:** Exibe um pop-up de sucesso após o envio do formulário.
* **Alternador de Tema (Dark/Light Mode):** Botão que alterna o tema e salva no `localStorage`.
* **Botão "Voltar ao Topo":** Botão flutuante que aparece ao rolar a página.
* **Acordeão de FAQ:** Seção de FAQ expansível.
* **Animação ao Rolar (Scroll Reveal):** An