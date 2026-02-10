// ========================================
// CONFIGURACIÓN DE EMAILJS
// ========================================
// Para que el formulario funcione, necesitas configurar EmailJS:
// 1. Ve a https://www.emailjs.com/ y crea una cuenta GRATIS
// 2. Crea un servicio de email (Gmail, Outlook, etc.)
// 3. Crea una plantilla de email
// 4. Copia tus credenciales aquí:

const EMAIL_CONFIG = {
    publicKey: '2gu2pDiK2m0m5AtEU',
    serviceId: 'service_jdg8hty',
    templateId: 'template_4lbefio',

    // Tu información de contacto
    contactInfo: {
        email: 'kenvm1003@gmail.com',
        phone: '+51970522622',
        whatsapp: '51970522622' // Sin el símbolo +
    }
};

// ========================================
// TRADUCCIONES (ESPAÑOL E INGLÉS)
// ========================================
const translations = {
    es: {
        // Navegación
        nav_inicio: 'Inicio',
        nav_sobre: 'Sobre Mí',
        nav_experiencia: 'Experiencia',
        nav_servicios: 'Servicios',
        nav_habilidades: 'Habilidades',
        nav_contacto: 'Contacto',

        // Hero Section
        hero_greeting: 'Hola, soy',
        hero_role: 'Desarrolladora Full Stack',
        hero_subtitle: 'Especialista en Flutter, Python & Integración ERP',
        hero_description: 'Transformo ideas en soluciones digitales escalables. Desarrollo aplicaciones web y móviles con tecnologías modernas.',
        hero_btn_primary: 'Trabajemos Juntos',
        hero_btn_secondary: 'Ver Servicios',
        hero_stat1_label: 'Años de Experiencia',
        hero_stat2_label: 'Proyectos Completados',
        hero_stat3_label: 'Tecnologías',
        scroll_text: 'Scroll para explorar',

        // Sobre Mí
        about_tag: 'Conóceme',
        about_title: 'Sobre Mí',
        about_subtitle: 'Desarrolladora apasionada por crear soluciones digitales',
        about_p1: 'Soy desarrolladora de software con sólida experiencia en la creación de aplicaciones web y móviles, especializada en la integración con sistemas ERP como SAP Business One y en la automatización de procesos empresariales.',
        about_p2: 'Mi enfoque se centra en desarrollar soluciones escalables y orientadas a resultados, utilizando tecnologías modernas como Flutter para aplicaciones móviles, Python para backend, y bases de datos SQL para gestión eficiente de datos.',
        about_p3: 'Actualmente trabajo en Platinum Corp desarrollando addons para SAP Business One y cursando Ingeniería de Software en la UTP, complementando mi formación técnica en Diseño y Desarrollo de Software.',
        about_highlight1: 'Integración ERP & APIs',
        about_highlight2: 'Desarrollo Mobile & Web',
        about_highlight3: 'Automatización de Procesos',
        about_highlight4: 'Metodologías Ágiles',
        about_btn: 'Contactar',

        // Experiencia
        exp_tag: 'Mi Trayectoria',
        exp_title: 'Experiencia Profesional',
        exp_edu_title: 'Formación Académica',

        // Servicios
        services_tag: 'Lo Que Ofrezco',
        services_title: 'Servicios',
        service1_title: 'Desarrollo de Apps Móviles',
        service1_desc: 'Aplicaciones nativas y multiplataforma con Flutter. Interfaces intuitivas y rendimiento óptimo.',
        service2_title: 'Desarrollo Web Full Stack',
        service2_desc: 'Aplicaciones web modernas y escalables. Frontend reactivo y backend robusto.',
        service3_title: 'Integración ERP & APIs',
        service3_desc: 'Conecta tus sistemas empresariales. Automatización y sincronización en tiempo real.',
        service4_title: 'Bases de Datos & Backend',
        service4_desc: 'Diseño e implementación de bases de datos eficientes y escalables.',
        service5_title: 'Automatización de Procesos',
        service5_desc: 'Optimiza tus operaciones con scripts y herramientas de automatización.',
        service6_title: 'Consultoría & Soporte',
        service6_desc: 'Asesoramiento técnico y mantenimiento de sistemas existentes.',

        // Habilidades
        skills_tag: 'Mis Capacidades',
        skills_title: 'Habilidades Técnicas',
        skills_cat1: 'Lenguajes de Programación',
        skills_cat2: 'Desarrollo Mobile & Web',
        skills_cat3: 'Bases de Datos & ERP',
        skills_cat4: 'Herramientas & Metodologías',
        skills_cloud_title: 'Tecnologías',

        // Contacto
        contact_tag: 'Hablemos',
        contact_title: 'Contacto',
        contact_heading: 'Transformemos tu idea en realidad',
        contact_description: '¿Tienes un proyecto en mente? Estoy aquí para ayudarte a desarrollar soluciones digitales que impulsen tu negocio.',
        contact_email_label: 'Email',
        contact_phone_label: 'Teléfono',
        contact_location_label: 'Ubicación',
        contact_location_value: 'Lima, Perú',
        contact_linkedin_label: 'LinkedIn',
        contact_linkedin_link: 'Visitar perfil',
        form_name_label: 'Nombre completo',
        form_email_label: 'Email',
        form_subject_label: 'Asunto',
        form_message_label: 'Mensaje',
        form_submit_btn: 'Enviar Mensaje',
        form_sending: 'Enviando...',

        // Footer
        footer_tagline: 'Desarrolladora Full Stack especializada en soluciones innovadoras',
        footer_links_title: 'Enlaces Rápidos',
        footer_contact_title: 'Contacto',
        footer_rights: 'Todos los derechos reservados',
        footer_made: 'Hecho con',

        // WhatsApp Chat
        chat_name: 'Kenia Ventura',
        chat_status: 'En línea',
        chat_greeting1: '¡Hola! 👋',
        chat_greeting2: 'Soy Kenia Ventura, desarrolladora Full Stack. ¿En qué puedo ayudarte?',
        chat_option1: 'Quiero información sobre tus servicios',
        chat_option2: 'Me gustaría trabajar contigo',
        chat_option3: 'Tengo una consulta técnica',
        chat_option4: 'Solicitar presupuesto',
        chat_whatsapp_btn: 'Abrir en WhatsApp',

        // Notificaciones
        notification_success: '¡Mensaje enviado con éxito! Te contactaré pronto.',
        notification_error: 'Error al enviar el mensaje. Por favor intenta nuevamente.',
        validation_name: 'El nombre debe tener al menos 3 caracteres',
        validation_email: 'Por favor ingresa un email válido',
        validation_subject: 'El asunto debe tener al menos 3 caracteres',
        validation_message: 'El mensaje debe tener al menos 10 caracteres'
    },

    en: {
        // Navigation
        nav_inicio: 'Home',
        nav_sobre: 'About Me',
        nav_experiencia: 'Experience',
        nav_servicios: 'Services',
        nav_habilidades: 'Skills',
        nav_contacto: 'Contact',

        // Hero Section
        hero_greeting: 'Hi, I am',
        hero_role: 'Full Stack Developer',
        hero_subtitle: 'Specialist in Flutter, Python & ERP Integration',
        hero_description: 'I transform ideas into scalable digital solutions. I develop web and mobile applications with modern technologies.',
        hero_btn_primary: 'Let\'s Work Together',
        hero_btn_secondary: 'View Services',
        hero_stat1_label: 'Years of Experience',
        hero_stat2_label: 'Completed Projects',
        hero_stat3_label: 'Technologies',
        scroll_text: 'Scroll to explore',

        // About Me
        about_tag: 'Get to Know Me',
        about_title: 'About Me',
        about_subtitle: 'Developer passionate about creating digital solutions',
        about_p1: 'I am a software developer with solid experience in creating web and mobile applications, specialized in integration with ERP systems like SAP Business One and business process automation.',
        about_p2: 'My focus is on developing scalable and results-oriented solutions, using modern technologies like Flutter for mobile applications, Python for backend, and SQL databases for efficient data management.',
        about_p3: 'I currently work at Platinum Corp developing addons for SAP Business One and studying Software Engineering at UTP, complementing my technical training in Software Design and Development.',
        about_highlight1: 'ERP & API Integration',
        about_highlight2: 'Mobile & Web Development',
        about_highlight3: 'Process Automation',
        about_highlight4: 'Agile Methodologies',
        about_btn: 'Contact',

        // Experience
        exp_tag: 'My Journey',
        exp_title: 'Professional Experience',
        exp_edu_title: 'Academic Background',

        // Services
        services_tag: 'What I Offer',
        services_title: 'Services',
        service1_title: 'Mobile App Development',
        service1_desc: 'Native and cross-platform applications with Flutter. Intuitive interfaces and optimal performance.',
        service2_title: 'Full Stack Web Development',
        service2_desc: 'Modern and scalable web applications. Responsive frontend and robust backend.',
        service3_title: 'ERP & API Integration',
        service3_desc: 'Connect your business systems. Real-time automation and synchronization.',
        service4_title: 'Databases & Backend',
        service4_desc: 'Design and implementation of efficient and scalable databases.',
        service5_title: 'Process Automation',
        service5_desc: 'Optimize your operations with scripts and automation tools.',
        service6_title: 'Consulting & Support',
        service6_desc: 'Technical consulting and maintenance of existing systems.',

        // Skills
        skills_tag: 'My Capabilities',
        skills_title: 'Technical Skills',
        skills_cat1: 'Programming Languages',
        skills_cat2: 'Mobile & Web Development',
        skills_cat3: 'Databases & ERP',
        skills_cat4: 'Tools & Methodologies',
        skills_cloud_title: 'Technologies',

        // Contact
        contact_tag: 'Let\'s Talk',
        contact_title: 'Contact',
        contact_heading: 'Let\'s turn your idea into reality',
        contact_description: 'Do you have a project in mind? I\'m here to help you develop digital solutions that boost your business.',
        contact_email_label: 'Email',
        contact_phone_label: 'Phone',
        contact_location_label: 'Location',
        contact_location_value: 'Lima, Peru',
        contact_linkedin_label: 'LinkedIn',
        contact_linkedin_link: 'Visit profile',
        form_name_label: 'Full name',
        form_email_label: 'Email',
        form_subject_label: 'Subject',
        form_message_label: 'Message',
        form_submit_btn: 'Send Message',
        form_sending: 'Sending...',

        // Footer
        footer_tagline: 'Full Stack Developer specialized in innovative solutions',
        footer_links_title: 'Quick Links',
        footer_contact_title: 'Contact',
        footer_rights: 'All rights reserved',
        footer_made: 'Made with',

        // WhatsApp Chat
        chat_name: 'Kenia Ventura',
        chat_status: 'Online',
        chat_greeting1: 'Hello! 👋',
        chat_greeting2: 'I\'m Kenia Ventura, Full Stack developer. How can I help you?',
        chat_option1: 'I want information about your services',
        chat_option2: 'I would like to work with you',
        chat_option3: 'I have a technical question',
        chat_option4: 'Request a quote',
        chat_whatsapp_btn: 'Open in WhatsApp',

        // Notifications
        notification_success: 'Message sent successfully! I will contact you soon.',
        notification_error: 'Error sending message. Please try again.',
        validation_name: 'Name must be at least 3 characters',
        validation_email: 'Please enter a valid email',
        validation_subject: 'Subject must be at least 3 characters',
        validation_message: 'Message must be at least 10 characters'
    }
};

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EMAIL_CONFIG, translations };
}
