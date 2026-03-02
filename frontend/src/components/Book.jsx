import React, { useState, useRef, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Page from './Page';
import { storyData } from '../data/story';
import { Heart } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const useWindowSize = () => {
    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    useEffect(() => {
        const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return size;
};

const Book = () => {
    const bookRef = useRef();
    const { width: W, height: H } = useWindowSize();

    // Responsive book config
    const isMobile = W < 640;
    const isTablet = W >= 640 && W < 1024;

    const bookConfig = {
        width:      isMobile ? W - 24        : isTablet ? Math.floor((W - 48) / 2) : 500,
        height:     isMobile ? Math.floor(H * 0.72) : isTablet ? Math.floor(H * 0.80) : 650,
        minWidth:   isMobile ? 280           : isTablet ? 280                       : 400,
        maxWidth:   isMobile ? W             : isTablet ? Math.floor(W / 2)         : 600,
        minHeight:  isMobile ? 380           : isTablet ? 420                       : 500,
        maxHeight:  isMobile ? Math.floor(H * 0.80) : isTablet ? Math.floor(H * 0.88) : 800,
        usePortrait: isMobile,
    };

    const triggerToast = () => {
        toast('✨ Choose your path first!', {
            id: 'choose-path',
            icon: '💛',
            style: {
                background: '#78350f',
                color: '#fef3c7',
                fontWeight: 'bold',
                fontSize: '1rem',
                borderRadius: '1rem',
                border: '1px solid #92400e',
            },
            duration: 2000,
        });
    };

    // Safety-net: if a flip sneaks through while a choice is pending, snap back
    const handleFlip = (e) => {
        const lastItem = history[history.length - 1];
        if (lastItem?.type === 'chapter') {
            const lockedPageIndex = (history.length - 1) * 2;
            if (e.data > lockedPageIndex + 1) {
                setTimeout(() => {
                    bookRef.current?.pageFlip().flip(lockedPageIndex);
                }, 50);
            }
        }
    };

    // history tracks the flow from beginning to current
    const [history, setHistory] = useState([
        { type: 'cover' },
        { type: 'chapter', id: 1 }
    ]);

    const handleChoice = (outcomeId) => {
        const outcome = storyData.outcomes[outcomeId];
        const nextItem = outcome.nextChapter === 'end'
            ? { type: 'end' }
            : { type: 'chapter', id: outcome.nextChapter };
        setHistory(prev => [...prev, { type: 'outcome', id: outcomeId }, nextItem]);

        // Auto-flip to the outcome page after choosing (essential on portrait/mobile)
        setTimeout(() => {
            bookRef.current?.pageFlip().flipNext();
        }, 100);
    };

    // We render a fixed 30 pages to prevent react-pageflip from glitching.
    const TOTAL_PAGES = 30;
    const pages = [];

    // Image overrides applied ONLY to chapter intro pages
    // Does NOT affect chapter preview spreads or any other pages
    const chapterPageImages = {
        1: "/images/jungle_scene.png",
        2: "/images/mountain_scene.png",
        3: "/images/beach_scene.png",
        4: "/images/valley_scene.png",
        5: "/images/temple_scene.png",
        6: "/images/treasure_scene.png",
    };

    for (let i = 0; i < TOTAL_PAGES / 2; i++) {
        const item = history[i];

        let leftContent = null;
        let rightContent = null;
        let isCover = i === 0;
        let isBackCover = i === (TOTAL_PAGES / 2 - 1);

        if (item) {
            if (item.type === 'cover') {
                leftContent = (
                    <div className="h-full flex flex-col items-center justify-center bg-amber-100/50 p-3 sm:p-5 md:p-6 rounded-r-lg border-l-8 border-amber-800 shadow-inner">
                        {storyData.cover.image && (
                           <div className="w-full h-36 sm:h-44 md:h-56 mb-3 sm:mb-4 rounded-xl overflow-hidden border-4 border-amber-800 shadow-xl relative group">
                             <img src={storyData.cover.image} alt={storyData.cover.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                             <div className="absolute inset-0 ring-inset ring-4 ring-black/10 rounded-xl pointer-events-none"></div>
                           </div>
                        )}
                        {!storyData.cover.image && <Heart className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-rose-500 mb-4 sm:mb-6 animate-bounce" fill="currentColor" />}
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 mb-1 sm:mb-2 text-center leading-tight">{storyData.cover.title}</h1>
                        <p className="text-base sm:text-lg md:text-xl text-amber-700 text-center font-semibold">{storyData.cover.subtitle}</p>
                        <p className="mt-3 sm:mt-5 md:mt-6 text-xs sm:text-sm text-amber-600 animate-pulse">(Click or drag corner to turn page)</p>
                    </div>
                );
                rightContent = (
                    <div className="h-full w-full bg-amber-50/50 flex flex-col items-center justify-center p-5 sm:p-8">
                        <p className="text-amber-800/60 text-xl sm:text-2xl md:text-3xl rotate-[-10deg] font-bold">To Sreeparna...</p>
                        <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 mt-3 sm:mt-4 rotate-[-10deg]" fill="currentColor" />
                    </div>
                );
            } else if (item.type === 'chapter') {
                const chapter = storyData.chapters.find(c => c.id === item.id);
                const chapterDisplayImage = (chapter && chapterPageImages[chapter.id]) || chapter?.image;
                const blockFlip = (e) => { e.stopPropagation(); triggerToast(); };
                leftContent = (
                    <div className="h-full flex flex-col p-3 sm:p-5 md:p-6 items-center justify-center bg-amber-50/40 relative">
                       {/* Full-page blocker on the image page when choice is pending */}
                       {i === history.length - 1 && (
                           <div
                               className="absolute inset-0 z-50 cursor-not-allowed"
                               onPointerDown={blockFlip}
                               onMouseDown={blockFlip}
                               onTouchStart={blockFlip}
                           />
                       )}
                       {chapterDisplayImage && (
                         <div className="w-full h-40 sm:h-56 md:h-80 rounded-xl overflow-hidden border-[6px] border-amber-200 shadow-xl relative group">
                           <img src={chapterDisplayImage} alt={chapter.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                           <div className="absolute inset-0 ring-inset ring-4 ring-black/10 rounded-xl pointer-events-none"></div>
                         </div>
                       )}
                    </div>
                );
                rightContent = (
                    <div className="h-full flex flex-col p-3 sm:p-5 md:p-8 justify-between bg-amber-50/30 relative">
                        {/* Prevent flipping forward if this is the active page awaiting a choice */}
                        {i === history.length - 1 && (
                            <>
                                {/* Full right edge — the main flip-drag zone */}
                                <div
                                    className="absolute inset-y-0 right-0 w-20 z-50 cursor-not-allowed"
                                    onPointerDown={e => { e.stopPropagation(); triggerToast(); }}
                                    onMouseDown={e => { e.stopPropagation(); triggerToast(); }}
                                    onTouchStart={e => { e.stopPropagation(); triggerToast(); }}
                                />
                                {/* Bottom-right corner */}
                                <div
                                    className="absolute bottom-0 right-0 w-40 h-28 z-50 cursor-not-allowed"
                                    onPointerDown={e => { e.stopPropagation(); triggerToast(); }}
                                    onMouseDown={e => { e.stopPropagation(); triggerToast(); }}
                                    onTouchStart={e => { e.stopPropagation(); triggerToast(); }}
                                />
                                {/* Top-right corner */}
                                <div
                                    className="absolute top-0 right-0 w-40 h-28 z-50 cursor-not-allowed"
                                    onPointerDown={e => { e.stopPropagation(); triggerToast(); }}
                                    onMouseDown={e => { e.stopPropagation(); triggerToast(); }}
                                    onTouchStart={e => { e.stopPropagation(); triggerToast(); }}
                                />
                            </>
                        )}
                        <div className="relative z-10">
                            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-amber-900 mb-3 sm:mb-4 md:mb-6 border-b-2 border-amber-200 pb-2 drop-shadow-sm">{chapter?.title}</h2>
                            <p className="text-sm sm:text-base md:text-2xl text-amber-800 leading-relaxed whitespace-pre-line drop-shadow-sm">{chapter?.text}</p>
                        </div>

                        {i === history.length - 1 && (
                            <div
                                className="flex flex-col gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6 md:mt-8 relative z-50"
                                onPointerDown={e => e.stopPropagation()}
                                onMouseDown={e => e.stopPropagation()}
                                onTouchStart={e => e.stopPropagation()}
                            >
                                {chapter?.options.map((opt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleChoice(opt.nextOutcome)}
                                        className="bg-amber-100/80 hover:bg-amber-200 text-amber-900 px-3 sm:px-5 md:px-6 py-2 sm:py-3 md:py-4 rounded-xl border-2 border-dashed border-amber-400 font-bold text-sm sm:text-base md:text-xl transition-all transform hover:scale-[1.02] hover:shadow-md hover:ring-2 hover:ring-rose-300 active:scale-[0.98] text-left flex items-center gap-2 sm:gap-3 relative overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-linear-to-r from-amber-100/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                                        <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400 group-hover:animate-ping shrink-0" fill="currentColor"/>
                                        {opt.text}
                                    </button>
                                ))}
                            </div>
                        )}
                        {i < history.length - 1 && (
                            <div className="mt-4 sm:mt-6 md:mt-8 flex justify-center opacity-50">
                                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-rose-300" />
                            </div>
                        )}
                    </div>
                );
            } else if (item.type === 'outcome') {
                const outcome = storyData.outcomes[item.id];
                leftContent = (
                    <div className="h-full flex flex-col p-3 sm:p-5 md:p-6 items-center justify-center bg-amber-50/40">
                         <div className="w-full h-40 sm:h-56 md:h-80 rounded-xl overflow-hidden border-[6px] border-amber-200 shadow-xl relative group">
                           <img src={outcome?.image || "/images/jungle_scene.png"} alt="Scene" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                           <div className="absolute inset-0 ring-inset ring-4 ring-black/10 rounded-xl pointer-events-none"></div>
                         </div>
                    </div>
                );
                rightContent = (
                    <div className="h-full flex flex-col p-4 sm:p-6 md:p-8 justify-center items-center text-center bg-amber-50/30 relative">
                        <p className="text-base sm:text-xl md:text-3xl text-amber-800 leading-relaxed relative z-10 drop-shadow-sm">{outcome?.text}</p>
                        <p className="mt-4 sm:mt-6 md:mt-8 text-xs sm:text-sm text-amber-500 animate-pulse">(Turn page to continue)</p>
                    </div>
                );
            } else if (item.type === 'end') {
                leftContent = (
                    <div className="h-full flex flex-col p-3 sm:p-5 md:p-6 items-center justify-center bg-amber-50/40">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-900 mb-4 sm:mb-6 md:mb-8 text-center">{storyData.end.title}</h2>
                        <div className="w-full h-44 sm:h-56 md:h-72 rounded-xl overflow-hidden border-[6px] border-amber-200 shadow-xl relative group">
                           <img src={storyData.end.image || "/images/cover_scene.png"} alt="End" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                           <div className="absolute inset-0 ring-inset ring-4 ring-black/10 rounded-xl pointer-events-none"></div>
                        </div>
                    </div>
                );
                rightContent = (
                   <div className="h-full flex flex-col items-center justify-center p-5 sm:p-8 md:p-10 text-center bg-amber-50/30">
                        <Heart className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-rose-500 mb-4 sm:mb-6 md:mb-8 animate-bounce" fill="currentColor" />
                        <p className="text-xl sm:text-2xl md:text-4xl text-amber-900 leading-relaxed font-bold">{storyData.end.text}</p>
                        <Heart className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-rose-500 mt-4 sm:mt-6 md:mt-8 animate-bounce" fill="currentColor" />
                   </div>
                );
            }
        } else {
            // The very next spread after the active chapter: preview the chapter scene image
            const lastItem = history[history.length - 1];
            if (i === history.length && lastItem?.type === 'chapter') {
                const previewChapter = storyData.chapters.find(c => c.id === lastItem.id);
                if (previewChapter?.image) {
                    leftContent = (
                        <div className="h-full flex flex-col p-3 sm:p-5 md:p-6 items-center justify-center bg-amber-50/40">
                            <div className="w-full h-40 sm:h-56 md:h-80 rounded-xl overflow-hidden border-[6px] border-amber-200 shadow-xl relative group">
                                <img src={previewChapter.image} alt={previewChapter.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 ring-inset ring-4 ring-black/10 rounded-xl pointer-events-none" />
                            </div>
                        </div>
                    );
                }
            }

            if (isBackCover) {
                leftContent = (
                    <div className="h-full flex flex-col p-3 sm:p-5 md:p-6 items-center justify-center bg-amber-50/40">
                        <div className="w-full h-[85%] rounded-xl overflow-hidden border-[6px] border-amber-200 shadow-xl relative group">
                            <img
                                src="/images/ishuandsreeparna.png"
                                alt="Ishan and Sreeparna"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 ring-inset ring-4 ring-black/10 rounded-xl pointer-events-none" />
                        </div>
                    </div>
                );
                rightContent = (
                    <div className="h-full w-full bg-[#8b5a2b] flex flex-col items-center justify-center p-5 sm:p-8 border-l-8 border-[#5e3c1b] shadow-inner rounded-r-lg">
                        <p className="text-amber-100 text-3xl sm:text-4xl md:text-5xl font-bold text-center">With love, Ishan</p>
                        <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-rose-400 mt-6 sm:mt-8" fill="currentColor" />
                    </div>
                );
            }
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
        <div className="flex justify-center items-center min-h-screen bg-transparent p-2 sm:p-4 font-handwriting relative">
            <Toaster position="top-center" />
            <HTMLFlipBook
                width={bookConfig.width}
                height={bookConfig.height}
                size="stretch"
                minWidth={bookConfig.minWidth}
                maxWidth={bookConfig.maxWidth}
                minHeight={bookConfig.minHeight}
                maxHeight={bookConfig.maxHeight}
                maxShadowOpacity={0.6}
                showCover={true}
                mobileScrollSupport={true}
                ref={bookRef}
                className="book-shadow"
                flippingTime={1000}
                usePortrait={bookConfig.usePortrait}
                onFlip={handleFlip}
            >
                {pages}
            </HTMLFlipBook>
        </div>
    );
};

export default Book;
