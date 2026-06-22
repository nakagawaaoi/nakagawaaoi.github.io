import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = () => {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-primary/10 selection:text-primary">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
