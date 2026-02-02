import path from 'path'
import { getAllGrayMatterData, GrayMatterData } from '../../util/posts'
import BlogListing from '../../components/BlogListing'

const poemsDirectory = path.join(process.cwd(), 'src/data/poems/')

const PoemsPage = async () => {
    const data: GrayMatterData[] = await getAllGrayMatterData(poemsDirectory)
    return (
        <div id="page-poems">
            <main>
                <h2 className="page-header" style={{ textAlign: 'center' }}>
                    Poems by Kat
                </h2>
                <hr style={{ margin: '1rem auto' }} />
                <section id="poems">
                    {data.map((article) => (
                        <BlogListing key={article.id} data={article} poem />
                    ))}
                </section>
            </main>
        </div>
    )
}

export default PoemsPage
