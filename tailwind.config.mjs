/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			fontFamily: {
				GilroyRegular: ['GilroyRegular', 'system-ui', 'sans-serif'],
				GilroyBold: ['GilroyBold', 'system-ui', 'sans-serif'],
				GilroySemibold: ['GilroySemibold', 'system-ui', 'sans-serif'],
			},
		},
		colors: {},
		borderRadius: {
			'lg': 'var(--radius)',
			'md': 'calc(var(--radius) - 2px)',
			'sm': 'calc(var(--radius) - 4px)',
			'xs': 'calc(var(--radius) - 6px)',
			'xl': 'calc(var(--radius) + 2px)',
			'2xl': 'calc(var(--radius) + 4px)',
			'3xl': 'calc(var(--radius) + 6px)',
			'full': '9999px',
		},
		keyframes: {
			'accordion-down': {
				from: { height: '0' },
				to: { height: 'var(--radix-accordion-content-height)' },
			},
			'accordion-up': {
				from: { height: 'var(--radix-accordion-content-height)' },
				to: { height: '0' },
			},
		},
		animation: {
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out',
		},
	},
	plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}
