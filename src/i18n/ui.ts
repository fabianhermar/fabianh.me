import GermanyFlag from '@/components/flags/Germany.astro'
import MexicoFlag from '@/components/flags/Mexico.astro'
import USFlag from '@/components/flags/US.astro'

// Add missing imports
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
		'nav.about': 'Sobre mi',
		'nav.projects': 'Proyectos',
		'nav.experience': 'Experiencia',
		'nav.contact': 'Contáctame',
		'btn.downloadCV': 'Descargar CV',
		'btn.digitalCV': 'CV Digital',
		'footer.title': '¿Listo para crear algo genial juntos?',
		'footer.subtitle': 'Pongámonos en contacto.',
		'footer.about': 'Sobre mi',
		'footer.projects': 'Proyectos',
		'footer.style': 'Guía de estilo',
		'footer.blog': 'Blog',
		'footer.small':
			'Desarrollado con mucho ❤ utilizando <a class="font-heading underline text-[#FF5D01]" href="https://astro.build" target="_blank">Astro</a> y <a class="font-heading underline text-[#00D8FF]" href="https://react.dev" target="_blank">React</a>. Desplegado en <a class="font-heading underline text-black href="https://vercel.com" target="_blank">Vercel</a> y administrado por <a class="font-heading underline text-[#F48120]" href="https://cloudflare.com" target="_blank">CloudFlare</a>.',
	},
	en: {
		'nav.about': 'About me',
		'nav.projects': 'Projects',
		'nav.experience': 'Experience',
		'nav.contact': 'Contact me',
		'btn.downloadCV': 'Download CV',
		'btn.digitalCV': 'Digital CV',
		'footer.title': 'Ready to create something awesome together?',
		'footer.subtitle': "Let's get in touch.",
		'footer.about': 'About me',
		'footer.projects': 'Projects',
		'footer.style': 'Style guide',
		'footer.blog': 'Blog',
		'footer.small':
			'Developed with a lot of ❤ using <a class="font-heading underline text-[#FF5D01]" href="https://astro.build" target="_blank">Astro</a> and <a class="font-heading underline text-[#00D8FF]" href="https://react.dev" target="_blank">React</a>. Deployed on <a class="font-heading underline text-black href="https://vercel.com" target="_blank">Vercel</a> and managed by <a class="font-heading underline text-[#F48120]" href="https://cloudflare.com" target="_blank">CloudFlare</a>.',
	},
	de: {
		'nav.about': 'Über mich',
		'nav.projects': 'Projekte',
		'nav.experience': 'Erfahrung',
		'nav.contact': 'Kontaktiere mich',
		'btn.downloadCV': 'CV herunterladen',
		'btn.digitalCV': 'Digitaler Lebenslauf',
		'footer.title': 'Bereit, zusammen etwas Tolles zu schaffen?',
		'footer.subtitle': 'Lass uns in Kontakt kommen.',
		'footer.about': 'Über mich',
		'footer.projects': 'Projekte',
		'footer.style': 'Stilhandbuch',
		'footer.blog': 'Blog',
		'footer.small':
			'Entwickelt mit viel ❤ unter Verwendung von <a class="font-heading underline text-[#FF5D01]" href="https://astro.build" target="_blank">Astro</a> und <a class="font-heading underline text-[#00D8FF]" href="https://react.dev" target="_blank">React</a>. Bereitgestellt auf <a class="font-heading underline text-black href="https://vercel.com" target="_blank">Vercel</a> und verwaltet von <a class="font-heading underline text-[#F48120]" href="https://cloudflare.com" target="_blank">CloudFlare</a>.',
	},
} as const

export const routes = {
	es: {
		'about': 'sobre-mi',
		'projects': 'proyectos',
		'archive': 'archivo',
		'blog': 'blog',
		'style-guide': 'guia-de-estilo',
	},
	en: {
		'about': 'about-me',
		'projects': 'projects',
		'archive': 'archive',
		'blog': 'blog',
		'style-guide': 'style-guide',
	},
	de: {
		'about': 'ueber-mich',
		'projects': 'projekte',
		'archive': 'archiv',
		'blog': 'blog',
		'style-guide': 'stilhandbuch',
	},
}
