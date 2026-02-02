import Navbar from '../../components/nav/NavBar'
import Footer from '../../components/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div>
                <Navbar />
                <div id="page-blog" className="main-wrapper">
                    {children}
                </div>
            </div>
            <div id="page-footer-blog">
                <Footer />
            </div>
        </>
    )
}
