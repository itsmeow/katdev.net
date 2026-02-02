import path from 'path'
import { getAllGrayMatterData, GrayMatterData } from '../../util/posts'
import BlogListing from '../../components/BlogListing'
import Navbar from '../../components/nav/NavBar'
import Footer from '../../components/Footer'

const blogsDirectory = path.join(process.cwd(), 'src/data/blogs/')

const PoemsPage = async () => {
    const data: GrayMatterData[] = await getAllGrayMatterData(blogsDirectory)
    return (
        <>
            <div>
                <Navbar />
                <div id="page-blog" className="main-wrapper">
                    <main>
                        <h2
                            className="page-header"
                            style={{ textAlign: 'center' }}
                        >
                            Blogs by Kat
                        </h2>
                        <hr style={{ margin: '1rem auto' }} />
                        <section id="blogs">
                            {data.map((article) => (
                                <BlogListing key={article.id} data={article} />
                            ))}
                        </section>
                    </main>
                </div>
            </div>
            <div id="page-footer-blog">
                <Footer />
            </div>
        </>
    )
}

export default PoemsPage
