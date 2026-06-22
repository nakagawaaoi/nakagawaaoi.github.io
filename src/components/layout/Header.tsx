import React from 'react';
import { Menu, X, ChevronRight, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const location = useLocation();

    // Helper to determine if a link is active (simple version)
    const isActive = (path: string) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    const menuItems = [
        { label: 'ニュース', href: '/news' },
        { label: '学部紹介', href: '/#about' }, // Keeping as hash for now or /about if created
        { label: '学科・プログラム', href: '/department' },
        { label: '研究', href: '/#research' },
        { label: '入試情報', href: '/#admissions' },
        { label: 'キャンパスライフ', href: '/events' }, // Mapping to Events for now as it's relevant
    ];

    return (
        <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-white/20">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center cursor-pointer group">
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-primary tracking-tighter group-hover:opacity-80 transition-opacity">
                                新潟大学 <span className="text-slate-600 font-normal text-lg ml-2">工学部</span>
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase mt-0.5">
                                Niigata University Faculty of Engineering
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden xl:flex items-center gap-8">
                        {menuItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.href}
                                className={`font-medium text-sm transition-all relative group py-2 ${isActive(item.href) ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}
                            >
                                {item.label}
                                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-transform origin-left duration-300 ${isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                            </Link>
                        ))}

                        <div className="h-6 w-px bg-slate-200 mx-2"></div>

                        <button className="text-slate-500 hover:text-primary transition-colors">
                            <Search size={20} />
                        </button>

                        <a href="#contact" className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#00447a] transition-all shadow-md hover:shadow-lg flex items-center gap-2 group">
                            お問い合わせ
                            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="xl:hidden p-2 text-slate-600 hover:text-primary transition-colors bg-slate-50 rounded-md"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="xl:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 absolute w-full shadow-xl h-[calc(100vh-80px)] overflow-y-auto">
                    <div className="flex flex-col p-6 space-y-6">
                        {menuItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.href}
                                className="text-slate-700 hover:text-primary font-bold text-xl flex justify-between items-center group"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                                <ChevronRight size={20} className="text-slate-300 group-hover:text-primary transition-colors" />
                            </Link>
                        ))}
                        <div className="pt-6 border-t border-slate-100">
                            <button className="bg-primary text-white px-6 py-4 rounded-xl font-bold hover:bg-[#00447a] transition-colors w-full flex justify-center items-center gap-2 shadow-lg">
                                お問い合わせ
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
