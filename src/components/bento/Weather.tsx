import React, { useEffect, useState } from 'react'
import type { WeatherData } from '@/types/weather'
import { getWeatherIcon } from '@/api/getWeatherIcon.ts'
import { Eye } from '@/components/icons/eye'

const CurrentWeather: React.FC = () => {
	const [location, setLocation] = useState<string | null>(null)
	const [weather, setWeather] = useState<WeatherData | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/fetchWeather.json')
				const data = await response.json()
				const { city, weather } = data
				setLocation(city)
				setWeather(weather)
			} catch (error) {
				console.error('Failed to fetch weather data', error)
			}
		}
		fetchData()
	}, [])

	if (!weather || !location) return <p className='text-white'>Loading...</p>

	const currentTime = new Date().getHours()
	const icon = getWeatherIcon(weather, currentTime)
	const windSpeed = (weather.wind.speed * 3.6).toFixed(1)
	const temperature = weather.main.temp.toFixed(0)
	const visibility = (weather.visibility / 1000).toFixed(1)

	return (
		<div className='mb-4 md:mb-0'>
			<h2 className='mt-4 pl-4 font-heading text-2xl text-white/90 md:pl-0'>{location}</h2>
			<div className='flex flex-col items-center justify-center pb-4'>
				<img
					src={`/weather/${icon}`}
					alt={weather.weather[0].main}
					className='size-32 select-none'
				/>
				<p className='font-display text-lg text-white'>{weather.weather[0].main}</p>
			</div>
			<div className='flex flex-row items-center justify-between px-4 md:px-0'>
				<p className='flex items-center gap-2 font-display text-sm text-white md:text-lg'>
					<Eye className='size-4 md:size-5' />
					{visibility} KM
				</p>
				<div className='flex flex-row items-center gap-x-2 md:gap-x-4'>
					<p className='flex items-center gap-1 font-display text-sm text-white md:text-lg'>
						<img src='/weather/wind.svg' alt='Wind' className='size-8 select-none md:size-12' />
						{windSpeed} km/h
					</p>
					<p className='flex items-center font-display text-sm text-white md:text-lg'>
						<img src='/weather/humidity.svg' alt='Wind' className='size-8 select-none md:size-12' />
						{weather.main.humidity}%
					</p>
				</div>
			</div>
			<div className='flex flex-row items-center justify-between px-4 md:px-0'>
				<p className='flex items-center font-display text-sm text-white md:text-lg'>
					<img
						src='/weather/thermometer-glass.svg'
						alt='Thermometer'
						className='size-8 select-none md:size-12'
					/>
					{temperature}°C
				</p>
				<div className='flex flex-row items-center justify-end gap-x-2'>
					<p className='flex items-center font-display text-sm text-white md:text-lg'>
						<img
							src='/weather/thermometer-colder.svg'
							alt='Thermometer Colder'
							className='size-8 select-none md:size-12'
						/>
						{weather.main.temp_min.toFixed(0)}°C
					</p>
					<p className='flex items-center font-display text-sm text-white md:text-lg'>
						<img
							src='/weather/thermometer-warmer.svg'
							alt='Thermometer Warmer'
							className='size-8 select-none md:size-12'
						/>
						{weather.main.temp_max.toFixed(0)}°C
					</p>
				</div>
			</div>
		</div>
	)
}

export default CurrentWeather
