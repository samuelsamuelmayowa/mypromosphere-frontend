import { Link } from 'react-router-dom'
import SideNav from './components/sideNav'
import Footer from './components/Footer'
import notFound from "./assets/images/404.png"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const Error = () => {
    return (
        <>
            <div className='flex'>
                <div>
                    <SideNav />
                </div>
                <div className="flex-1 min-h-screen grid place-items-center bg-transparent">
                    <div className='text-center'>
                        <LazyLoadImage effect='opacity' src={notFound} alt="not found" className='w-[200px]' />
                        <h1 className="md:text-2xl font-semibold">Page Not Found</h1>
                        <p><Link to="/" className="underline text-purple">Go to Home</Link></p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Error