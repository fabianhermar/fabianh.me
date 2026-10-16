import GermanyFlag from '@/components/flags/Germany.astro'
import MexicoFlag from '@/components/flags/Mexico.astro'
import USFlag from '@/components/flags/US.astro'

export const LANGUAGES: Record<string, { code: string; name: string; flag: typeof MexicoFlag }> = {
	de: {
		code: 'de',
		name: 'Deutsch',
		flag: GermanyFlag,
	},
	en: {
		code: 'en',
		name: 'English',
		flag: USFlag,
	},
	es: {
		code: 'es',
		name: 'Español',
		flag: MexicoFlag,
	},
}

export const defaultLang = 'es'
export const showDefaultLang = false

export const ui = {
	es: {
		'nav.blog': 'Blog',
		'nav.about': 'Sobre mí',
		'nav.projects': 'Proyectos',
		'nav.experience': 'Experiencia',
		'nav.contact': 'Contacto',
		'nav.available': 'Disponible para proyectos',
		'nav.command': 'Buscar / Navegar',
		'btn.downloadCV': 'Descargar CV',
		'btn.digitalCV': 'CV Digital',
		'btn.letsTalk': 'Hablemos',
		'btn.viewProjects': 'Ver proyectos',
		'footer.title': '¿Listo para crear algo genial juntos?',
		'footer.subtitle': 'Pongámonos en contacto.',
		'footer.about': 'Sobre mí',
		'footer.projects': 'Proyectos',
		'footer.style': 'Guía de estilo',
		'footer.blog': 'Blog',
		'footer.small':
			'Desarrollado con <a class="font-medium underline underline-offset-4 hover:text-[var(--accent)]" href="https://astro.build" target="_blank" rel="noopener noreferrer">Astro</a> y <a class="font-medium underline underline-offset-4 hover:text-[var(--accent)]" href="https://react.dev" target="_blank" rel="noopener noreferrer">React</a>. Desplegado en <a class="font-medium underline underline-offset-4 hover:text-[var(--accent)]" href="https://vercel.com" target="_blank" rel="noopener noreferrer">Vercel</a> y protegido con <a class="font-medium underline underline-offset-4 hover:text-[var(--accent)]" href="https://cloudflare.com" target="_blank" rel="noopener noreferrer">Cloudflare</a>.',
	},
	en: {
		'nav.blog': 'Blog',
		'nav.about': 'About me',
		'nav.projects': 'Projects',
		'nav.experience': 'Experience',
		'nav.contact': 'Contact',
		'nav.available': 'Available for projects',
		'nav.command': 'Search / Navigate',
		'btn.downloadCV': 'Download CV',
		'btn.digitalCV': 'Digital CV',
		'btn.letsTalk': "Let's talk",
		'btn.viewProjects': 'View projects',
		'footer.title': 'Ready to create something great together?',
		'footer.subtitle': "Let's get in touch.",
		'footer.about': 'About me',
		'footer.projects': 'Projects',
		'footer.style': 'Style guide',
		'footer.blog': 'Blog',
		'footer.small':
			'Built with <a class="font-medium underline underline-offset-4 hover:text-[var(--accent)]" href="https://astro.build" target="_blank" rel="noopener noreferrer">Astro</a> and <a class="font-medium underline underline-offset-4 hover:text-[var(--accent)]" href="https://react.dev" target="_blank" rel="noopener noreferrer">React</a>. Deployed on <a class="font-medium underline underline-offset-4 hover:text-[var(--accent)]" href="https://vercel.com" target="_blank" rel="noopener noreferrer">Vercel</a> and managed via <a class="font-medium underline underline-offset-4 hover:text-[var(--accent)]" href="https://cloudflare.com" target="_blank" rel="noopener noreferrer">Cloudflare</a>.',
	},
	de: {
		'nav.blog': 'Blog',
		'nav.about': 'Über mich',
		'nav.projects': 'Projekte',
		'nav.experience': 'Erfahrung',
		'nav.contact': 'Kontakt',
		'nav.available': 'Verfügbar für Projekte',
		'nav.command': 'Suchen / Navigieren',
		'btn.downloadCV': 'CV herunterladen',
		'btn.digitalCV': 'Digitaler CV',
		'btn.letsTalk': 'Lass uns reden',
		'btn.viewProjects': 'Projekte ansehen',
		'footer.title': 'Bereit, zusammen etwas Großartiges zu schaffen?',
		'footer.subtitle': 'Lass uns in Kontakt treten.',
		'footer.about': 'Über mich',
		'footer.projects': 'Projekte',
		'footer.style': 'Stilhandbuch',
		'footer.blog': 'Blog',
		'footer.small':
			'Entwickelt mit <a class="font-medium underline underline-offset-4 hover:text-[var(--accent)]" href="https://astro.build" target="_blank" rel="noopener noreferrer">Astro</a> und <a class="font-medium underline underline-offset-4 hover:text-[var(--accent)]" href="https://react.dev" target="_blank" rel="noopener noreferrer">React</a>. Bereitgestellt auf <a class="font-medium underline underline-offset-4 hover:text-[var(--accent)]" href="https://vercel.com" target="_blank" rel="noopener noreferrer">Vercel</a> und verwaltet über <a class="font-medium underline underline-offset-4 hover:text-[var(--accent)]" href="https://cloudflare.com" target="_blank" rel="noopener noreferrer">Cloudflare</a>.',
	},
} as const

export const routes = {
	en: {
		'sobre-mi': 'about-me',
		'proyectos': 'projects',
		'archivo': 'archive',
		'blog': 'blog',
		'guia-de-estilo': 'style-guide',
	},
	de: {
		'sobre-mi': 'ueber-mich',
		'proyectos': 'projekte',
		'archivo': 'archiv',
		'blog': 'blog',
		'guia-de-estilo': 'stilhandbuch',
	},
}
