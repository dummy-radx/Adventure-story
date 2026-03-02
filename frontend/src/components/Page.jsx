import React from 'react';

const Page = React.forwardRef((props, ref) => {
  return (
    <div className={`page bg-[#fdf6e3] relative overflow-hidden ${props.direction === 'left' ? 'page--left' : 'page--right'}`} ref={ref} data-density={props.isCover ? "hard" : "soft"}>
      <div className="page-content h-full w-full relative z-10">
        {/* Paper texture overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.15] bg-[radial-gradient(#8b5a2b_1px,transparent_1px)] bg-size-[16px_16px]"></div>
        <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply bg-linear-to-br from-amber-50 to-[#ebd8a6]"></div>
        
        {/* Page crease shadow depending on direction */}
        <div className={`absolute inset-y-0 ${props.direction === 'left' ? 'right-0 w-8 bg-linear-to-r from-transparent to-black/10' : 'left-0 w-8 bg-linear-to-l from-transparent to-black/10'} pointer-events-none z-20`}></div>

        {/* Optional page number */}
        {!props.isCover && props.number && (
           <div className={`absolute bottom-4 ${props.direction === 'right' ? 'right-6' : 'left-6'} text-amber-900/40 text-2xl font-handwriting z-30`}>
               {props.number}
           </div>
        )}

        <div className="relative z-10 h-full">
            {props.children}
        </div>
      </div>
    </div>
  );
});

Page.displayName = 'Page';

export default Page;
