import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const NewsPage = () => {
    const news = [
        { id: 1, title: '令和6年度オープンキャンパスの開催について', date: '2024.10.15', category: 'event' },
        { id: 2, title: '工学部卒業研究発表会のお知らせ', date: '2024.10.10', category: 'event' },
        { id: 3, title: '【受賞】大学院自然科学研究科の学生が学会賞を受賞', date: '2024.10.05', category: 'news' },
    ];
    return (
        <div className="container mx-auto px-4 py-20">
            <h1 className="text-4xl font-bold text-slate-900 mb-8">ニュース・お知らせ</h1>
            <div className="space-y-4">
                {news.map(item => (
                    <div key={item.id} className="block p-6 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center gap-4 mb-2">
                            <span className="text-sm font-medium text-slate-400">{item.date}</span>
                            <span className="text-xs font-bold px-2 py-1 rounded bg-blue-50 text-blue-600 uppercase">{item.category}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-4">{item.title}</h3>
                        <Link to={`/news/${item.id}`} className="text-primary font-bold inline-flex items-center hover:underline">
                            続きを読む <ArrowRight size={16} className="ml-1" />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
