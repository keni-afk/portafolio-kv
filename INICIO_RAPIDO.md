# 🚀 GUÍA DE INICIO RÁPIDO - 5 MINUTOS

## ¿Qué hay de nuevo?

✅ **Modo Oscuro/Claro** → Click en 🌙/☀️  
✅ **Español/Inglés** → Click en 🇪🇸/🇺🇸  
✅ **Chat WhatsApp** → Botón verde flotante  
✅ **Formulario funcional** → Envío a tu email

---

## PASO 1: Configurar EmailJS (3 minutos) ⚙️

### 1.1 Crear cuenta
- Ve a [https://emailjs.com/](https://emailjs.com/)
- Click "Sign Up" (es GRATIS)
- Regístrate con tu email

### 1.2 Conectar tu email
- Dashboard → "Email Services" → "Add New Service"
- Selecciona "Gmail" (recomendado)
- Click "Connect Account" y autoriza
- **COPIA el Service ID** (ej: `service_abc123`)

### 1.3 Crear template
- Dashboard → "Email Templates" → "Create New Template"
- Nombre: "Portfolio Contact"
- En el editor:
  - **To email**: `{{to_email}}`
  - **Subject**: `Nuevo contacto: {{subject}}`
  - **Content**:
    ```
    Nombre: {{from_name}}
    Email: {{from_email}}
    Asunto: {{subject}}
    
    Mensaje:
    {{message}}
    ```
- Click "Save"
- **COPIA el Template ID** (ej: `template_xyz789`)

### 1.4 Obtener Public Key
- Dashboard → "Account" → "General"
- Busca "Public Key"
- **COPIA la Public Key** (ej: `abc123XYZ`)

### 1.5 Pegar en tu código
Abre `js/config.js` y pega tus credenciales:

```javascript
const EMAIL_CONFIG = {
    publicKey: 'abc123XYZ',           // ← PEGA AQUÍ
    serviceId: 'service_abc123',      // ← PEGA AQUÍ
    templateId: 'template_xyz789',    // ← PEGA AQUÍ
    
    contactInfo: {
        email: 'kenvm1003@gmail.com',     // ← TU EMAIL
        phone: '+51970522622',
        whatsapp: '51970522622'           // ← TU WHATSAPP (sin +)
    }
};
```

**¡LISTO!** El formulario ahora funciona 🎉

---

## PASO 2: Probar localmente (1 minuto) 💻

### Opción A: Doble click
1. Abre `index.html` directamente

### Opción B: Servidor local (recomendado)
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# Abre: http://localhost:8000
```

---

## PASO 3: Subir a GitHub Pages (3 minutos) 🌐

### 3.1 Crear repositorio
1. Ve a [github.com](https://github.com/)
2. Click "New repository"
3. Nombre: `portafolio` (o el que quieras)
4. Public
5. Click "Create repository"

### 3.2 Subir código
```bash
cd tu-carpeta-portafolio

git init
git add .
git commit -m "Mi portafolio profesional"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/portafolio.git
git push -u origin main
```

### 3.3 Activar GitHub Pages
1. En GitHub → Tu repositorio
2. Settings → Pages
3. Source: "Deploy from a branch"
4. Branch: "main" + folder: "/ (root)"
5. Click "Save"
6. ⏱️ Espera 1-2 minutos

✨ **TU SITIO**: `https://TU-USUARIO.github.io/portafolio/`

---

## PASO 4: Personalizar (5 minutos) ✏️

### Información básica
Abre `index.html` y busca/reemplaza:
- `kenvm1003@gmail.com` → tu email
- `+51 970 522 622` → tu teléfono
- `51970522622` → tu WhatsApp
- URLs de LinkedIn

### Colores (opcional)
`css/style.css` → líneas 10-20:
```css
:root {
    --primary-color: #667eea;  /* Tu color primario */
    --secondary-color: #764ba2;
}
```

---

## 📋 CHECKLIST FINAL

- [ ] Configuré EmailJS en `js/config.js`
- [ ] Probé el formulario de contacto
- [ ] Funciona el modo oscuro (🌙/☀️)
- [ ] Funciona cambio de idioma (🇪🇸/🇺🇸)
- [ ] Funciona el chat de WhatsApp
- [ ] Actualicé mi información de contacto
- [ ] Subí a GitHub
- [ ] Activé GitHub Pages
- [ ] Verifiqué que el sitio funcione online

---

## 🆘 AYUDA RÁPIDA

### ❌ Formulario no envía
1. ¿Pegaste las credenciales en `js/config.js`?
2. ¿Las credenciales están entre comillas?
3. Abre consola (F12) → ¿hay errores?

### ❌ No funciona en GitHub Pages
1. ¿El repositorio es público?
2. ¿Esperaste 1-2 minutos después de activar Pages?
3. ¿La URL es correcta? (sin espacios, todo minúsculas)

### ❌ Chat de WhatsApp no abre
1. ¿El número está sin el símbolo +?
2. ¿El número incluye código de país?
3. Ejemplo correcto: `51970522622`

---

## 📞 SOPORTE

**¿Algo no funciona?**
- 📧 kenvm1003@gmail.com
- 📱 +51 970 522 622
- 📖 Lee `CONFIGURACION_EMAIL.md` (guía detallada)

---

## 🎉 ¡FELICIDADES!

Tu portafolio está listo y funcionando.

**Siguiente paso**: Comparte tu URL en LinkedIn 🚀

---

**Tiempo total**: ~10 minutos  
**Dificultad**: Fácil  
**Costo**: $0 (100% gratis)
