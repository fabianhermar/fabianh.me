import { useState, useEffect } from 'react'
import { getI18N } from '@/i18n'


interface ClockProps {
	currentLocale?: string
}

export function UTCClock({ currentLocale }: ClockProps) {
	const [time, setTime] = useState<Date | null>(null)
	const [timeZone, setTimeZone] = useState('')
	const [utcOffset, setUtcOffset] = useState(0)
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
			const direction = diff > 0 ? i18n.landing.bento.time.direction.forward : i18n.landing.bento.time.direction.back
			return `${i18n.landing.bento.time.message.youre} ${Math.abs(diff)} ${i18n.landing.bento.time.message.hour.singular}${Math.abs(diff) !== 1 ? i18n.landing.bento.time.message.hour.plural : ''} ${direction} ${i18n.landing.bento.time.message.local}`
		}
	}

	return (
		<div className='mx-auto w-full max-w-md overflow-hidden rounded-lg shadow-lg'>
			<div className='px-6 py-4'>
				<div className='flex flex-col items-center space-y-4 text-white'>
					<div className='text-white font-heading text-5xl md:text-7xl' aria-live='polite'>
						{time ? formatTime(time) : 'Loading...'}
					</div>
					<p className='text-neutral-400 font-display text-sm md:text-xl'>
						{i18n.landing.bento.time.zone} {timeZone}
					</p>
					<p
						className='text-neutral-400 text-center font-accent text-xs md:text-lg'
						aria-live='polite'
					>
						{getTimeZoneMessage()}
					</p>
				</div>
			</div>
		</div>
	)
}
