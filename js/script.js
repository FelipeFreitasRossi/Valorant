function initIntroAnimation() {
    const introScreen = document.getElementById('introScreen');
    const mainContent = document.getElementById('mainContent');
    
    if (!introScreen || !mainContent) return;
    
    setTimeout(() => {
        introScreen.classList.add('fade-out');
        
        setTimeout(() => {
            introScreen.style.display = 'none';
            mainContent.classList.add('visible');
        }, 1000);
    }, 1500);
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                let offset = 0;
                const header = document.querySelector('.site-header');
                if (header) {
                    offset = header.offsetHeight;
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        hero.style.transform = `translateY(${rate}px)`;
    });
}

function initNumberAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;
    
    function animateNumbers() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 30);
        });
    }
    
    return animateNumbers;
}

function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                if (entry.target.classList.contains('showcase-stats')) {
                    const animateNumbers = initNumberAnimation();
                    if (animateNumbers) animateNumbers();
                }
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.feature-item, .showcase-content, .cta-section');
    animatedElements.forEach(el => observer.observe(el));
    
    return observer;
}

function initTypewriterEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroSubtitle) return;
    
    const text = heroSubtitle.textContent;
    let index = 0;
    
    heroSubtitle.textContent = '';
    
    function typeWriter() {
        if (index < text.length) {
            heroSubtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }
    
    setTimeout(typeWriter, 2000);
}

function initHoverEffects() {
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(255, 70, 85, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: #ff4655;
        z-index: 9998;
        transition: width 0.1s;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

function initMainScripts() {
    initIntroAnimation();
    initSmoothScroll();
    initParallax();
    initIntersectionObserver();
    initTypewriterEffect();
    initHoverEffects();
    initLazyLoad();
    initScrollProgress();
    
    window.addEventListener('scroll', () => {
    });
}

function handleErrors() {
    window.addEventListener('error', (e) => {
        console.error('Script error:', e.message, 'at', e.filename, 'line', e.lineno);
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    handleErrors();
    
    try {
        initMainScripts();
        console.log('Main scripts initialized successfully');
    } catch (error) {
        console.error('Error initializing main scripts:', error);
    }
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
    }, 250);
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initIntroAnimation,
        initSmoothScroll,
        initParallax,
        initIntersectionObserver,
        initTypewriterEffect,
        initHoverEffects,
        initLazyLoad,
        initScrollProgress,
        initMainScripts
    };
}