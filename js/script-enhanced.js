// ========================================
// IMPORTAR CONFIGURACIÓN
// ========================================
// Asegúrate de incluir config.js antes de este archivo en el HTML

// ========================================
// Variables Globales
// ========================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const preloader = document.querySelector('.preloader');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.querySelector('.scroll-top');
const navbar = document.querySelector('.navbar');

// Variables de tema e idioma
let currentLang = localStorage.getItem('language') || 'es';
let currentTheme = localStorage.getItem('theme') || 'light';

// ========================================
// Inicialización
// ========================================
window.addEventListener('load', () => {
    // Inicializar EmailJS
    if (typeof emailjs !== 'undefined' && EMAIL_CONFIG.publicKey !== 'TU_PUBLIC_KEY_AQUI') {
        emailjs.init(EMAIL_CONFIG.publicKey);
    }
    
    // Aplicar tema guardado
    applyTheme(currentTheme);
    
    // Aplicar idioma guardado
    changeLanguage(currentLang);
    
    setTimeout(() => {
        preloader.classList.add('hidden');
        initAnimations();
    }, 1500);
});

// ========================================
// MODO OSCURO / CLARO
// ========================================
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    const icon = themeToggle.querySelector('i');
    
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
    
    localStorage.setItem('theme', theme);
    currentTheme = theme;
}

themeToggle.addEventListener('click', () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
});

// ========================================
// MULTI-IDIOMA (ES/EN)
// ========================================
const langButtons = document.querySelectorAll('.lang-btn');

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Actualizar botones activos
    langButtons.forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Actualizar HTML lang attribute
    document.documentElement.lang = lang;
    
    // Traducir todos los elementos con data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        changeLanguage(lang);
    });
});

// ========================================
// WHATSAPP CHAT WIDGET
// ========================================
const chatButton = document.getElementById('chatButton');
const chatPopup = document.getElementById('chatPopup');
const chatClose = document.getElementById('chatClose');
const chatOptions = document.querySelectorAll('.chat-option');

let chatOpen = false;

chatButton.addEventListener('click', () => {
    chatOpen = !chatOpen;
    chatPopup.style.display = chatOpen ? 'flex' : 'none';
    
    if (chatOpen) {
        // Ocultar badge al abrir
        const badge = chatButton.querySelector('.chat-badge');
        if (badge) badge.style.display = 'none';
    }
});

chatClose.addEventListener('click', () => {
    chatOpen = false;
    chatPopup.style.display = 'none';
});

chatOptions.forEach(option => {
    option.addEventListener('click', () => {
        const message = option.dataset.message;
        const phone = EMAIL_CONFIG.contactInfo.whatsapp;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    });
});

// Mostrar badge después de 5 segundos si no ha abierto el chat
setTimeout(() => {
    if (!chatOpen) {
        const badge = chatButton.querySelector('.chat-badge');
        if (badge) {
            badge.style.display = 'flex';
            badge.classList.add('pulse');
        }
    }
}, 5000);

// ========================================
// FORMULARIO DE CONTACTO CON EMAILJS
// ========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.btn-submit');
    const formData = new FormData(contactForm);
    
    // Obtener datos del formulario
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const subject = formData.get('subject').trim();
    const message = formData.get('message').trim();
    
    // Validación
    if (!validateForm(name, email, subject, message)) {
        return;
    }
    
    // Mostrar estado de carga
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        // Verificar si EmailJS está configurado
        if (typeof emailjs === 'undefined' || EMAIL_CONFIG.publicKey === 'TU_PUBLIC_KEY_AQUI') {
            throw new Error('EmailJS no está configurado');
        }
        
        // Enviar email usando EmailJS
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: EMAIL_CONFIG.contactInfo.email,
            reply_to: email
        };
        
        await emailjs.send(
            EMAIL_CONFIG.serviceId,
            EMAIL_CONFIG.templateId,
            templateParams
        );
        
        // Éxito
        showNotification(translations[currentLang].notification_success, 'success');
        contactForm.reset();
        
        // También enviar notificación por WhatsApp (opcional)
        const whatsappMessage = `*Nuevo contacto desde el portafolio*%0A%0A*Nombre:* ${name}%0A*Email:* ${email}%0A*Asunto:* ${subject}%0A*Mensaje:* ${message}`;
        const whatsappUrl = `https://wa.me/${EMAIL_CONFIG.contactInfo.whatsapp}?text=${whatsappMessage}`;
        
        // Abrir WhatsApp en una nueva pestaña después de 2 segundos
        setTimeout(() => {
            const openWhatsApp = confirm('¿Deseas también enviar este mensaje por WhatsApp?');
            if (openWhatsApp) {
                window.open(whatsappUrl, '_blank');
            }
        }, 2000);
        
    } catch (error) {
        console.error('Error al enviar:', error);
        
        // Si EmailJS falla, abrir cliente de email como fallback
        const mailtoLink = `mailto:${EMAIL_CONFIG.contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`)}`;
        window.location.href = mailtoLink;
        
        showNotification(translations[currentLang].notification_error, 'warning');
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

// Validación del formulario
function validateForm(name, email, subject, message) {
    const errors = [];
    
    if (name.length < 3) {
        errors.push(translations[currentLang].validation_name);
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push(translations[currentLang].validation_email);
    }
    
    if (subject.length < 3) {
        errors.push(translations[currentLang].validation_subject);
    }
    
    if (message.length < 10) {
        errors.push(translations[currentLang].validation_message);
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

// ========================================
// NOTIFICACIONES
// ========================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icons[type] || 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    const colors = {
        success: '#48bb78',
        error: '#f56565',
        warning: '#ed8936',
        info: '#667eea'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ========================================
// Cursor Personalizado
// ========================================
document.addEventListener('mousemove', (e) => {
    if (cursor && cursorFollower) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    }
});

// Efectos hover
document.querySelectorAll('a, button, .service-card, .education-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursor && cursorFollower) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(3)';
        }
    });
    
    el.addEventListener('mouseleave', () => {
        if (cursor && cursorFollower) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
        }
    });
});

// ========================================
// Navegación
// ========================================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navegación activa en scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
    
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        scrollTopBtn.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// Particles.js
// ========================================
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#667eea' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#667eea',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 1 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

// ========================================
// Animación de Contadores
// ========================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
}

// ========================================
// Animación de Barras de Habilidades
// ========================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.querySelector('.skills');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%';
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// ========================================
// GSAP Animations
// ========================================
function initAnimations() {
    if (typeof gsap === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Contadores
    const statNumbers = document.querySelectorAll('.stat-number');
    const heroStats = document.querySelector('.hero-stats');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(animateCounter);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    // Secciones
    gsap.utils.toArray('section').forEach((section) => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Tarjetas de servicio
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Timeline
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            duration: 0.8,
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Iconos tech
    gsap.utils.toArray('.tech-icon-item').forEach((icon, index) => {
        gsap.from(icon, {
            opacity: 0,
            scale: 0,
            duration: 0.5,
            delay: index * 0.05,
            scrollTrigger: {
                trigger: '.tech-icons-grid',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    animateSkillBars();
}

// ========================================
// Parallax Effect
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-visual');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========================================
// Tilt Effect en Tarjetas
// ========================================
const cards = document.querySelectorAll('.service-card, .education-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ========================================
// Detectar dispositivo móvil
// ========================================
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    if (cursor) cursor.style.display = 'none';
    if (cursorFollower) cursorFollower.style.display = 'none';
}

// ========================================
// Console Message
// ========================================
console.log('%c¡Hola Developer! 👋', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%c¿Interesado en colaborar? Contacta conmigo en kenvm1003@gmail.com', 'color: #764ba2; font-size: 14px;');

console.log('✨ Portfolio loaded successfully!');
