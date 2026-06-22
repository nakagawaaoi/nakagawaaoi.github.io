import { Facebook, Instagram, Twitter, Linkedin, ExternalLink, MapPin, Phone, Mail } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white pt-20 pb-10" id="contact">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand & Contact */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex flex-col">
                            <span>新潟大学 工学部</span>
                            <span className="text-sm font-normal text-slate-400 mt-1">Faculty of Engineering, Niigata University</span>
                        </h2>
                        <div className="space-y-4 text-slate-400">
                            <div className="flex items-start gap-3">
                                <MapPin size={20} className="mt-1 flex-shrink-0 text-primary" />
                                <p>〒950-2181<br />新潟市西区五十嵐2の町8050番地</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={20} className="flex-shrink-0 text-primary" />
                                <p>025-262-6000 (代表)</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={20} className="flex-shrink-0 text-primary" />
                                <p>info@eng.niigata-u.ac.jp</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 border-b border-slate-700 pb-2 inline-block">クイックリンク</h3>
                        <ul className="space-y-3">
                            {[
                                { label: '学部長メッセージ', href: '#' },
                                { label: '基本理念・教育目標', href: '#' },
                                { label: '沿革・組織図', href: '#' },
                                { label: '教職員公募', href: '#' },
                                { label: '交通アクセス', href: '#' },
                                { label: 'キャンパスマップ', href: '#' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 bg-slate-600 rounded-full group-hover:bg-primary transition-colors"></span>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Academics */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 border-b border-slate-700 pb-2 inline-block">学科・プログラム</h3>
                        <ul className="space-y-3">
                            {[
                                '機械システム工学',
                                '社会基盤工学',
                                '電子情報通信',
                                '知能情報システム',
                                '化学システム工学',
                                '材料科学',
                                '建築学',
                                '人間支援感性科学',
                                '協創経営'
                            ].map((prog) => (
                                <li key={prog}>
                                    <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                                        {prog}プログラム
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Related Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 border-b border-slate-700 pb-2 inline-block">関連リンク</h3>
                        <ul className="space-y-3 mb-8">
                            <li>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                                    <ExternalLink size={14} /> 新潟大学 公式サイト
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                                    <ExternalLink size={14} /> 新潟大学大学院 自然科学研究科
                                </a>
                            </li>
                        </ul>

                        <h4 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Follow Us</h4>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="bg-slate-800 p-2 rounded-lg text-slate-400 hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Niigata University Faculty of Engineering. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a>
                        <a href="#" className="hover:text-white transition-colors">サイトポリシー</a>
                        <a href="#" className="hover:text-white transition-colors">お問い合わせ</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
