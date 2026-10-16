import React, { useCallback, useEffect, useState } from 'react'
import type { WeatherData } from '@/types/weather'
import { getWeatherIcon } from '@/pages/api/getWeatherIcon'
import { getI18N } from '@/i18n'

interface WeatherProps {
	currentLocale?: string
}

function WeatherLineGlyph({ iconName }: { iconName: string }) {
	const isNight = iconName.includes('night')
	const isRain = iconName.includes('rain') || iconName.includes('drizzle') || iconName.includes('sleet')
	const isStorm = iconName.includes('thunderstorm') || iconName.includes('tornado') || iconName.includes('hail')
	const isSnow = iconName.includes('snow')
	const isFog = iconName.includes('fog')
	const isCloudy = iconName.includes('cloud') || iconName.includes('overcast')

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
			className='size-12 text-[var(--accent)] transition-transform duration-300 group-hover:scale-105'
			aria-hidden='true'
		>
			{isStorm ? (
				<>
					<path d='M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973' />
					<path d='m13 12-3 5h4l-3 5' />
				</>
			) : isRain ? (
				<>
					<path d='M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' />
					<path d='M16 14v6' />
					<path d='M8 14v6' />
					<path d='M12 16v6' />
				</>
			) : isSnow ? (
				<>
					<path d='M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' />
					<path d='M8 15h.01' />
					<path d='M8 19h.01' />
					<path d='M12 17h.01' />
					<path d='M12 21h.01' />
					<path d='M16 15h.01' />
					<path d='M16 19h.01' />
				</>
			) : isFog ? (
				<>
					<path d='M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' />
					<path d='M16 17H7' />
					<path d='M17 21H9' />
				</>
			) : isCloudy ? (
				<>
					<path d='M12 2v2' />
					<path d='m4.93 4.93 1.41 1.41' />
					<path d='M20 12h2' />
					<path d='m19.07 4.93-1.41 1.41' />
					<path d='M15.947 12.65a4 4 0 0 0-5.925-4.128' />
					<path d='M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z' />
				</>
			) : isNight ? (
				<path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' />
			) : (
				<>
					<circle cx='12' cy='12' r='4' />
					<path d='M12 2v2' />
					<path d='M12 20v2' />
					<path d='m4.93 4.93 1.41 1.41' />
					<path d='m17.66 17.66 1.41 1.41' />
					<path d='M2 12h2' />
					<path d='M20 12h2' />
					<path d='m6.34 17.66-1.41 1.41' />
					<path d='m19.07 4.93-1.41 1.41' />
				</>
			)}
		</svg>
	)
}

const CurrentWeather: React.FC<WeatherProps> = ({ currentLocale }) => {
	const [location, setLocation] = useState<string | null>(null)
	const [weather, setWeather] = useState<WeatherData | null>(null)
	const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
	const i18n = getI18N({ currentLocale })
	const labels = i18n.landing.bento.weather

	const fetchData = useCallback(async () => {
		setStatus('loading')
		try {
			const response = await fetch('/api/fetchWeather.json')
			if (!response.ok) {
				throw new Error(`HTTP ${response.status}`)
			}
			const data = await response.json()
			if (!data || data.error || !data.weather || !data.weather.main) {
				throw new Error('Invalid weather payload')
			}
			setLocation(data.city || 'Zacatecas, MX')
			setWeather(data.weather)
			setStatus('ready')
		} catch {
			setStatus('error')
		}
	}, [])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	const currentTime = new Date().getHours()
	const isDaytime = currentTime >= 6 && currentTime < 19

	if (status === 'loading') {
		return (
			<div
				className='flex flex-col justify-between gap-6 pt-4'
				aria-busy='true'
				aria-label='Cargando datos del clima'
			>
				<div className='flex items-start justify-between'>
					<div className='space-y-2.5'>
						<div className='skeleton-block h-4 w-28' />
						<div className='skeleton-block h-12 w-32' />
						<div className='skeleton-block h-4 w-20' />
					</div>
					<div className='skeleton-block size-12 rounded-lg' />
				</div>
				<div className='grid grid-cols-2 gap-2.5 border-t border-[var(--border-subtle)] pt-4 sm:grid-cols-4'>
					<div className='skeleton-block h-12 w-full' />
					<div className='skeleton-block h-12 w-full' />
					<div className='skeleton-block h-12 w-full' />
					<div className='skeleton-block h-12 w-full' />
				</div>
			</div>
		)
	}

	if (status === 'error' || !weather || !location) {
		return (
			<div className='flex flex-col justify-between gap-4 pt-4'>
				<div className='flex items-start justify-between gap-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4'>
					<div className='space-y-1'>
						<p className='font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]'>
							Zacatecas, MX · UTC-6
						</p>
						<p className='text-sm font-medium text-[var(--text-primary)]'>
							{labels.error || 'Clima temporalmente no disponible'}
						</p>
					</div>
					<button
						type='button'
						onClick={fetchData}
						className='inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-3 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)]'
					>
						{labels.retry || 'Reintentar'}
					</button>
				</div>

				<div className='grid grid-cols-3 gap-2 border-t border-[var(--border-subtle)] pt-4 font-mono text-xs text-[var(--text-muted)] tabular-nums'>
					<div>
						<span className='block text-[10px] uppercase'>{labels.wind || 'Viento'}</span>
						<span className='text-[var(--text-secondary)]'>— km/h</span>
					</div>
					<div>
						<span className='block text-[10px] uppercase'>{labels.humidity || 'Humedad'}</span>
						<span className='text-[var(--text-secondary)]'>— %</span>
					</div>
					<div>
						<span className='block text-[10px] uppercase'>{labels.visibility || 'Visibilidad'}</span>
						<span className='text-[var(--text-secondary)]'>— km</span>
					</div>
				</div>
			</div>
		)
	}

	const icon = getWeatherIcon(weather, currentTime)
	const windSpeed = (weather.wind.speed * 3.6).toFixed(1)
	const temperature = weather.main.temp.toFixed(0)
	const visibility = (weather.visibility / 1000).toFixed(1)
	const tempMin = weather.main.temp_min.toFixed(0)
	const tempMax = weather.main.temp_max.toFixed(0)

	return (
		<div
			className='flex flex-col justify-between gap-6 pt-3'
			data-daytime={isDaytime ? 'day' : 'night'}
		>
			<div className='flex items-start justify-between gap-4'>
				<div>
					<p className='font-mono text-xs font-medium text-[var(--text-muted)]'>
						{location}
					</p>
					<div className='mt-1 flex items-baseline gap-3'>
						<span className='font-heading tabular-nums text-5xl font-bold tracking-tight text-[var(--text-primary)] md:text-6xl'>
							{temperature}°C
						</span>
						<span className='font-mono text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]'>
							{weather.weather[0].main}
						</span>
					</div>
				</div>
				<WeatherLineGlyph iconName={icon} />
			</div>

			<dl className='grid grid-cols-2 gap-3 border-t border-[var(--border-subtle)] pt-4 sm:grid-cols-4'>
				<div className='rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-2'>
					<dt className='font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]'>
						{labels.wind || 'Viento'}
					</dt>
					<dd className='mt-0.5 font-mono tabular-nums text-xs font-semibold text-[var(--text-primary)]'>
						{windSpeed} km/h
					</dd>
				</div>

				<div className='rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-2'>
					<dt className='font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]'>
						{labels.humidity || 'Humedad'}
					</dt>
					<dd className='mt-0.5 font-mono tabular-nums text-xs font-semibold text-[var(--text-primary)]'>
						{weather.main.humidity}%
					</dd>
				</div>

				<div className='rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-2'>
					<dt className='font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]'>
						{labels.visibility || 'Visibilidad'}
					</dt>
					<dd className='mt-0.5 font-mono tabular-nums text-xs font-semibold text-[var(--text-primary)]'>
						{visibility} km
					</dd>
				</div>

				<div className='rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-2'>
					<dt className='font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]'>
						{labels.min || 'Mín'} / {labels.max || 'Máx'}
					</dt>
					<dd className='mt-0.5 font-mono tabular-nums text-xs font-semibold text-[var(--text-primary)]'>
						{tempMin}° / {tempMax}°
					</dd>
				</div>
			</dl>
		</div>
	)
}

export default CurrentWeather
