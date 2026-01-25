        let scrollEnabled = false;

        document.body.style.overflow = 'hidden';

        window.addEventListener('wheel', function(e) {
            if (!scrollEnabled && e.deltaY > 0) {
                scrollEnabled = true;
                document.getElementById('introScreen').classList.add('fade-out');
                document.getElementById('mainContent').classList.add('visible');
                
                setTimeout(() => {
                    document.body.style.overflow = 'auto';
                }, 1000);
            }
        }, { passive: true });

        // Também permite ativar com toque (mobile)
        window.addEventListener('touchstart', function() {
            if (!scrollEnabled) {
                scrollEnabled = true;
                document.getElementById('introScreen').classList.add('fade-out');
                document.getElementById('mainContent').classList.add('visible');
                
                setTimeout(() => {
                    document.body.style.overflow = 'auto';
                }, 1000);
            }
        }, { passive: true });

        // Menu mobile
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');

        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Fecha menu ao clicar em link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Scroll suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animação ao scroll (fade-in elements)
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.feature-item, .showcase-container, .stat-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
