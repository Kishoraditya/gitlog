/**
 * Simple i18n system for GitLog AI
 * Supports: English (en), Hindi (hi), Spanish (es), German (de)
 */

// Supported locales
export const SUPPORTED_LOCALES = ["en", "hi", "es", "de"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

// Translation keys
export const translations: Record<Locale, Record<string, string>> = {
    en: {
        // Common
        "app.name": "GitLog AI",
        "app.tagline": "AI-powered changelog generation",

        // Navigation
        "nav.home": "Home",
        "nav.resources": "Resources",
        "nav.faq": "FAQ",
        "nav.api": "API",
        "nav.login": "Sign In",
        "nav.getStarted": "Get Started",

        // Hero
        "hero.title": "Turn Git Commits into Beautiful Changelogs",
        "hero.subtitle": "Stop writing release notes manually. Connect your GitHub repository and let AI generate polished changelogs in seconds.",
        "hero.cta.github": "Connect GitHub",
        "hero.cta.howItWorks": "See How It Works",

        // Features
        "features.oneClick": "One-Click Sync",
        "features.smartCategorization": "Smart Categorization",
        "features.semver": "Semver Suggestions",
        "features.byok": "BYOK (Free Forever)",
        "features.pushToGithub": "Push to GitHub",
        "features.multipleFormats": "Multiple Formats",

        // Generate Page
        "generate.title": "Generate Changelog",
        "generate.selectRepo": "Select Repository",
        "generate.commitRange": "Commit Range",
        "generate.format": "Format",
        "generate.generate": "Generate",
        "generate.generating": "Generating...",
        "generate.copy": "Copy",
        "generate.copied": "Copied!",
        "generate.pushToGithub": "Push to GitHub",

        // Changelog headers (used in LLM output)
        "changelog.added": "Added",
        "changelog.changed": "Changed",
        "changelog.deprecated": "Deprecated",
        "changelog.removed": "Removed",
        "changelog.fixed": "Fixed",
        "changelog.security": "Security",

        // Errors
        "error.generic": "Something went wrong",
        "error.unauthorized": "Please sign in to continue",
        "error.rateLimit": "Too many requests. Please try again later.",
    },
    hi: {
        // Common
        "app.name": "GitLog AI",
        "app.tagline": "AI-संचालित चेंजलॉग जेनरेशन",

        // Navigation
        "nav.home": "होम",
        "nav.resources": "संसाधन",
        "nav.faq": "अक्सर पूछे जाने वाले प्रश्न",
        "nav.api": "API",
        "nav.login": "साइन इन करें",
        "nav.getStarted": "शुरू करें",

        // Hero
        "hero.title": "Git कमिट्स को सुंदर चेंजलॉग में बदलें",
        "hero.subtitle": "रिलीज नोट्स मैन्युअल रूप से लिखना बंद करें। अपने GitHub रिपॉजिटरी को कनेक्ट करें और AI को सेकंडों में पॉलिश्ड चेंजलॉग जेनरेट करने दें।",
        "hero.cta.github": "GitHub कनेक्ट करें",
        "hero.cta.howItWorks": "देखें कैसे काम करता है",

        // Features
        "features.oneClick": "वन-क्लिक सिंक",
        "features.smartCategorization": "स्मार्ट वर्गीकरण",
        "features.semver": "Semver सुझाव",
        "features.byok": "BYOK (हमेशा मुफ्त)",
        "features.pushToGithub": "GitHub पर पुश करें",
        "features.multipleFormats": "विभिन्न फॉर्मेट",

        // Generate Page
        "generate.title": "चेंजलॉग जेनरेट करें",
        "generate.selectRepo": "रिपॉजिटरी चुनें",
        "generate.commitRange": "कमिट रेंज",
        "generate.format": "फॉर्मेट",
        "generate.generate": "जेनरेट करें",
        "generate.generating": "जेनरेट हो रहा है...",
        "generate.copy": "कॉपी करें",
        "generate.copied": "कॉपी हो गया!",
        "generate.pushToGithub": "GitHub पर पुश करें",

        // Changelog headers
        "changelog.added": "जोड़ा गया",
        "changelog.changed": "बदला गया",
        "changelog.deprecated": "पदावनत",
        "changelog.removed": "हटाया गया",
        "changelog.fixed": "ठीक किया गया",
        "changelog.security": "सुरक्षा",

        // Errors
        "error.generic": "कुछ गलत हो गया",
        "error.unauthorized": "जारी रखने के लिए साइन इन करें",
        "error.rateLimit": "बहुत सारे अनुरोध। कृपया बाद में पुनः प्रयास करें।",
    },
    es: {
        // Common
        "app.name": "GitLog AI",
        "app.tagline": "Generación de changelogs con IA",

        // Navigation
        "nav.home": "Inicio",
        "nav.resources": "Recursos",
        "nav.faq": "FAQ",
        "nav.api": "API",
        "nav.login": "Iniciar sesión",
        "nav.getStarted": "Comenzar",

        // Hero
        "hero.title": "Convierte commits de Git en hermosos changelogs",
        "hero.subtitle": "Deja de escribir notas de lanzamiento manualmente. Conecta tu repositorio de GitHub y deja que la IA genere changelogs pulidos en segundos.",
        "hero.cta.github": "Conectar GitHub",
        "hero.cta.howItWorks": "Ver cómo funciona",

        // Features
        "features.oneClick": "Sincronización con un clic",
        "features.smartCategorization": "Categorización inteligente",
        "features.semver": "Sugerencias de Semver",
        "features.byok": "BYOK (Gratis siempre)",
        "features.pushToGithub": "Subir a GitHub",
        "features.multipleFormats": "Múltiples formatos",

        // Generate Page
        "generate.title": "Generar Changelog",
        "generate.selectRepo": "Seleccionar repositorio",
        "generate.commitRange": "Rango de commits",
        "generate.format": "Formato",
        "generate.generate": "Generar",
        "generate.generating": "Generando...",
        "generate.copy": "Copiar",
        "generate.copied": "¡Copiado!",
        "generate.pushToGithub": "Subir a GitHub",

        // Changelog headers
        "changelog.added": "Añadido",
        "changelog.changed": "Cambiado",
        "changelog.deprecated": "Obsoleto",
        "changelog.removed": "Eliminado",
        "changelog.fixed": "Corregido",
        "changelog.security": "Seguridad",

        // Errors
        "error.generic": "Algo salió mal",
        "error.unauthorized": "Por favor inicia sesión para continuar",
        "error.rateLimit": "Demasiadas solicitudes. Por favor intenta más tarde.",
    },
    de: {
        // Common
        "app.name": "GitLog AI",
        "app.tagline": "KI-gestützter Changelog-Generator",

        // Navigation
        "nav.home": "Startseite",
        "nav.resources": "Ressourcen",
        "nav.faq": "FAQ",
        "nav.api": "API",
        "nav.login": "Anmelden",
        "nav.getStarted": "Loslegen",

        // Hero
        "hero.title": "Git-Commits in schöne Changelogs verwandeln",
        "hero.subtitle": "Hören Sie auf, Release-Notes manuell zu schreiben. Verbinden Sie Ihr GitHub-Repository und lassen Sie KI in Sekunden polierte Changelogs erstellen.",
        "hero.cta.github": "GitHub verbinden",
        "hero.cta.howItWorks": "So funktioniert es",

        // Features
        "features.oneClick": "Ein-Klick-Sync",
        "features.smartCategorization": "Intelligente Kategorisierung",
        "features.semver": "Semver-Vorschläge",
        "features.byok": "BYOK (Immer kostenlos)",
        "features.pushToGithub": "Zu GitHub pushen",
        "features.multipleFormats": "Mehrere Formate",

        // Generate Page
        "generate.title": "Changelog generieren",
        "generate.selectRepo": "Repository auswählen",
        "generate.commitRange": "Commit-Bereich",
        "generate.format": "Format",
        "generate.generate": "Generieren",
        "generate.generating": "Generiere...",
        "generate.copy": "Kopieren",
        "generate.copied": "Kopiert!",
        "generate.pushToGithub": "Zu GitHub pushen",

        // Changelog headers
        "changelog.added": "Hinzugefügt",
        "changelog.changed": "Geändert",
        "changelog.deprecated": "Veraltet",
        "changelog.removed": "Entfernt",
        "changelog.fixed": "Behoben",
        "changelog.security": "Sicherheit",

        // Errors
        "error.generic": "Etwas ist schief gelaufen",
        "error.unauthorized": "Bitte melden Sie sich an um fortzufahren",
        "error.rateLimit": "Zu viele Anfragen. Bitte versuchen Sie es später erneut.",
    },
};

// Get translation
export function t(key: string, locale: Locale = "en"): string {
    return translations[locale]?.[key] || translations.en[key] || key;
}

// Get all translations for a locale
export function getTranslations(locale: Locale): Record<string, string> {
    return translations[locale] || translations.en;
}

// Detect locale from Accept-Language header
export function detectLocale(acceptLanguage?: string | null): Locale {
    if (!acceptLanguage) return "en";

    const languages = acceptLanguage.split(",").map((lang) => {
        const [code] = lang.trim().split(";");
        return code.substring(0, 2).toLowerCase();
    });

    for (const lang of languages) {
        if (SUPPORTED_LOCALES.includes(lang as Locale)) {
            return lang as Locale;
        }
    }

    return "en";
}

// LLM language instructions for changelog generation
export const LLM_LANGUAGE_INSTRUCTIONS: Record<Locale, string> = {
    en: "Write the changelog in English.",
    hi: "चेंजलॉग को हिंदी में लिखें। Use Hindi for section headers like 'जोड़ा गया', 'बदला गया', 'ठीक किया गया'.",
    es: "Escribe el changelog en español. Usa encabezados como 'Añadido', 'Cambiado', 'Corregido'.",
    de: "Schreibe den Changelog auf Deutsch. Verwende Überschriften wie 'Hinzugefügt', 'Geändert', 'Behoben'.",
};
