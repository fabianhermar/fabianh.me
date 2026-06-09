import { sileo, Toaster } from 'sileo'

export default function CopyLinkButton() {
    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href)
        sileo.success({
            title: "Enlace copiado exitosamente",
            description: "El enlace de esta página ha sido copiado al portapapeles.",
            position: 'bottom-left',
            fill: "#171717",
            styles: {
                description: "text-white/75!",
            }
        })
    }

    return (
        <>
            <Toaster position="bottom-left" />
            <button
                onClick={handleCopy}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-neutral-100 px-5 py-2.5 font-accent text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-200"
            >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Copiar Enlace
            </button>
        </>
    )
}
