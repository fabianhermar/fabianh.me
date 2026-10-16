import React, { useEffect, useMemo, useRef, useState } from 'react'

interface CommandPaletteProps {
	lang?: 'es' | 'en' | 'de'
}

interface CommandItem {
	id: string
	group: string
	label: string
	hint?: string
	keywords: string
	action: () => void
}

export default function CommandPalette({ lang = 'es' }: CommandPaletteProps) {
	const [open, setOpen] = useState(false)
	const [query, setQuery] = useState('')
	const [activeIndex, setActiveIndex] = useState(0)
	const [copied, setCopied] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	const isEn = lang === 'en'
	const isDe = lang === 'de'
	const prefix = lang === 'es' ? '' : `/${lang}`

	const routes = {
		home: prefix || '/',
		projects: isEn ? '/en/projects' : isDe ? '/de/projekte' : '/proyectos',
		about: isEn ? '/en/about-me' : isDe ? '/de/ueber-mich' : '/sobre-mi',
		blog: isEn ? '/en/blog' : isDe ? '/de/blog' : '/blog',
		style: isEn ? '/en/style-guide' : isDe ? '/de/stilhandbuch' : '/guia-de-estilo',
	}

	const navigateTo = (url: string) => {
		setOpen(false)
		window.location.href = url
	}

	const toggleTheme = () => {
		const root = document.documentElement
		const isDark = root.classList.toggle('dark')
		localStorage.setItem('theme', isDark ? 'dark' : 'light')
		setOpen(false)
	}

	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText('ctofabian@gmail.com')
			setCopied(true)
			setTimeout(() => {
				setCopied(false)
				setOpen(false)
			}, 700)
		} catch {
			window.location.href = 'mailto:ctofabian@gmail.com'
			setOpen(false)
		}
	}

	const commands: CommandItem[] = useMemo(
		() => [
			{
				id: 'sec-projects',
				group: isEn ? 'Sections' : isDe ? 'Abschnitte' : 'Secciones',
				label: isEn ? 'Go to Selected Projects' : isDe ? 'Zu den Projekten' : 'Ir a Proyectos seleccionados',
				hint: '#projects',
				keywords: 'proyectos projects casos estudio clearcut boxode dune',
				action: () => navigateTo(`${routes.home}#projects`),
			},
			{
				id: 'sec-experience',
				group: isEn ? 'Sections' : isDe ? 'Abschnitte' : 'Secciones',
				label: isEn ? 'Go to Experience' : isDe ? 'Zur Berufserfahrung' : 'Ir a Experiencia profesional',
				hint: '#experience',
				keywords: 'experiencia experience trabajo inifap compucel inbac',
				action: () => navigateTo(`${routes.home}#experience`),
			},
			{
				id: 'sec-about',
				group: isEn ? 'Sections' : isDe ? 'Abschnitte' : 'Secciones',
				label: isEn ? 'Go to About & Bento Grid' : isDe ? 'Zu Über mich (Bento)' : 'Ir a Sobre mí (Bento Grid)',
				hint: '#about-me',
				keywords: 'sobre mi about bento clima weather hora clock educacion hobbies',
				action: () => navigateTo(`${routes.home}#about-me`),
			},
			{
				id: 'sec-contact',
				group: isEn ? 'Sections' : isDe ? 'Abschnitte' : 'Secciones',
				label: isEn ? 'Go to Contact Form' : isDe ? 'Zum Kontaktformular' : 'Ir al Formulario de contacto',
				hint: '#contact',
				keywords: 'contacto contact hablemos mensaje email formulario',
				action: () => navigateTo(`${routes.home}#contact`),
			},
			{
				id: 'page-home',
				group: isEn ? 'Pages' : isDe ? 'Seiten' : 'Páginas',
				label: isEn ? 'Home' : isDe ? 'Startseite' : 'Inicio',
				hint: routes.home,
				keywords: 'inicio home principal',
				action: () => navigateTo(routes.home),
			},
			{
				id: 'page-projects',
				group: isEn ? 'Pages' : isDe ? 'Seiten' : 'Páginas',
				label: isEn ? 'Projects Archive' : isDe ? 'Projektarchiv' : 'Archivo de Proyectos',
				hint: routes.projects,
				keywords: 'proyectos archive todos portafolio',
				action: () => navigateTo(routes.projects),
			},
			{
				id: 'page-about',
				group: isEn ? 'Pages' : isDe ? 'Seiten' : 'Páginas',
				label: isEn ? 'About Me (Full Story)' : isDe ? 'Über mich' : 'Sobre mí (Historia completa)',
				hint: routes.about,
				keywords: 'sobre mi about biografia historia',
				action: () => navigateTo(routes.about),
			},
			{
				id: 'page-blog',
				group: isEn ? 'Pages' : isDe ? 'Seiten' : 'Páginas',
				label: 'Blog',
				hint: routes.blog,
				keywords: 'blog articulos posts notas',
				action: () => navigateTo(routes.blog),
			},
			{
				id: 'page-style',
				group: isEn ? 'Pages' : isDe ? 'Seiten' : 'Páginas',
				label: isEn ? 'Style Guide' : isDe ? 'Stilhandbuch' : 'Guía de Estilo',
				hint: routes.style,
				keywords: 'guia estilo style guide design system tokens oklch',
				action: () => navigateTo(routes.style),
			},
			{
				id: 'act-theme',
				group: isEn ? 'Actions' : isDe ? 'Aktionen' : 'Acciones',
				label: isEn
					? 'Toggle Light / Dark Mode'
					: isDe
						? 'Helles / Dunkles Design wechseln'
						: 'Alternar modo claro / oscuro',
				hint: 'Theme',
				keywords: 'tema theme dark light oscuro claro modo',
				action: toggleTheme,
			},
			{
				id: 'act-email',
				group: isEn ? 'Actions' : isDe ? 'Aktionen' : 'Acciones',
				label: copied
					? isEn
						? 'Email copied: ctofabian@gmail.com'
						: '¡Correo copiado: ctofabian@gmail.com!'
					: isEn
						? 'Copy email (ctofabian@gmail.com)'
						: 'Copiar correo (ctofabian@gmail.com)',
				hint: 'Copy',
				keywords: 'copiar correo email mail ctofabian',
				action: copyEmail,
			},
			{
				id: 'act-cv',
				group: isEn ? 'Actions' : isDe ? 'Aktionen' : 'Acciones',
				label: isEn ? 'Download CV (PDF)' : isDe ? 'CV herunterladen (PDF)' : 'Descargar CV (PDF)',
				hint: 'PDF',
				keywords: 'cv curriculum resume descargar pdf',
				action: () => navigateTo('/FabianHerrera_CV.pdf'),
			},
			{
				id: 'lang-es',
				group: isEn ? 'Language' : isDe ? 'Sprache' : 'Idioma',
				label: 'Español (ES)',
				hint: '/',
				keywords: 'español spanish idioma lang',
				action: () => navigateTo('/'),
			},
			{
				id: 'lang-en',
				group: isEn ? 'Language' : isDe ? 'Sprache' : 'Idioma',
				label: 'English (EN)',
				hint: '/en',
				keywords: 'english ingles idioma lang',
				action: () => navigateTo('/en'),
			},
		],
		[copied, isDe, isEn, routes.about, routes.blog, routes.home, routes.projects, routes.style]
	)

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase()
		if (!q) return commands
		return commands.filter(
			(item) =>
				item.label.toLowerCase().includes(q) ||
				item.group.toLowerCase().includes(q) ||
				item.keywords.toLowerCase().includes(q)
		)
	}, [commands, query])

	useEffect(() => {
		setActiveIndex(0)
	}, [query, open])

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault()
				setOpen((prev) => !prev)
				return
			}
			if (!open) return

			if (e.key === 'Escape') {
				e.preventDefault()
				setOpen(false)
			} else if (e.key === 'ArrowDown') {
				e.preventDefault()
				setActiveIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0))
			} else if (e.key === 'ArrowUp') {
				e.preventDefault()
				setActiveIndex((prev) =>
					filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0
				)
			} else if (e.key === 'Enter' && filtered[activeIndex]) {
				e.preventDefault()
				filtered[activeIndex].action()
			}
		}

		const onCustomOpen = () => setOpen(true)

		window.addEventListener('keydown', onKeyDown)
		window.addEventListener('open-command-palette', onCustomOpen)
		return () => {
			window.removeEventListener('keydown', onKeyDown)
			window.removeEventListener('open-command-palette', onCustomOpen)
		}
	}, [open, filtered, activeIndex])

	useEffect(() => {
		if (open) {
			setTimeout(() => inputRef.current?.focus(), 20)
		} else {
			setQuery('')
		}
	}, [open])

	if (!open) return null

	return (
		<div
			className='fixed inset-0 z-[100] flex items-start justify-center bg-black/50 px-4 pt-20 backdrop-blur-xs sm:pt-28'
			role='dialog'
			aria-modal='true'
			aria-label={isEn ? 'Command Palette' : 'Paleta de comandos'}
			onClick={(e) => {
				if (e.target === e.currentTarget) setOpen(false)
			}}
		>
			<div className='w-full max-w-lg overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-2xl'>
				{/* Search Input Bar */}
				<div className='flex items-center gap-3 border-b border-[var(--border-subtle)] px-4 py-3'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='size-4 shrink-0 text-[var(--text-muted)]'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='1.75'
						strokeLinecap='round'
						strokeLinejoin='round'
						aria-hidden='true'
					>
						<circle cx='11' cy='11' r='8' />
						<path d='m21 21-4.3-4.3' />
					</svg>
					<input
						ref={inputRef}
						type='text'
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder={
							isEn
								? 'Type a command or search sections...'
								: isDe
									? 'Befehl eingeben oder suchen...'
									: 'Escribe un comando o busca una sección...'
						}
						aria-label={isEn ? 'Search commands' : 'Buscar comandos'}
						className='w-full bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none'
					/>
					<button
						type='button'
						onClick={() => setOpen(false)}
						className='rounded border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
					>
						ESC
					</button>
				</div>

				{/* Command List */}
				<div className='max-h-80 overflow-y-auto p-2' role='listbox'>
					{filtered.length === 0 ? (
						<p className='py-8 text-center text-xs text-[var(--text-muted)]'>
							{isEn ? 'No matching commands found.' : 'No se encontraron resultados.'}
						</p>
					) : (
						filtered.map((item, idx) => {
							const isActive = idx === activeIndex
							return (
								<button
									key={item.id}
									type='button'
									role='option'
									aria-selected={isActive}
									onMouseEnter={() => setActiveIndex(idx)}
									onClick={() => item.action()}
									className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs transition-colors ${
										isActive
											? 'bg-[var(--accent-soft)] text-[var(--accent)] font-medium'
											: 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
									}`}
								>
									<div className='flex items-center gap-2.5 truncate'>
										<span className='font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] w-16 shrink-0'>
											{item.group}
										</span>
										<span className='truncate text-sm text-[var(--text-primary)]'>
											{item.label}
										</span>
									</div>
									{item.hint && (
										<span className='ml-3 shrink-0 font-mono text-[11px] text-[var(--text-muted)]'>
											{item.hint}
										</span>
									)}
								</button>
							)
						})
					)}
				</div>

				{/* Footer Hint */}
				<div className='flex items-center justify-between border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-2 font-mono text-[11px] text-[var(--text-muted)]'>
					<span>↑↓ {isEn ? 'to navigate' : 'para navegar'}</span>
					<span>↵ {isEn ? 'to select' : 'para abrir'}</span>
				</div>
			</div>
		</div>
	)
}
