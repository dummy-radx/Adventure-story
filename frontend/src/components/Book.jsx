import React, { useState, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Page from './Page';
import { storyData } from '../data/story';
import { Heart } from 'lucide-react';

const Book = () => {
    const bookRef = useRef();
    
    // history tracks the flow from beginning to current
    const [history, setHistory] = useState([
        { type: 'cover' },
        { type: 'chapter', id: 1 }
    ]);

    const handleChoice = (outcomeId) => {
        setHistory(prev => [...prev, { type: 'outcome', id: outcomeId }]);
        setTimeout(() => {
            if (bookRef.current && bookRef.current.pageFlip()) {
                bookRef.current.pageFlip().flipNext();
            }
        }, 300);
    };

    const handleContinue = (nextChapterId) => {
        setHistory(prev => [...prev, { type: nextChapterId === 'end' ? 'end' : 'chapter', id: nextChapterId }]);
        setTimeout(() => {
            if (bookRef.current && bookRef.current.pageFlip()) {
                bookRef.current.pageFlip().flipNext();
            }
        }, 300);
    };

    // We render a fixed 30 pages to prevent react-pageflip from glitching.
    const TOTAL_PAGES = 30;
    const pages = [];

    for (let i = 0; i < TOTAL_PAGES / 2; i++) {
        const item = history[i];
        
        let leftContent = null;
        let rightContent = null;
        let isCover = i === 0;
        let isBackCover = i === (TOTAL_PAGES / 2 - 1);
        
        if (item) {
            if (item.type === 'cover') {
                leftContent = (
                    <div className="h-full flex flex-col items-center justify-center bg-amber-100/50 p-6 rounded-r-lg border-l-8 border-amber-800 shadow-inner">
                        <Heart className="w-16 h-16 text-rose-500 mb-6 animate-bounce" fill="currentColor" />
                        <h1 className="text-5xl font-bold text-amber-900 mb-4 text-center leading-tight">{storyData.cover.title}</h1>
                        <p className="text-2xl text-amber-700 text-center font-semibold">{storyData.cover.subtitle}</p>
                        <p className="mt-12 text-lg text-amber-600 animate-pulse">(Click or drag corner to turn page)</p>
                    </div>
                );
                rightContent = (
                    <div className="h-full w-full bg-amber-50/50 flex flex-col items-center justify-center p-8">
                        <p className="text-amber-800/60 text-3xl rotate-[-10deg] font-bold">To Sreeparna...</p>
                        <Heart className="w-8 h-8 text-amber-400 mt-4 rotate-[-10deg]" fill="currentColor" />
                    </div>
                );
            } else if (item.type === 'chapter') {
                const chapter = storyData.chapters.find(c => c.id === item.id);
                leftContent = (
                    <div className="h-full flex flex-col p-6 items-center justify-center bg-amber-50/40">
                       {chapter?.image && (
                         <div className="w-full h-80 rounded-xl overflow-hidden border-[6px] border-amber-200 shadow-xl relative group">
                           <img src={chapter.image} alt={chapter.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                           <div className="absolute inset-0 ring-inset ring-4 ring-black/10 rounded-xl pointer-events-none"></div>
                         </div>
                       )}
                    </div>
                );
                rightContent = (
                    <div className="h-full flex flex-col p-8 justify-between bg-amber-50/30">
                        <div>
                            <h2 className="text-4xl font-bold text-amber-900 mb-6 border-b-2 border-amber-200 pb-2">{chapter?.title}</h2>
                            <p className="text-2xl text-amber-800 leading-relaxed whitespace-pre-line">{chapter?.text}</p>
                        </div>
                        
                        {i === history.length - 1 && (
                            <div className="flex flex-col gap-4 mt-8">
                                {chapter?.options.map((opt, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => handleChoice(opt.nextOutcome)}
                                        className="bg-amber-100/80 hover:bg-amber-200 text-amber-900 px-6 py-4 rounded-xl border-2 border-dashed border-amber-400 font-bold text-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] text-left shadow-sm flex items-center gap-3"
                                    >
                                        <Heart className="w-5 h-5 text-rose-400" fill="currentColor"/> 
                                        {opt.text}
                                    </button>
                                ))}
                            </div>
                        )}
                        {i < history.length - 1 && (
                            <div className="mt-8 flex justify-center opacity-50">
                                <Heart className="w-8 h-8 text-rose-300" />
                            </div>
                        )}
                    </div>
                );
            } else if (item.type === 'outcome') {
                const outcome = storyData.outcomes[item.id];
                leftContent = (
                    <div className="h-full flex flex-col p-6 items-center justify-center bg-amber-50/40">
                         <div className="w-full h-80 rounded-xl overflow-hidden border-[6px] border-amber-200 shadow-xl relative group">
                           <img src={outcome?.image || "/images/jungle_scene.png"} alt="Scene" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                           <div className="absolute inset-0 ring-inset ring-4 ring-black/10 rounded-xl pointer-events-none"></div>
                         </div>
                    </div>
                );
                rightContent = (
                    <div className="h-full flex flex-col p-8 justify-center items-center text-center bg-amber-50/30">
                        <p className="text-3xl text-amber-800 leading-relaxed mb-12">{outcome?.text}</p>
                        {i === history.length - 1 && (
                            <button 
                                onClick={() => handleContinue(outcome.nextChapter)}
                                className="bg-rose-400 hover:bg-rose-500 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg shadow-rose-200 transition-all transform hover:scale-[1.05] active:scale-[0.95] flex items-center gap-3 cursor-pointer"
                            >
                                Continue <Heart className="w-6 h-6 animate-pulse" fill="white"/>
                            </button>
                        )}
                    </div>
                );
            } else if (item.type === 'end') {
                leftContent = (
                    <div className="h-full flex flex-col p-6 items-center justify-center bg-amber-50/40">
                        <h2 className="text-5xl font-bold text-amber-900 mb-8">{storyData.end.title}</h2>
                        <div className="w-full h-72 rounded-xl overflow-hidden border-[6px] border-amber-200 shadow-xl relative group">
                           <img src={storyData.end.image || "/images/cover_scene.png"} alt="End" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                           <div className="absolute inset-0 ring-inset ring-4 ring-black/10 rounded-xl pointer-events-none"></div>
                        </div>
                    </div>
                );
                rightContent = (
                   <div className="h-full flex flex-col items-center justify-center p-10 text-center bg-amber-50/30">
                        <Heart className="w-16 h-16 text-rose-500 mb-8 animate-bounce" fill="currentColor" />
                        <p className="text-4xl text-amber-900 leading-relaxed font-bold">{storyData.end.text}</p>
                        <Heart className="w-16 h-16 text-rose-500 mt-8 animate-bounce" fill="currentColor" />
                   </div>
                );
            }
        } else {
            // Blank future/unused pages
            leftContent = (
                <div className="h-full w-full flex items-center justify-center opacity-10">
                    <Heart size={64} className="text-amber-900" />
                </div>
            );
            rightContent = (
                <div className="h-full w-full flex items-center justify-center opacity-10">
                    <Heart size={64} className="text-amber-900" />
                </div>
            );
        }

        pages.push(
            <Page key={`page-${i*2+1}`} isCover={isCover} number={i*2+1} direction="left">
                {leftContent}
            </Page>
        );
        pages.push(
            <Page key={`page-${i*2+2}`} isCover={isBackCover} number={i*2+2} direction="right">
                {rightContent}
            </Page>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-transparent p-4 font-handwriting">
            <HTMLFlipBook
                width={500}
                height={650}
                size="stretch"
                minWidth={400}
                maxWidth={600}
                minHeight={500}
                maxHeight={800}
                maxShadowOpacity={0.6}
                showCover={true}
                mobileScrollSupport={true}
                ref={bookRef}
                className="book-shadow"
                flippingTime={1000}
                usePortrait={false}
            >
                {pages}
            </HTMLFlipBook>
        </div>
    );
};

export default Book;
