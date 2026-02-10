# 📧 GUÍA DE CONFIGURACIÓN DEL FORMULARIO DE CONTACTO

## Método 1: EmailJS (GRATIS y Recomendado) ⭐

EmailJS te permite enviar emails directamente desde tu portafolio sin necesidad de un servidor backend.

### Paso 1: Crear Cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en "Sign Up" (Es GRATIS - 200 emails/mes)
3. Regístrate con tu email o Google

### Paso 2: Conectar tu Email

1. En el dashboard, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona tu proveedor de email:
   - **Gmail** (Recomendado para uso personal)
   - Outlook
   - Yahoo
   - Otros
4. Sigue las instrucciones para conectar tu cuenta
5. **Copia el Service ID** que aparece (ejemplo: `service_abc123`)

### Paso 3: Crear Template de Email

1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Configura el template así:

**To Email:**
```
{{to_email}}
```

**Subject:**
```
Nuevo contacto: {{subject}}
```

**Content (Body):**
```
Nombre: {{from_name}}
Email: {{from_email}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde tu portafolio web.
```

4. Haz clic en **"Save"**
5. **Copia el Template ID** (ejemplo: `template_xyz789`)

### Paso 4: Obtener Public Key

1. Ve a **"Account"** → **"General"**
2. Busca **"Public Key"**
3. Cópiala (ejemplo: `abc123XYZ456`)

### Paso 5: Configurar en tu Portafolio

Abre el archivo `js/config.js` y reemplaza las credenciales:

```javascript
const EMAIL_CONFIG = {
    publicKey: 'TU_PUBLIC_KEY_AQUI',        // ← Pega tu Public Key
    serviceId: 'TU_SERVICE_ID_AQUI',        // ← Pega tu Service ID
    templateId: 'TU_TEMPLATE_ID_AQUI',      // ← Pega tu Template ID
    
    contactInfo: {
        email: 'kenvm1003@gmail.com',       // ← Tu email
        phone: '+51970522622',              // ← Tu teléfono
        whatsapp: '51970522622'             // ← Tu WhatsApp (sin +)
    }
};
```

### Ejemplo Completo:

```javascript
const EMAIL_CONFIG = {
    publicKey: 'abc123XYZ456',
    serviceId: 'service_abc123',
    templateId: 'template_xyz789',
    
    contactInfo: {
        email: 'kenvm1003@gmail.com',
        phone: '+51970522622',
        whatsapp: '51970522622'
    }
};
```

¡Listo! El formulario ahora enviará emails a tu correo automáticamente.

---

## Método 2: Formspree (Alternativa Simple)

Si prefieres algo más simple (pero con menos control):

1. Ve a [https://formspree.io/](https://formspree.io/)
2. Regístrate gratis
3. Crea un nuevo form
4. Copia el endpoint URL
5. En `index.html`, busca el `<form>` y modifica:

```html
<form action="https://formspree.io/f/TU_FORM_ID" method="POST">
```

---

## Método 3: Google Apps Script (100% Gratis, Sin Límites)

### Paso 1: Crear Google Apps Script

1. Ve a [https://script.google.com/](https://script.google.com/)
2. Clic en **"Nuevo proyecto"**
3. Pega este código:

```javascript
function doPost(e) {
  const params = JSON.parse(e.postData.contents);
  
  const subject = `Contacto desde portafolio: ${params.subject}`;
  const body = `
    Nombre: ${params.name}
    Email: ${params.email}
    Asunto: ${params.subject}
    
    Mensaje:
    ${params.message}
  `;
  
  MailApp.sendEmail({
    to: 'kenvm1003@gmail.com', // Tu email aquí
    subject: subject,
    body: body,
    replyTo: params.email
  });
  
  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Guarda el proyecto
5. Clic en **"Implementar"** → **"Nueva implementación"**
6. Tipo: **"Aplicación web"**
7. Acceso: **"Cualquier persona"**
8. Copia la URL de la web app

### Paso 2: Modificar JavaScript

En `js/script-enhanced.js`, busca la función del formulario y reemplaza la llamada a EmailJS con:

```javascript
const response = await fetch('TU_URL_DE_GOOGLE_APPS_SCRIPT', {
    method: 'POST',
    mode: 'no-cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name, email, subject, message})
});
```

---

## Método 4: Backend Propio (Node.js + Nodemailer)

Si tienes un servidor propio o quieres crear uno:

### Crear servidor simple con Express:

```javascript
// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: 'tu-email@gmail.com',
        pass: 'tu-app-password'
    }
});

app.post('/send-email', async (req, res) => {
    const {name, email, subject, message} = req.body;
    
    try {
        await transporter.sendMail({
            from: email,
            to: 'kenvm1003@gmail.com',
            subject: `Contacto: ${subject}`,
            text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`
        });
        
        res.json({success: true});
    } catch (error) {
        res.status(500).json({error: 'Error al enviar'});
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

## 📱 CONFIGURACIÓN DE WHATSAPP

El chat de WhatsApp ya está configurado! Solo verifica que el número sea correcto en `js/config.js`:

```javascript
whatsapp: '51970522622'  // Tu número sin el símbolo +
```

### Personalizar Mensajes de WhatsApp

En `js/config.js`, puedes modificar los mensajes predefinidos editando las traducciones:

```javascript
chat_option1: 'Quiero información sobre tus servicios',
chat_option2: 'Me gustaría trabajar contigo',
chat_option3: 'Tengo una consulta técnica',
chat_option4: 'Solicitar presupuesto',
```

---

## ✅ VERIFICAR QUE FUNCIONE

1. Abre tu portafolio
2. Ve a la sección de contacto
3. Llena el formulario con datos de prueba
4. Haz clic en "Enviar Mensaje"
5. Deberías recibir el email en tu bandeja de entrada

Si usas EmailJS, también puedes ver los envíos en el dashboard de EmailJS.

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### "EmailJS no está configurado"
- Verifica que hayas pegado correctamente las credenciales en `config.js`
- Asegúrate de que no haya espacios extras
- Verifica que las credenciales no contengan comillas extras

### Los emails no llegan
- Revisa tu carpeta de spam
- Verifica que el Service ID y Template ID sean correctos
- Revisa la consola del navegador (F12) para ver errores

### CORS Error con Google Apps Script
- Usa `mode: 'no-cors'` en el fetch
- O implementa el proxy CORS en el Apps Script

---

## 💡 RECOMENDACIÓN FINAL

**Para uso personal/portafolio**: Usa **EmailJS** (es gratis y muy fácil)  
**Para producción/empresa**: Usa backend propio con Node.js

El método de EmailJS ya está 100% implementado en tu portafolio, solo necesitas las credenciales!

---

¿Necesitas ayuda? Contacta a kenvm1003@gmail.com
