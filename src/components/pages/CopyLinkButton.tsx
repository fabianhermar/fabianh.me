import React, { useState } from 'react'

export default function CopyLinkButton() {
	const [copied, setCopied] = useState(false)

	const handleCopy = async () => {
		try {
			if (typeof window !== 'undefined' && navigator.clipboard) {
				await navigator.clipboard.writeText(window.location.href)
				setCopied(true)
				setTimeout(() => setCopied(false), 2500)
			}
		} catch (err) {
			console.error('Error copying link to clipboard:', err)
		}
	}

	return (
		<div className='relative inline-flex items-center'>
			<button
				type='button'
				onClick={handleCopy}
				aria-label={copied ? 'Enlace copiado al portapapeles' : 'Copiar enlace de este artículo'}
				className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-medium transition-all duration-200 select-none ${
					copied
						? 'border-[var(--status-online)] bg-[var(--status-online)]/10 text-[var(--status-online)]'
						: 'border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]'
				}`}
			>
				{copied ? (
					<>
						<svg
							className='size-3.5 text-[var(--status-online)]'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth='2.25'
							aria-hidden='true'
						>
							<path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
						</svg>
						<span className='font-mono font-medium'>¡Enlace copiado!</span>
					</>
				) : (
					<>
						<svg
							className='size-3.5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth='1.75'
							aria-hidden='true'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
							/>
						</svg>
						<span>Copiar enlace</span>
					</>
				)}
			</button>

			{/* Floating toast notification */}
			{copied && (
				<div
					role='status'
					aria-live='polite'
					className='surface-card fixed bottom-6 left-6 z-50 flex items-center gap-3 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-3 shadow-xl backdrop-blur-md'
				>
					<span className='flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--status-online)]/15 text-[var(--status-online)]'>
						<svg
							className='size-3.5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth='2.5'
							aria-hidden='true'
						>
							<path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
						</svg>
					</span>
					<div className='flex flex-col text-left'>
						<p className='font-heading text-xs font-semibold text-[var(--text-primary)]'>
							Enlace copiado exitosamente
						</p>
						<p className='text-[11px] text-[var(--text-secondary)]'>
							El enlace del artículo ha sido copiado al portapapeles.
						</p>
					</div>
				</div>
			)}
		</div>
	)
}
