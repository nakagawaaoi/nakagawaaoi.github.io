import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { NewsSection } from '../components/sections/NewsSection';

export const HomePage = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50 z-0">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-100/20 blur-3xl rounded-full transform translate-x-1/4 -translate-y-1/4"></div>
                    <div className="absolute bottom-0 left-0 w-1/2 h-full bg-indigo-100/20 blur-3xl rounded-full transform -translate-x-1/4 translate-y-1/4"></div>
                    {/* Grid Pattern overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-primary text-sm font-bold tracking-wider mb-6 border border-blue-200">
                            NIIGATA UNIVERSITY ENGINEERING
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
                            未来を創る、<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">工学の力。</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                            新潟大学工学部は、革新的な技術と創造性で<br className="hidden md:block" />
                            地球規模の課題解決に挑戦する人材を育成します。
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button className="group bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-[#00447a] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3">
                                学部について知る
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="group bg-white text-slate-700 px-8 py-4 rounded-full font-bold border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow-md flex items-center gap-3">
                                オープンキャンパス
                            </button>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-400">
                    <ChevronDown size={32} />
                </div>
            </section>

            {/* Features / Quick Access */}
            <section className="py-24 bg-white relative z-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-32">
                        {[
                            { title: "受験生の方へ", desc: "入試情報・オープンキャンパス", icon: "🎓", color: "bg-blue-600" },
                            { title: "在学生の方へ", desc: "教務情報・学生生活サポート", icon: "🏫", color: "bg-indigo-600" },
                            { title: "企業・一般の方へ", desc: "共同研究・公開講座", icon: "🤝", color: "bg-slate-800" },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer group"
                            >
                                <div className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                                <p className="text-slate-500 font-medium">{item.desc}</p>
                                <div className="mt-6 flex items-center text-primary font-bold text-sm">
                                    詳しく見る <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* News Section */}
            <NewsSection />
        </>
    );
};
