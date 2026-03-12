import { Textarea } from '@/components/ui/textarea'
import EmailTemplate from '@/components/contact/EmailComponent'
import { render } from '@react-email/render'
import { AUTH_TOKEN } from 'astro:env/client'
import { toast, Toaster } from 'sonner'
import { useRef } from 'react'

function ContactForm() {
	const formRef = useRef<HTMLFormElement>(null)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
		const { name, email, subject, message } = Object.fromEntries(formData.entries())

		const finalHTML = await render(
			<EmailTemplate
				userFirstname={name as string}
				message={message as string}
				email={email as string}
			/>,
			{
				pretty: true,
			}
		)

		const finalText = await render(
			<EmailTemplate
				userFirstname={name as string}
				message={message as string}
				email={email as string}
			/>,
			{
				plainText: true,
			}
		)

		const promise = await fetch('/api/sendEmail.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${AUTH_TOKEN}`,
			},
			body: JSON.stringify({
				from: 'hi@fabianh.me',
				to: 'ctofabian@gmail.com',
				subject: subject,
				html: finalHTML,
				text: finalText,
			}),
		}).then((res) => {
			if (!res.ok) {
				throw new Error('Network response was not ok')
			}
			return res.json()
		})

		toast.promise(promise, {
			loading: 'Enviando...',
			success: (data) => {
				// Reiniciar el formulario
				if (formRef.current) {
					formRef.current.reset()
				}
				return 'Correo enviado exitosamente'
			},
			error: 'Error al enviar el correo',
		})
	}

	return (
		<>
			<Toaster />
			<form onSubmit={handleSubmit} ref={formRef}>
				<div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
					<div>
						<label htmlFor='name' className='mb-2 block font-display font-medium'>
							{' '}
							Nombre{' '}
						</label>
						<input
							id='name'
							placeholder='John Doe'
							className='flex h-9 w-full rounded-md border border-input bg-transparent bg-white px-3 py-1 font-accent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
							required
							name='name'
						/>
					</div>
					<div>
						<label htmlFor='email' className='mb-2 block font-display font-medium'>
							{' '}
							Correo{' '}
						</label>
						<input
							type='email'
							className='flex h-9 w-full rounded-md border border-input bg-transparent bg-white px-3 py-1 font-accent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
							placeholder='john.doe@email.com'
							required
							name='email'
						/>
					</div>
				</div>
				<div className='mb-4'>
					<label htmlFor='subject' className='mb-2 block font-display font-medium'>
						{' '}
						Asunto{' '}
					</label>
					<input
						id='subject'
						placeholder={null}
						className='flex h-9 w-full rounded-md border border-input bg-transparent bg-white px-3 py-1 font-accent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
						required
						name='subject'
					/>
				</div>
				<div className='mb-4'>
					<label htmlFor='message' className='mb-2 block font-display font-medium'>
						{' '}
						Mensaje{' '}
					</label>
					<Textarea
						id='message'
						placeholder='Tengo una pregunta sobre...'
						className='border-gray-300 bg-white'
						rows={4}
						required
						name='message'
					/>
				</div>
				<div className='flex flex-col justify-between gap-4 sm:flex-row'>
					<input
						type='submit'
						className='w-full cursor-pointer bg-black py-2 font-display text-white hover:bg-black/80 sm:w-60'
						id='submit'
						value='Enviar'
					/>
					<input
						type='reset'
						className='text-gray-700 w-full cursor-pointer border border-neutral-200 border-neutral-300 bg-white py-2 font-display hover:bg-neutral-100 sm:w-60'
						value='Borrar'
					/>
				</div>
			</form>
		</>
	)
}

export default ContactForm
