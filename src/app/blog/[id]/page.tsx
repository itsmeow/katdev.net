import path from 'path'
import {
    getPageGrayMatterData,
    GrayMatterData,
    generateStaticParamsForDirectory,
} from '../../../util/posts'
import { notFound } from 'next/navigation'
import ClientOnly from '../../../components/ClientOnly'
import BackgroundSpace from '../../../components/BackgroundSpace'
import { format } from 'date-fns'
import { Metadata } from 'next'

const blogsDirectory = path.join(process.cwd(), 'src/data/blogs/')

export async function generateStaticParams() {
    return generateStaticParamsForDirectory(blogsDirectory)
}

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>
}): Promise<Metadata> {
    const id = (await params).id

    const data: GrayMatterData | undefined = await getPageGrayMatterData(
        blogsDirectory,
        `${id}.md`
    )
    // Render 404 if set to ignore
    if (!data || data.meta.ignore) {
        return notFound()
    }

    return {
        title: data.meta.title,
        description: data.meta.description,
        openGraph: {
            title: data.meta.title,
            description: data.meta.description,
        },
        twitter: {
            card: 'summary',
            title: data.meta.title,
            description: data.meta.description,
        },
        keywords: data.meta.keywords,
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const data: GrayMatterData | undefined = await getPageGrayMatterData(
        blogsDirectory,
        `${id}.md`
    )
    // Render 404 if set to ignore
    if (!data || data.meta.ignore) {
        return notFound()
    }
    const formattedDate = format(data.meta.dateParsed, 'PPPP')
    return (
        <main>
            <ClientOnly>
                <BackgroundSpace />
            </ClientOnly>
            <article id="blog-content-wrapper">
                <div id="blog-top">
                    <div id="blog-info">
                        <h1 id="blog-title">{data.meta.header}</h1>
                        <div id="blog-meta">
                            {formattedDate} - {data.wordCount} words
                        </div>
                    </div>
                </div>
                <hr />
                <div
                    className={[data.meta.mono ? 'mono' : null]
                        .filter((c) => c !== null)
                        .join(' ')}
                    id="blog-text"
                    dangerouslySetInnerHTML={{ __html: data.remarkHTML }}
                />
                <div id="blog-end">Written by Kat. Thank you for reading.</div>
            </article>
        </main>
    )
}
