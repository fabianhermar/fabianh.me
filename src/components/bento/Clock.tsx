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

		const now = new Date()
		const offset = -now.getTimezoneOffset() / 60
		setUtcOffset(offset)
		setTime(now)

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
			timeZone: timeZone || 'UTC',
		}

		return date.toLocaleTimeString('es-MX', options)
	}

	const getTimeZoneMessage = () => {
		if (utcOffset === -6) {
			return `${i18n.landing.bento.time.timezone}`
		} else {
			const diff = utcOffset + 6
			const direction =
				diff > 0
					? i18n.landing.bento.time.direction.forward
					: i18n.landing.bento.time.direction.back
			return `${i18n.landing.bento.time.message.youre} ${Math.abs(diff)} ${i18n.landing.bento.time.message.hour.singular}${Math.abs(diff) !== 1 ? i18n.landing.bento.time.message.hour.plural : ''} ${direction} ${i18n.landing.bento.time.message.local}`
		}
	}

	const currentHour = time ? time.getHours() : 12
	const isDaytime = currentHour >= 6 && currentHour < 19

	return (
		<div className='flex flex-col justify-between gap-6 pt-3'>
			{/* Large Tabular Clock Display (Zero layout jump on tick) */}
			<div>
				<div className='flex items-center justify-between gap-2'>
					<span className='font-mono text-xs text-[var(--text-muted)]'>
						{i18n.landing.bento.time.zone}{' '}
						<strong className='font-medium text-[var(--text-secondary)]'>
							{timeZone || 'UTC-6'}
						</strong>
					</span>
					<span className='inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)]'>
						<span
							className='size-1.5 rounded-full'
							style={{
								backgroundColor: isDaytime ? 'var(--accent)' : 'var(--text-muted)',
							}}
						/>
						{isDaytime ? 'DAY' : 'NIGHT'}
					</span>
				</div>

				{time ? (
					<div
						className='mt-2 font-heading tabular-nums text-5xl font-bold tracking-tight text-[var(--text-primary)] md:text-6xl'
						aria-live='off'
					>
						{formatTime(time)}
					</div>
				) : (
					<div className='mt-2' aria-busy='true' aria-label='Cargando hora actual'>
						<div className='skeleton-block h-14 w-56' />
					</div>
				)}
			</div>

			{/* Timezone Offset Relative to Mexico */}
			<div className='flex items-center justify-between border-t border-[var(--border-subtle)] pt-4'>
				<p className='text-xs font-medium text-[var(--text-secondary)]' aria-live='polite'>
					{time ? getTimeZoneMessage() : <span className='skeleton-block inline-block h-4 w-48' />}
				</p>
				<span className='font-mono tabular-nums text-[11px] text-[var(--text-muted)]'>
					MX · UTC-6
				</span>
			</div>
		</div>
	)
}
