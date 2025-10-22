/**
 * Tarefa 9 - Web Design
 * Arquivo: script.js
 * Descrição: Contém todas as funcionalidades e eventos JavaScript para o site da Agência Criativa.
 * * ÍNDICE DE FUNCIONALIDADES:
 * --- TAREFA 8 (Base) ---
 * 1.  initMobileMenu: Controla o menu hamburger em telas pequenas.
 * 2.  initSmoothScroll: Rolagem suave para âncoras internas. (ATUALIZADO)
 * 3.  initActiveLinkOnScroll: Destaca o link da seção visível. (ATUALIZADO)
 * 4.  initFormValidation: Validação do formulário de contato.
 * 5.  showModal/closeModal: Funções de controle do modal de confirmação.
 * 6.  initThemeSwitcher/toggleTheme: Controla o Dark/Light mode.
 * 7.  initBackToTopButton: Botão "Voltar ao Topo" que aparece ao rolar.
 * 8.  initFaqAccordion: Funcionalidade de acordeão para o FAQ.
 * 9.  initScrollReveal: Animação de elementos ao entrarem na tela.
 * 10. initFeatherIcons: Renderiza os ícones SVG.
 * * --- TAREFA 9 (Novos Eventos) ---
 * 11. initServiceCardHighlight: Eventos 'mouseover' e 'mouseout' nos cards de serviço.
 * 12. initFormFocusEvents: Eventos 'focus' e 'blur' nos campos do formulário.
 * 13. initThemeKeyboardShortcut: Evento 'keydown' (tecla 'T') para alternar tema.
 * 14. initCopyEvent: Evento 'copy' para exibir alerta ao copiar texto.
 * 15. initContextMenuOverride: Evento 'contextmenu' para desabilitar clique direito.
 */

// Evento 'DOMContentLoaded': Garante que o script só rode após o HTML estar completo.
document.addEventListener('DOMContentLoaded', () => {

    // ======================================================================
    // 1. FUNCIONALIDADE: MENU MOBILE (HAMBURGER)
    // ======================================================================
    const initMobileMenu = () => {
        const menuButton = document.querySelector('[data-menu="button"]');
        const navMenu = document.querySelector('[data-menu="nav"]');

        // Evento 'click' no botão do menu
        if (menuButton && navMenu) {
            menuButton.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                const isActive = navMenu.classList.contains('active');
                menuButton.setAttribute('aria-expanded', isActive);
                menuButton.setAttribute('aria-label', isActive ? 'Fechar Menu' : 'Abrir Menu');
            });
        }
    };

    // ======================================================================
    // 2. FUNCIONALIDADE: SMOOTH SCROLL (ATUALIZADO)
    // ======================================================================
    const initSmoothScroll = () => {
        // Seleciona TODOS os links que começam com #
        const internalLinks = document.querySelectorAll('a[href^="#"]');

        function scrollToSection(event) {
            event.preventDefault(); // Previne o salto padrão da âncora
            const href = event.currentTarget.getAttribute('href');
            
            // Tratamento especial para o link do logo/voltar ao topo
            const section = (href === "#") ? document.getElementById('inicio') : document.querySelector(href);

            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            // Fecha o menu mobile após clicar em um link
            const navMenu = document.querySelector('[data-menu="nav"]');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const menuButton = document.querySelector('[data-menu="button"]');
                if(menuButton) {
                    menuButton.setAttribute('aria-expanded', false);
                    menuButton.setAttribute('aria-label', 'Abrir Menu');
                }
            }
        }

        internalLinks.forEach(link => {
            // Evento 'click' em cada link de âncora
            link.addEventListener('click', scrollToSection);
        });
    };

    // ======================================================================
    // 3. FUNCIONALIDADE: ACTIVE LINK HIGHLIGHTING (ATUALIZADO)
    // ======================================================================
    const initActiveLinkOnScroll = () => {
        // Seleciona TODAS as seções que têm um ID
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        function activateMenuAtCurrentSection() {
            // Calcula o ponto de verificação (meio da tela)
            const checkpoint = window.pageYOffset + (window.innerHeight / 2);

            for (const section of sections) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                const checkpointStart = checkpoint >= sectionTop;
                const checkpointEnd = checkpoint <= (sectionTop + sectionHeight);

                if (checkpointStart && checkpointEnd) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        // Verifica se o href do link corresponde ao ID da seção visível
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        }
        // Evento 'scroll' na janela
        window.addEventListener('scroll', activateMenuAtCurrentSection);
    };

    // ======================================================================
    // 4. FUNCIONALIDADE: VALIDAÇÃO DE FORMULÁRIO
    // ======================================================================
    const initFormValidation = () => {
        const form = document.getElementById('contact-form');
        if (!form) return;

        // Evento 'submit' no formulário
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Previne o envio padrão
            let isValid = true;
            const name = document.getElementById('nome');
            const email = document.getElementById('email');
            const message = document.getElementById('mensagem');

            // Validações
            if (name.value.trim() === '') { showError(name, 'O campo nome é obrigatório.'); isValid = false; } else { clearError(name); }
            if (email.value.trim() === '') { showError(email, 'O campo e-mail é obrigatório.'); isValid = false; } else if (!isValidEmail(email.value)) { showError(email, 'Por favor, insira um e-mail válido.'); isValid = false; } else { clearError(email); }
            if (message.value.trim() === '') { showError(message, 'O campo mensagem é obrigatório.'); isValid = false; } else { clearError(message); }
            
            // Se tudo for válido, mostra o modal
            if (isValid) { showModal(); form.reset(); }
        });

        function showError(input, message) {
            const formGroup = input.parentElement;
            const errorElement = formGroup.querySelector('.error-message');
            formGroup.classList.add('error');
            errorElement.textContent = message;
        }
        function clearError(input) {
            const formGroup = input.parentElement;
            formGroup.classList.remove('error');
        }
        function isValidEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }
    };
    
    // ======================================================================
    // 5. FUNCIONALIDADE: MODAL DE CONFIRMAÇÃO
    // ======================================================================
    const modal = document.getElementById('contact-modal');
    const closeModalButton = document.getElementById('close-modal');
    
    function showModal() { if (modal) modal.classList.add('visible'); }
    function closeModal() { if (modal) modal.classList.remove('visible'); }
    
    // Evento 'click' no botão de fechar
    if (closeModalButton) closeModalButton.addEventListener('click', closeModal);
    // Evento 'click' no overlay (fundo) do modal
    if (modal) { modal.addEventListener('click', (event) => { if (event.target === modal) { closeModal(); } }); }

    // ======================================================================
    // 6. FUNCIONALIDADE: DARK/LIGHT MODE
    // ======================================================================
    const themeToggleButton = document.getElementById('theme-toggle');
    
    // Função para alternar o tema
    const toggleTheme = () => {
        let newTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
        document.body.className = newTheme + '-theme';
        // Salva a preferência no localStorage
        localStorage.setItem('theme', newTheme);
    };

    const initThemeSwitcher = () => {
        // Carrega o tema salvo ao iniciar a página
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.body.className = currentTheme + '-theme';

        // Evento 'click' no botão de tema
        if (themeToggleButton) {
            themeToggleButton.addEventListener('click', toggleTheme);
        }
    };

    // ======================================================================
    // 7. FUNCIONALIDADE: "BACK TO TOP" BUTTON
    // ======================================================================
    const initBackToTopButton = () => {
        const backToTopButton = document.getElementById('back-to-top');
        if (backToTopButton) {
            // Evento 'scroll' na janela
            window.addEventListener('scroll', () => {
                if (window.scrollY > 400) { backToTopButton.classList.add('visible'); } else { backToTopButton.classList.remove('visible'); }
            });
            // O evento 'click' já é tratado pelo initSmoothScroll
        }
    };

    // ======================================================================
    // 8. FUNCIONALIDADE: FAQ ACCORDION
    // ======================================================================
    const initFaqAccordion = () => {
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            // Evento 'click' em cada pergunta do FAQ
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const isExpanded = question.getAttribute('aria-expanded') === 'true';
                question.classList.toggle('active');
                question.setAttribute('aria-expanded', !isExpanded);
                // Anima a altura da resposta
                if (answer.style.maxHeight) { answer.style.maxHeight = null; } else { answer.style.maxHeight = answer.scrollHeight + 'px'; }
            });
        });
    };

    // ======================================================================
    // 9. FUNCIONALIDADE: SCROLL REVEAL (Intersection Observer)
    // ======================================================================
    const initScrollReveal = () => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Evento 'intersection': quando o elemento entra na tela
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Para de observar após animar
                }
            });
        }, { threshold: 0.1 }); // Aciona quando 10% do elemento está visível
        
        animatedElements.forEach(element => { observer.observe(element); });
    };
    
    // ======================================================================
    // 10. FUNCIONALIDADE: RENDERIZAÇÃO DE ÍCONES
    // ======================================================================
    const initFeatherIcons = () => { 
        if (typeof feather !== 'undefined') { 
            feather.replace(); // Substitui todos os atributos data-feather por SVGs
        } 
    };

    // ======================================================================
    // 11. NOVOS EVENTOS (TAREFA 9): mouseover / mouseout
    // ======================================================================
    const initServiceCardHighlight = () => {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            // Evento 'mouseover': acionado quando o cursor entra na área do card
            card.addEventListener('mouseover', () => {
                card.classList.add('highlight');
            });

            // Evento 'mouseout': acionado quando o cursor sai da área do card
            card.addEventListener('mouseout', () => {
                card.classList.remove('highlight');
            });
        });
    };

    // ======================================================================
    // 12. NOVOS EVENTOS (TAREFA 9): focus / blur
    // ======================================================================
    const initFormFocusEvents = () => {
        const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

        formInputs.forEach(input => {
            // Evento 'focus': acionado quando o usuário clica ou navega (com Tab) para o campo
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            // Evento 'blur': acionado quando o usuário sai do campo
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });
    };

    // ======================================================================
    // 13. NOVO EVENTO (TAREFA 9): keydown
    // ======================================================================
    const initThemeKeyboardShortcut = () => {
        // O evento 'keydown' é adicionado ao documento inteiro
        document.addEventListener('keydown', (event) => {
            // Verifica se a tecla pressionada foi 't' (ignorando maiúsculas/minúsculas)
            // e se o usuário não está digitando em um campo de formulário
            if (event.key.toLowerCase() === 't' && 
                event.target.tagName !== 'INPUT' && 
                event.target.tagName !== 'TEXTAREA') 
            {
                toggleTheme(); // Chama a mesma função do botão de tema
            }
        });
    };
    
    // ======================================================================
    // 14. NOVO EVENTO (TAREFA 9): copy
    // ======================================================================
    const initCopyEvent = () => {
        document.addEventListener('copy', () => {
            // Mostra um alerta simples. Em um projeto real, poderia ser um toast notification.
            // alert('Conteúdo copiado! A Agência Criativa agradece o compartilhamento.');
            // (Comentado para não ser irritante durante o desenvolvimento)
            console.log("Evento 'copy' detectado!");
        });
    };

    // ======================================================================
    // 15. NOVO EVENTO (TAREFA 9): contextmenu
    // ======================================================================
    const initContextMenuOverride = () => {
        document.addEventListener('contextmenu', (event) => {
            // event.preventDefault(); // Impede que o menu do navegador apareça
            // alert('Menu de contexto personalizado pela Agência Criativa!');
            // (Comentado para não ser irritante durante o desenvolvimento)
            console.log("Evento 'contextmenu' detectado!");
        });
    };


    // ======================================================================
    // INICIALIZAÇÃO DE TODAS AS FUNÇÕES
    // ======================================================================
    initMobileMenu();
    initSmoothScroll();
    initActiveLinkOnScroll();
    initFormValidation();
    initThemeSwitcher();
    initBackToTopButton();
    initFaqAccordion();
    initScrollReveal();
    initFeatherIcons();
    
    // Chamada dos novos eventos da Tarefa 9
    initServiceCardHighlight();
    initFormFocusEvents();
    initThemeKeyboardShortcut();
    initCopyEvent();
    initContextMenuOverride();

}); // Fim do evento DOMContentLoaded
