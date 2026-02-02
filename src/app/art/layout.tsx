import Navbar from '../../components/nav/NavBar'
import Footer from '../../components/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div>
                <Navbar />
                <div id="page-art" className="main-wrapper">
                    {children}
                </div>
            </div>
            <div id="page-footer-art">
                <Footer />
            </div>
        </>
    )
}
