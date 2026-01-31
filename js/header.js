// Header Mobile Menu Functionality
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenuContainer = document.getElementById('navMenuContainer');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const languageSelect = document.getElementById('languageSelect');
    const languageSelectMobile = document.getElementById('languageSelectMobile');
    
    if (!mobileToggle || !navMenuContainer) return;
    
    function toggleMenu() {
        const isActive = navMenuContainer.classList.contains('active');

        mobileToggle.classList.toggle('active');
        navMenuContainer.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        
        mobileToggle.setAttribute('aria-expanded', !isActive);
        
        document.body.style.overflow = isActive ? '' : 'hidden';
    }
    
    
    mobileToggle.addEventListener('click', toggleMenu);
    
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', toggleMenu);
    }
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenuContainer.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    
    if (languageSelect && languageSelectMobile) {
        languageSelect.addEventListener('change', (e) => {
            languageSelectMobile.value = e.target.value;
        });
        
        languageSelectMobile.addEventListener('change', (e) => {
            languageSelect.value = e.target.value;
            const event = new Event('change');
            languageSelect.dispatchEvent(event);
        });
        
        languageSelectMobile.value = languageSelect.value;
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenuContainer.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 968 && navMenuContainer.classList.contains('active')) {
                toggleMenu();
            }
        }, 250);
    });
}

function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initHeaderScroll();
});