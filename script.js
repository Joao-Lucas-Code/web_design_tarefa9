/**
 * Tarefa 9 - Web Design
 * Arquivo: script.js
 * Descrição: Contém todas as funcionalidades e eventos JavaScript para o site da Agência Criativa.
 * * --- NOVOS EVENTOS IMPLEMENTADOS (Tarefa 9) ---
 * 1. Mouseover e Mouseout: Efeito de destaque nos cards de serviço ao passar o mouse.
 * 2. Focus e Blur: Adiciona destaque visual aos campos do formulário quando selecionados.
 * 3. Keydown: Atalho de teclado (tecla 'T') para alternar entre os temas claro e escuro.
 * 4. Copy: Exibe uma mensagem amigável quando o usuário copia um texto do site.
 * 5. Contextmenu (Clique Direito): Previne o menu de contexto padrão e exibe um alerta.
 *
 * --- Funcionalidades Anteriores Mantidas ---
 * - Menu Mobile (Hamburger)
 * - Smooth Scroll (Rolagem Suave)
 * - Active Link Highlighting
 * - Validação de Formulário
 * - Modal de Confirmação
 * - Dark/Light Mode Switcher
 * - "Back to Top" Button
 * - FAQ Accordion
 * - Scroll Reveal Animation
 * - Substituir Ícones (Feather Icons)
 */

// Este evento garante que o script só será executado após o carregamento completo do DOM.
document.addEventListener('DOMContentLoaded', () => {

    // ======================================================================
    // INICIALIZAÇÃO DAS FUNCIONALIDADES EXISTENTES
    // ======================================================================
    
    const initMobileMenu = () => {
        const menuButton = document.querySelector('[data-menu="button"]');
        const navMenu = document.querySelector('[data-menu="nav"]');

        if (menuButton && navMenu) {
            menuButton.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                const isActive = navMenu.classList.contains('active');
                menuButton.setAttribute('aria-expanded', isActive);
                menuButton.setAttribute('aria-label', isActive ? 'Fechar Menu' : 'Abrir Menu');
            });
        }
    };

    const initSmoothScroll = () => {
        const internalLinks = document.querySelectorAll('a[href^="#"]');

        function scrollToSection(event) {
            event.preventDefault();
            const href = event.currentTarget.getAttribute('href');
            const section = document.querySelector(href);

            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Fecha o menu mobile após clicar em um link
            const navMenu = document.querySelector('[data-menu="nav"]');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }

        internalLinks.forEach(link => {
            link.addEventListener('click', scrollToSection);
        });
    };

    const initActiveLinkOnScroll = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        function activateMenuAtCurrentSection() {
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
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        }
        window.addEventListener('scroll', activateMenuAtCurrentSection);
    };

    const initFormValidation = () => {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            let isValid = true;
            const name = document.getElementById('nome');
            const email = document.getElementById('email');
            const message = document.getElementById('mensagem');

            if (name.value.trim() === '') { showError(name, 'O campo nome é obrigatório.'); isValid = false; } else { clearError(name); }
            if (email.value.trim() === '') { showError(email, 'O campo e-mail é obrigatório.'); isValid = false; } else if (!isValidEmail(email.value)) { showError(email, 'Por favor, insira um e-mail válido.'); isValid = false; } else { clearError(email); }
            if (message.value.trim() === '') { showError(message, 'O campo mensagem é obrigatório.'); isValid = false; } else { clearError(message); }
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
    
    const modal = document.getElementById('contact-modal');
    const closeModalButton = document.getElementById('close-modal');
    function showModal() { if (modal) modal.classList.add('visible'); }
    function closeModal() { if (modal) modal.classList.remove('visible'); }
    if (closeModalButton) closeModalButton.addEventListener('click', closeModal);
    if (modal) { modal.addEventListener('click', (event) => { if (event.target === modal) { closeModal(); } }); }

    const initThemeSwitcher = () => {
        const themeToggleButton = document.getElementById('theme-toggle');
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.body.className = currentTheme + '-theme';

        if (themeToggleButton) {
            themeToggleButton.addEventListener('click', toggleTheme);
        }
    };
    
    // Função para alternar o tema, agora separada para ser usada pelo atalho de teclado também
    const toggleTheme = () => {
        let newTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
        document.body.className = newTheme + '-theme';
        localStorage.setItem('theme', newTheme);
    };

    const initBackToTopButton = () => {
        const backToTopButton = document.getElementById('back-to-top');
        if (backToTopButton) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 400) { backToTopButton.classList.add('visible'); } else { backToTopButton.classList.remove('visible'); }
            });
        }
    };

    const initFaqAccordion = () => {
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const isExpanded = question.getAttribute('aria-expanded') === 'true';
                question.classList.toggle('active');
                question.setAttribute('aria-expanded', !isExpanded);
                if (answer.style.maxHeight) { answer.style.maxHeight = null; } else { answer.style.maxHeight = answer.scrollHeight + 'px'; }
            });
        });
    };

    const initScrollReveal = () => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(element => { observer.observe(element); });
    };
    
    const initFeatherIcons = () => { if (typeof feather !== 'undefined') { feather.replace(); } };

    // ======================================================================
    // 5 NOVOS EVENTOS - TAREFA 9
    // ======================================================================

    /**
     * Evento 1 e 2: mouseover e mouseout
     * Descrição: Adiciona um efeito de "brilho" (highlight) nos cards de serviço
     * quando o mouse passa por cima e o remove quando o mouse sai.
     */
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

    /**
     * Evento 3 e 4: focus e blur
     * Descrição: Melhora a acessibilidade e o feedback visual do formulário.
     * Quando um campo de input recebe foco, sua borda e a label mudam de cor.
     * Quando perde o foco (blur), volta ao normal.
     */
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

    /**
     * Evento 5: keydown
     * Descrição: Cria um atalho de teclado. Pressionar a tecla 'T' (de "Tema")
     * em qualquer lugar da página irá alternar entre o modo claro e escuro.
     */
    const initThemeKeyboardShortcut = () => {
        // O evento 'keydown' é adicionado ao documento inteiro
        document.addEventListener('keydown', (event) => {
            // Verifica se a tecla pressionada foi 't' (ignorando maiúsculas/minúsculas)
            // e se o usuário não está digitando em um campo de formulário
            if (event.key.toLowerCase() === 't' && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
                toggleTheme(); // Chama a mesma função do botão de tema
            }
        });
    };
    
    /**
     * Evento Bônus 1: copy
     * Descrição: Detecta quando o usuário copia um texto da página e exibe
     * um alerta amigável, uma microinteração comum.
     */
    const initCopyEvent = () => {
        document.addEventListener('copy', () => {
            // Mostra um alerta simples. Em um projeto real, poderia ser um toast notification.
            alert('Conteúdo copiado! A Agência Criativa agradece o compartilhamento.');
        });
    };

    /**
     * Evento Bônus 2: contextmenu
     * Descrição: Previne o menu de contexto padrão (clique direito) de aparecer
     * e exibe um alerta personalizado.
     */
    const initContextMenuOverride = () => {
        document.addEventListener('contextmenu', (event) => {
            event.preventDefault(); // Impede que o menu do navegador apareça
            alert('Menu de contexto desabilitado para esta demonstração.');
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

});