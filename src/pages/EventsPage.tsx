
export const EventsPage = () => {
    return (
        <div className="container mx-auto px-4 py-20">
            <h1 className="text-4xl font-bold text-slate-900 mb-8">イベント情報</h1>
            <div className="grid gap-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="w-full md:w-64 h-40 bg-slate-100 rounded-xl flex items-center justify-center text-4xl">📅</div>
                        <div className="flex-1">
                            <div className="text-primary font-bold mb-2">2024.08.0{i} (土)</div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">オープンキャンパス2024 夏</h3>
                            <p className="text-slate-600">
                                工学部の最先端研究を体験できるチャンス！高校生のみなさんのご参加をお待ちしています。
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
