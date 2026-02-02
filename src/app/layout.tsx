import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
    metadataBase: new URL('https://katdev.net'),
    title: {
        template: '%s @ katdev.net',
        default: 'katdev.net',
    },
    description: 'Kat S - Socials & Poetry',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="manifest" href="/manifest.webmanifest" />
            </head>
            <body>{children}</body>
        </html>
    )
}
