import EmailTemplate from '@/components/contact/EmailComponent'
import { render } from '@react-email/render'
import { AUTH_TOKEN } from 'astro:env/client'
import { sileo, Toaster } from 'sileo'
import React, { useRef, useState } from 'react'
import { getI18N } from '@/i18n'

interface ContactFormProps {
	currentLocale?: string
}

interface FieldErrors {
	name?: string
	email?: string
	subject?: string
	message?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function ContactForm({ currentLocale }: ContactFormProps) {
	const formRef = useRef<HTMLFormElement>(null)
	const i18n = getI18N({ currentLocale })
	const tForm = i18n.landing.contact.form.contactForm

	const [errors, setErrors] = useState<FieldErrors>({})
	const [touched, setTouched] = useState<Record<string, boolean>>({})
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

	const validateField = (field: keyof FieldErrors, value: string): string | undefined => {
		const trimmed = value.trim()
		if (field === 'name') {
			if (trimmed.length < 2) {
				return tForm.errors?.name || 'Por favor ingresa tu nombre (mínimo 2 caracteres).'
			}
		}
		if (field === 'email') {
			if (!EMAIL_REGEX.test(trimmed)) {
				return tForm.errors?.email || 'Ingresa un correo electrónico válido.'
			}
		}
		if (field === 'subject') {
			if (trimmed.length < 3) {
				return tForm.errors?.subject || 'Indica un asunto breve (mínimo 3 caracteres).'
			}
		}
		if (field === 'message') {
			if (trimmed.length < 10) {
				return tForm.errors?.message || 'Escribe un mensaje con al menos 10 caracteres.'
			}
		}
		return undefined
	}

	const handleBlur = (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const field = e.target.name as keyof FieldErrors
		const value = e.target.value
		setTouched((prev) => ({ ...prev, [field]: true }))
		const err = validateField(field, value)
		setErrors((prev) => ({ ...prev, [field]: err }))
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const field = e.target.name as keyof FieldErrors
		const value = e.target.value
		if (touched[field]) {
			const err = validateField(field, value)
			setErrors((prev) => ({ ...prev, [field]: err }))
		}
		if (submitStatus === 'success' || submitStatus === 'error') {
			setSubmitStatus('idle')
		}
	}

	const handleReset = () => {
		setErrors({})
		setTouched({})
		setSubmitStatus('idle')
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Prevent double submission
		if (submitStatus === 'loading') return

		const formData = new FormData(e.currentTarget)
		const rawName = String(formData.get('name') || '')
		const rawEmail = String(formData.get('email') || '')
		const rawSubject = String(formData.get('subject') || '')
		const rawMessage = String(formData.get('message') || '')

		const newErrors: FieldErrors = {
			name: validateField('name', rawName),
			email: validateField('email', rawEmail),
			subject: validateField('subject', rawSubject),
			message: validateField('message', rawMessage),
		}

		setTouched({ name: true, email: true, subject: true, message: true })
		setErrors(newErrors)

		if (newErrors.name || newErrors.email || newErrors.subject || newErrors.message) {
			const firstInvalid = (['name', 'email', 'subject', 'message'] as const).find(
				(k) => Boolean(newErrors[k])
			)
			if (firstInvalid && formRef.current) {
				const el = formRef.current.elements.namedItem(firstInvalid) as HTMLElement | null
				el?.focus()
			}
			return
		}

		setSubmitStatus('loading')

		try {
			const finalHTML = await render(
				<EmailTemplate
					userFirstname={rawName.trim()}
					message={rawMessage.trim()}
					email={rawEmail.trim()}
				/>,
				{
					pretty: true,
				}
			)

			const finalText = await render(
				<EmailTemplate
					userFirstname={rawName.trim()}
					message={rawMessage.trim()}
					email={rawEmail.trim()}
				/>,
				{
					plainText: true,
				}
			)

			const promise = fetch('/api/sendEmail.json', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${AUTH_TOKEN}`,
				},
				body: JSON.stringify({
					from: 'hi@fabianh.me',
					to: 'ctofabian@gmail.com',
					subject: rawSubject.trim(),
					html: finalHTML,
					text: finalText,
				}),
			}).then((res) => {
				if (!res.ok) {
					throw new Error('Network response was not ok')
				}
				return res.json()
			})

			const promiseWithReset = promise.then((data) => {
				if (formRef.current) {
					formRef.current.reset()
				}
				setErrors({})
				setTouched({})
				setSubmitStatus('success')
				return data
			})

			sileo.promise(promiseWithReset, {
				loading: {
					fill: '#171717',
					title: tForm.sending || 'Enviando...',
				},
				success: {
					fill: '#171717',
					title: tForm.status?.successTitle || 'Correo enviado exitosamente',
					description: (
						<span className='font-accent'>
							{tForm.status?.successBody ||
								'He recibido tu mensaje y te responderé lo antes posible.'}
						</span>
					),
				},
				error: {
					fill: '#171717',
					title: tForm.status?.errorTitle || 'Error al enviar el correo',
					description: (
						<span className='font-accent'>
							{tForm.status?.errorBody ||
								'Ocurrió un problema al enviar tu mensaje. Intenta más tarde o escríbeme a ctofabian@gmail.com.'}
						</span>
					),
				},
			})

			await promiseWithReset
		} catch {
			setSubmitStatus('error')
		}
	}

	const isSubmitting = submitStatus === 'loading'

	return (
		<>
			<Toaster position='top-center' />
			<form
				onSubmit={handleSubmit}
				onReset={handleReset}
				ref={formRef}
				noValidate
				className='space-y-5'
				aria-busy={isSubmitting}
			>
				<div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
					{/* Nombre */}
					<div>
						<label
							htmlFor='name'
							className='mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]'
						>
							{tForm.name} <span className='text-[var(--accent)]' aria-hidden='true'>*</span>
						</label>
						<input
							id='name'
							name='name'
							type='text'
							autoComplete='name'
							required
							disabled={isSubmitting}
							onBlur={handleBlur}
							onChange={handleChange}
							aria-invalid={Boolean(errors.name)}
							aria-describedby={errors.name ? 'name-error' : undefined}
							placeholder='Fabian Herrera'
							className={`flex h-11 w-full rounded-lg border px-3.5 py-2 text-sm text-[var(--text-primary)] transition-colors placeholder:text-[var(--text-muted)]/60 disabled:cursor-not-allowed disabled:opacity-60 ${
								errors.name
									? 'border-[var(--status-error)] bg-[var(--status-error-soft)]'
									: 'border-[var(--border-default)] bg-[var(--bg-base)] hover:border-[var(--border-strong)]'
							}`}
						/>
						{errors.name && (
							<p
								id='name-error'
								role='alert'
								className='mt-1.5 font-mono text-xs text-[var(--status-error)]'
							>
								{errors.name}
							</p>
						)}
					</div>

					{/* Correo electrónico */}
					<div>
						<label
							htmlFor='email'
							className='mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]'
						>
							{tForm.email} <span className='text-[var(--accent)]' aria-hidden='true'>*</span>
						</label>
						<input
							id='email'
							name='email'
							type='email'
							autoComplete='email'
							required
							disabled={isSubmitting}
							onBlur={handleBlur}
							onChange={handleChange}
							aria-invalid={Boolean(errors.email)}
							aria-describedby={errors.email ? 'email-error' : undefined}
							placeholder='nombre@empresa.com'
							className={`flex h-11 w-full rounded-lg border px-3.5 py-2 text-sm text-[var(--text-primary)] transition-colors placeholder:text-[var(--text-muted)]/60 disabled:cursor-not-allowed disabled:opacity-60 ${
								errors.email
									? 'border-[var(--status-error)] bg-[var(--status-error-soft)]'
									: 'border-[var(--border-default)] bg-[var(--bg-base)] hover:border-[var(--border-strong)]'
							}`}
						/>
						{errors.email && (
							<p
								id='email-error'
								role='alert'
								className='mt-1.5 font-mono text-xs text-[var(--status-error)]'
							>
								{errors.email}
							</p>
						)}
					</div>
				</div>

				{/* Asunto */}
				<div>
					<label
						htmlFor='subject'
						className='mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]'
					>
						{tForm.subject} <span className='text-[var(--accent)]' aria-hidden='true'>*</span>
					</label>
					<input
						id='subject'
						name='subject'
						type='text'
						required
						disabled={isSubmitting}
						onBlur={handleBlur}
						onChange={handleChange}
						aria-invalid={Boolean(errors.subject)}
						aria-describedby={errors.subject ? 'subject-error' : undefined}
						placeholder='Proyecto web / Oportunidad laboral'
						className={`flex h-11 w-full rounded-lg border px-3.5 py-2 text-sm text-[var(--text-primary)] transition-colors placeholder:text-[var(--text-muted)]/60 disabled:cursor-not-allowed disabled:opacity-60 ${
							errors.subject
								? 'border-[var(--status-error)] bg-[var(--status-error-soft)]'
								: 'border-[var(--border-default)] bg-[var(--bg-base)] hover:border-[var(--border-strong)]'
						}`}
					/>
					{errors.subject && (
						<p
							id='subject-error'
							role='alert'
							className='mt-1.5 font-mono text-xs text-[var(--status-error)]'
						>
							{errors.subject}
						</p>
					)}
				</div>

				{/* Mensaje */}
				<div>
					<label
						htmlFor='message'
						className='mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]'
					>
						{tForm.message} <span className='text-[var(--accent)]' aria-hidden='true'>*</span>
					</label>
					<textarea
						id='message'
						name='message'
						rows={5}
						required
						disabled={isSubmitting}
						onBlur={handleBlur}
						onChange={handleChange}
						aria-invalid={Boolean(errors.message)}
						aria-describedby={errors.message ? 'message-error' : undefined}
						placeholder='Cuéntame sobre los objetivos, alcance y fechas estimadas...'
						className={`flex w-full rounded-lg border px-3.5 py-2.5 text-sm text-[var(--text-primary)] transition-colors placeholder:text-[var(--text-muted)]/60 disabled:cursor-not-allowed disabled:opacity-60 ${
							errors.message
								? 'border-[var(--status-error)] bg-[var(--status-error-soft)]'
								: 'border-[var(--border-default)] bg-[var(--bg-base)] hover:border-[var(--border-strong)]'
						}`}
					/>
					{errors.message && (
						<p
							id='message-error'
							role='alert'
							className='mt-1.5 font-mono text-xs text-[var(--status-error)]'
						>
							{errors.message}
						</p>
					)}
				</div>

				{/* Accessible Inline Status Banner */}
				{submitStatus === 'success' && (
					<div
						role='status'
						aria-live='polite'
						className='rounded-lg border border-[var(--status-online)] bg-[var(--status-online-soft)] p-3.5 text-xs text-[var(--text-primary)]'
					>
						<p className='font-semibold'>
							{tForm.status?.successTitle || 'Mensaje enviado correctamente'}
						</p>
						<p className='mt-0.5 text-[var(--text-secondary)]'>
							{tForm.status?.successBody}
						</p>
					</div>
				)}

				{submitStatus === 'error' && (
					<div
						role='alert'
						aria-live='assertive'
						className='rounded-lg border border-[var(--status-error)] bg-[var(--status-error-soft)] p-3.5 text-xs text-[var(--text-primary)]'
					>
						<p className='font-semibold'>
							{tForm.status?.errorTitle || 'No se pudo enviar el mensaje'}
						</p>
						<p className='mt-0.5 text-[var(--text-secondary)]'>
							{tForm.status?.errorBody}
						</p>
					</div>
				)}

				{/* Actions */}
				<div className='flex flex-col gap-3 pt-1 sm:flex-row sm:items-center'>
					<button
						type='submit'
						id='submit'
						disabled={isSubmitting}
						className='inline-flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-6 text-sm font-semibold text-[var(--accent-foreground)] transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60'
					>
						<span>{isSubmitting ? tForm.sending || 'Enviando...' : tForm.submit}</span>
						{!isSubmitting && (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='size-4'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='1.75'
								strokeLinecap='round'
								strokeLinejoin='round'
								aria-hidden='true'
							>
								<path d='M5 12h14' />
								<path d='m12 5 7 7-7 7' />
							</svg>
						)}
					</button>

					<button
						type='reset'
						disabled={isSubmitting}
						className='inline-flex h-11 cursor-pointer items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] px-5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-60'
					>
						{tForm.delete}
					</button>
				</div>
			</form>
		</>
	)
}

export default ContactForm
