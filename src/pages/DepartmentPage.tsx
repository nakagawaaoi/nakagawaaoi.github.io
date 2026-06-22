
export const DepartmentPage = () => {
    return (
        <div className="container mx-auto px-4 py-20">
            <h1 className="text-4xl font-bold text-slate-900 mb-8">学科・プログラム</h1>
            <p className="text-lg text-slate-600 mb-8">
                新潟大学工学部には、多様な工学分野を網羅する学科とプログラムがあります。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Placeholder for departments */}
                {['機械システム工学', '社会基盤工学', '電子情報通信', '知能情報システム', '化学システム', '材料科学', '人間支援感性科学'].map((dept) => (
                    <div key={dept} className="p-6 border border-slate-200 rounded-xl hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-bold text-primary mb-2">{dept}プログラム</h3>
                        <p className="text-slate-500 text-sm">Create the future with {dept}.</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
