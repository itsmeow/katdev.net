import MainPageContents from './MainPage'
import { Metadata } from 'next'

const IndexPage = () => {
    return (
        <main>
            <MainPageContents />
        </main>
    )
}

export const metadata: Metadata = {
    title: 'katdev.net',
    keywords: [
        `developer`,
        `software`,
        `technology`,
        `kat`,
        `Kat S`,
        `katdev`,
        `dev`,
    ],
}

export default IndexPage
