import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NewsDetailPage = () => {
    const { id } = useParams();

    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <Link to="/news" className="inline-flex items-center text-slate-500 hover:text-primary mb-8 font-medium">
                <ArrowLeft size={20} className="mr-2" /> ニュース一覧に戻る
            </Link>
            <article className="prose prose-lg max-w-none">
                <span className="text-sm font-medium text-slate-400 block mb-2">2024.10.XX</span>
                <h1 className="text-4xl font-bold text-slate-900 mb-6">ニュース記事タイトル (ID: {id})</h1>
                <div className="bg-slate-50 p-8 rounded-2xl mb-8 text-slate-600">
                    <p className="mb-4">
                        ここにニュースの詳細記事が入ります。ID-{id}の記事です。
                        実際の運用ではCMSなどから記事データを取得して表示することになります。
                    </p>
                    <p>
                        新潟大学工学部は、これからも地域とともに発展し、世界に貢献する教育・研究を推進してまいります。
                    </p>
                </div>
            </article>
        </div>
    );
};
