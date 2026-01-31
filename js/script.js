// script.js - Funcionalidades principais do site VALORANT

// Sistema de animação de introdução
document.addEventListener('DOMContentLoaded', function() {
    const introScreen = document.getElementById('introScreen');
    const mainContent = document.getElementById('mainContent');

    // Animação de introdução
    setTimeout(() => {
        introScreen.style.opacity = '0';
        introScreen.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            introScreen.style.display = 'none';
            mainContent.style.display = 'block';
            
            // Animação de entrada do conteúdo principal
            setTimeout(() => {
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
            }, 50);
        }, 500);
    }, 2000);

    // Smooth scroll para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efeito de parallax no hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Animação dos números nas estatísticas
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 20);
        });
    }

    // Observer para animar elementos quando entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Se for a seção de estatísticas, animar os números
                if (entry.target.classList.contains('showcase-stats')) {
                    animateNumbers();
                }
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.feature-item, .showcase-content, .cta-section');
    animatedElements.forEach(el => observer.observe(el));

    // Efeito de digitação no subtítulo do hero
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        // Usar o texto atual como padrão
        const defaultText = heroSubtitle.textContent;
        let index = 0;
        
        // Limpar o texto inicial
        heroSubtitle.textContent = '';
        
        function typeWriter() {
            if (index < defaultText.length) {
                heroSubtitle.textContent += defaultText.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Iniciar efeito de digitação
        setTimeout(typeWriter, 500);
    }
});

// Menu Mobile Responsivo
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenuContainer = document.getElementById('navMenuContainer');
    const mobileOverlay = document.getElementById('mobileOverlay');
    
    if (!mobileToggle || !navMenuContainer) return;
    
    // Toggle menu function
    function toggleMenu() {
        const isActive = navMenuContainer.classList.contains('active');
        
        // Toggle classes
        mobileToggle.classList.toggle('active');
        navMenuContainer.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        
        // Toggle aria attributes
        mobileToggle.setAttribute('aria-expanded', !isActive);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? '' : 'hidden';
    }
    
    // Event listeners
    mobileToggle.addEventListener('click', toggleMenu);
    
    // Close menu when clicking overlay
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', toggleMenu);
    }
    
    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenuContainer.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Sincronizar seletores de idioma se existirem
    const languageSelect = document.getElementById('languageSelect');
    const languageSelectMobile = document.getElementById('languageSelectMobile');
    
    if (languageSelect && languageSelectMobile) {
        // Atualizar mobile quando desktop mudar
        languageSelect.addEventListener('change', (e) => {
            languageSelectMobile.value = e.target.value;
        });
        
        // Atualizar desktop quando mobile mudar
        languageSelectMobile.addEventListener('change', (e) => {
            languageSelect.value = e.target.value;
            // Disparar evento change no seletor desktop
            if (languageSelect.dispatchEvent) {
                languageSelect.dispatchEvent(new Event('change'));
            }
        });
        
        // Sincronizar valores iniciais
        languageSelectMobile.value = languageSelect.value;
    }
    
    // Fechar menu ao pressionar ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenuContainer.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Ajustar menu em redimensionamento
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && navMenuContainer.classList.contains('active')) {
                toggleMenu();
            }
        }, 250);
    });
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
});