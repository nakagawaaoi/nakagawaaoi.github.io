import { useState } from 'react';
import { ArrowRight, Calendar, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

type NewsCategory = 'all' | 'events' | 'admissions' | 'research';

const newsItems = [
    { id: 1, date: '2024.03.15', category: 'events', categoryLabel: 'イベント', title: '令和6年度オープンキャンパスの開催について' },
    { id: 2, date: '2024.03.10', category: 'research', categoryLabel: '研究成果', title: '工学部〇〇教授の研究グループが新しい合金素材の開発に成功しました' },
    { id: 3, date: '2024.03.01', category: 'admissions', categoryLabel: '入試情報', title: '令和7年度入学者選抜要項の公表について' },
    { id: 4, date: '2024.02.28', category: 'events', categoryLabel: 'イベント', title: '工学部卒業研究発表会のお知らせ' },
    { id: 5, date: '2024.02.20', category: 'all', categoryLabel: 'お知らせ', title: 'キャンパス内の道路工事に伴う通行規制について' },
];

export const NewsSection = () => {
    const [activeCategory, setActiveCategory] = useState<NewsCategory>('all');

    const filteredNews = activeCategory === 'all'
        ? newsItems
        : newsItems.filter(item => item.category === activeCategory);

    return (
        <section className="py-24 bg-slate-50" id="news">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">LATEST NEWS</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">お知らせ・ニュース</h2>
                    </div>
                    <a href="#" className="hidden md:flex items-center text-primary font-bold hover:underline mt-4 md:mt-0 group">
                        ニュース一覧を見る
                        <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* Categories */}
                <div className="flex gap-4 mb-10 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                    {[
                        { id: 'all', label: 'すべて' },
                        { id: 'events', label: 'イベント' },
                        { id: 'admissions', label: '入試情報' },
                        { id: 'research', label: '研究・受賞' },
                    ].map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id as NewsCategory)}
                            className={`px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${activeCategory === cat.id
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* News List */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    {filteredNews.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="group border-b border-slate-100 last:border-0 p-6 flex flex-col md:flex-row gap-4 md:items-center hover:bg-blue-50/30 transition-colors cursor-pointer"
                        >
                            <div className="flex items-center gap-4 min-w-[200px]">
                                <div className="flex items-center text-slate-400 text-sm font-medium">
                                    <Calendar size={16} className="mr-2" />
                                    {item.date}
                                </div>
                                <span className={`px-3 py-1 rounded text-xs font-bold ${item.category === 'events' ? 'bg-orange-100 text-orange-700' :
                                    item.category === 'admissions' ? 'bg-red-100 text-red-700' :
                                        item.category === 'research' ? 'bg-blue-100 text-blue-700' :
                                            'bg-slate-100 text-slate-700'
                                    }`}>
                                    {item.categoryLabel}
                                </span>
                            </div>
                            <h3 className="text-lg font-medium text-slate-800 group-hover:text-primary transition-colors flex-grow">
                                {item.title}
                            </h3>
                            <div className="hidden md:block text-slate-300 group-hover:text-primary transition-colors">
                                <ChevronRight size={24} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <a href="#" className="inline-flex items-center text-primary font-bold hover:underline">
                        ニュース一覧を見る
                        <ArrowRight size={20} className="ml-2" />
                    </a>
                </div>
            </div>
        </section>
    );
};
