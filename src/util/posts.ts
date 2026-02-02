import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import strip from 'strip-markdown'
import html from 'remark-html'

export interface GrayMatterData {
    id: string
    meta: {
        title: string
        header: string
        description: string
        date: string
        dateParsed: number
        ignore: boolean
        mono: boolean
        format_poem: boolean
        toc: boolean
        keywords: Array<string>
    }
    wordCount: number
    remarkHTML: string
    content: string
    excerpt?: string
}

export async function generateStaticParamsForDirectory(
    directory: string
): Promise<{ id: string }[]> {
    const validFileNames: string[] = await new Promise((resolve, reject) => {
        fs.readdir(directory, {}, (err, data) => {
            if (err) {
                console.error(
                    `Error while making static pages, could not read directory contents of ${directory}!`
                )
                reject(err)
            }
            resolve(
                data
                    .filter((fileName) => typeof fileName === 'string')
                    .filter((fileName) => fileName.endsWith('.md'))
                    .filter((fileName) => {
                        if (
                            !fileName.match(
                                /^[A-Za-z][A-Za-z0-9-]*[A-Za-z0-9]\.md$/
                            )
                        ) {
                            reject(
                                new Error(
                                    `Found invalid markdown filename '${fileName}' in ${directory}! Filenames must be alphanumeric or dashes, and may not start with a number or start or end with a dash.`
                                )
                            )
                            return false
                        }
                        return true
                    })
            )
        })
    })
    const shouldGenerateFileName: boolean[] = await Promise.all(
        validFileNames.map((fileName) =>
            getPageGrayMatterData(directory, fileName).then(
                (data) => !data?.meta.ignore
            )
        )
    )
    return validFileNames
        .filter((_, idx) => shouldGenerateFileName[idx])
        .map((fileName) => {
            return { id: fileName.replace(/\.md$/i, '') }
        })
}

async function getExcerpt(rawContent: string): Promise<string> {
    // Remove headings so we can get the first real paragraph
    const linesStripped = rawContent
        .split('\n')
        .filter((line) => !line.startsWith('#'))
        .join('\n')
    if (!linesStripped.length) {
        return ''
    }
    const text = (await remark().use(strip).process(linesStripped)).toString()
    return text.length > 150 ? `${text.substring(0, 150)}...` : text
}

async function readFileAsync(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, contents) => {
            if (err) {
                reject(err)
            }
            resolve(contents)
        })
    })
}

export async function getPageGrayMatterData(
    directory: string,
    fileName: string
): Promise<GrayMatterData | undefined> {
    const id = fileName.replace(/\.md$/i, '')
    const fullPath = path.join(directory, fileName)
    const exists = await new Promise((resolve) => {
        try {
            fs.stat(fullPath, (err) => {
                if (err) {
                    resolve(false)
                }
                resolve(true)
            })
        } catch {
            resolve(false)
        }
    })
    if (!exists) {
        return undefined
    }
    const fileContents = await readFileAsync(fullPath)
    const {
        data: {
            title,
            header,
            description,
            date,
            ignore,
            toc,
            format_poem,
            mono,
            keywords,
        },
        content,
    } = matter(fileContents)
    if (typeof title !== 'string') {
        throw new Error(
            `Markdown metadata for file ${fileName} is incorrect! There is no 'title' field!`
        )
    }
    if (typeof header !== 'string') {
        throw new Error(
            `Markdown metadata for file ${fileName} is incorrect! There is no 'header' field!`
        )
    }
    if (typeof date !== 'string') {
        throw new Error(
            `Markdown metadata for file ${fileName} is incorrect! There is no 'date' field!`
        )
    }
    if (typeof description !== 'string') {
        throw new Error(
            `Markdown metadata for file ${fileName} is incorrect! There is no 'description' field!`
        )
    }
    if (typeof ignore !== 'boolean' && typeof ignore !== 'undefined') {
        throw new Error(
            `Markdown metadata for file ${fileName} is incorrect! 'ignore' field is not a boolean or undefined!`
        )
    }
    if (typeof toc !== 'boolean') {
        throw new Error(
            `Markdown metadata for file ${fileName} is incorrect! 'toc' field is not a boolean or undefined!`
        )
    }
    if (typeof keywords !== 'string') {
        throw new Error(
            `Markdown metadata for file ${fileName} is incorrect! 'keywords' field is not a string!`
        )
    }

    if (
        typeof format_poem !== 'boolean' &&
        typeof format_poem !== 'undefined'
    ) {
        throw new Error(
            `Markdown metadata for file ${fileName} is incorrect! 'format_poem' field is not a boolean or undefined!`
        )
    }
    if (typeof mono !== 'boolean' && typeof mono !== 'undefined') {
        throw new Error(
            `Markdown metadata for file ${fileName} is incorrect! 'mono' field is not a boolean or undefined!`
        )
    }
    let parsedDate: number | null = null
    if (date.match(/\d{4}-\d{2}-\d{2}/)) {
        // use midday Chicago time so that dates don't unexpectedly shift around the midnight mark due to time zones.
        parsedDate = Date.parse(`${date}T12:00:00.000-06:00`)
    }

    if (Number.isNaN(parsedDate) || !parsedDate) {
        throw new Error(
            `Markdown metadata for file ${fileName} is incorrect! Dates must follow the format YYYY-MM-DD, but the date is: '${date}'`
        )
    }

    const remarkHTML = (
        await remark()
            .use(html)
            .process(content.replaceAll('<br />', '%BREAK%'))
    )
        .toString()
        .replaceAll('</p><p>%BREAK%</p><p>', '%BREAK%')
        .replaceAll('%BREAK%', '<br />')

    const excerpt = await getExcerpt(content)

    return {
        id,
        meta: {
            title: title,
            header: header,
            description: description,
            date: date,
            dateParsed: parsedDate,
            ignore: ignore || false,
            mono: mono || false,
            format_poem: format_poem || true,
            toc: toc,
            keywords: (keywords.length > 0 ? keywords.split(', ') : []).concat(
                !fullPath.includes('src/data/poems/')
                    ? [
                          `blog`,
                          `blogs`,
                          `technology blog`,
                          `personal blog`,
                          `writing`,
                      ]
                    : [`poem`, `poetry`, `writing`, `creative writing`]
            ),
        },
        wordCount: content.split(/\s+/).length - 2, // -2 for empty whitespace on both ends
        content: content,
        remarkHTML: remarkHTML,
        excerpt: excerpt,
    }
}

export async function getAllGrayMatterData(
    directory: string
): Promise<GrayMatterData[]> {
    const fileNames = fs.readdirSync(directory)
    return Promise.all(
        fileNames.map((fileName) => getPageGrayMatterData(directory, fileName))
    ).then((data) =>
        data
            .filter((d) => d !== undefined)
            .sort((a, b) => {
                if (a.meta.dateParsed < b.meta.dateParsed) {
                    return 1
                } else {
                    return -1
                }
            })
    )
}
