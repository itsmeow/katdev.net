import BackgroundSpace from '../../../components/BackgroundSpace.jsx'
import ClientOnly from '../../../components/ClientOnly.jsx'
import type { Metadata } from 'next'

const SpacePage = () => {
    return (
        <main id="page-space">
            <ClientOnly>
                <BackgroundSpace />
            </ClientOnly>
        </main>
    )
}

export const metadata: Metadata = {
    title: 'Space Art Demo',
    description: 'Powered by WebGL!',
    openGraph: {
        title: 'Space Art Demo',
        description: 'Powered by WebGL!',
    },
    twitter: {
        card: 'summary',
        title: 'Space Art Demo',
        description: 'Powered by WebGL!',
    },
}

export default SpacePage
