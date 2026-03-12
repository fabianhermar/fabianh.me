import { useState, useEffect } from 'react'
import { getI18N } from '@/i18n'

export function UTCClock() {
	const [time, setTime] = useState<Date | null>(null)
	const [timeZone, setTimeZone] = useState('')
	const [utcOffset, setUtcOffset] = useState(0)
	const currentLocale = 'es'
	const i18n = getI18N({ currentLocale })

	useEffect(() => {
		try {
			const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
			setTimeZone(tz || 'UTC')
		} catch (error) {
			console.error('Error getting timezone:', error)
			setTimeZone('UTC')
		}

		const offset = -new Date().getTimezoneOffset() / 60
		setUtcOffset(offset)

		const timer = setInterval(() => {
			setTime(new Date())
		}, 1000)

		return () => clearInterval(timer)
	}, [])

	const formatTime = (date: Date) => {
		const options: Intl.DateTimeFormatOptions = {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false,
			timeZone: timeZone || 'UTC', // Usa 'UTC' si timeZone no está definido
		}

		return date.toLocaleTimeString('es-MX', options)
	}

	const getTimeZoneMessage = () => {
		if (utcOffset === -6) {
			return `${i18n.landing.bento.time.timezone}`
		} else {
			const diff = utcOffset + 6
			const direction = diff > 0 ? 'adelante' : 'atrás'
			return `Estás ${Math.abs(diff)} hora${Math.abs(diff) !== 1 ? 's' : ''} ${direction} de México (UTC-6)`
		}
	}

	return (
		<div className='mx-auto w-full max-w-md overflow-hidden rounded-lg shadow-lg'>
			<div className='px-6 py-4'>
				<div className='flex flex-col items-center space-y-4 text-white'>
					<div className='text-gray-700 font-heading text-5xl md:text-7xl' aria-live='polite'>
						{time ? formatTime(time) : 'Cargando...'}
					</div>
					<p className='text-gray-600 font-display text-sm md:text-xl'>
						Zona horaria: {timeZone}
					</p>
					<p
						className='text-gray-600 text-center font-accent text-xs md:text-lg'
						aria-live='polite'
					>
						{getTimeZoneMessage()}
					</p>
				</div>
			</div>
		</div>
	)
}
