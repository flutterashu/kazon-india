import React from 'react';

interface KazonLogoProps {
  className?: string;
  variant?: 'full' | 'inline' | 'mark' | 'card';
  isDarkMode?: boolean;
}

export const KazonLogo: React.FC<KazonLogoProps> = ({
  className = 'h-10',
  variant = 'full',
  isDarkMode = false,
}) => {
  // If variant is 'mark' (just the left pillar + cross + stylized K mark for compact spaces)
  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <svg
          viewBox="0 0 176 170"
          className="h-full w-auto max-h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left Green Pillar */}
          <rect x="6" y="6" width="46" height="158" rx="3" fill="#085F2C" />

          {/* Medical Cross */}
          <rect
            x="68"
            y="74"
            width="82"
            height="24"
            rx="2"
            className={isDarkMode ? 'fill-slate-200' : 'fill-slate-900'}
          />
          <rect
            x="98"
            y="20"
            width="24"
            height="132"
            rx="2"
            className={isDarkMode ? 'fill-slate-200' : 'fill-slate-900'}
          />

          {/* Stylized K Ribbon */}
          <path
            d="M 148 34 C 126 62, 106 80, 102 96 C 98 112, 122 132, 146 148 C 138 152, 126 154, 116 151 C 98 138, 88 118, 90 96 C 92 74, 112 52, 136 30 Z"
            fill="#085F2C"
            stroke={isDarkMode ? '#0f172a' : '#ffffff'}
            strokeWidth="5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  // If variant is 'inline' (compact horizontal lockup for navbars)
  if (variant === 'inline') {
    return (
      <div className={`inline-flex items-center space-x-2.5 select-none ${className}`}>
        {/* Exact Logo Graphic */}
        <div className="h-full py-0.5 shrink-0">
          <svg
            viewBox="0 0 176 170"
            className="h-full w-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="6" y="6" width="46" height="158" rx="3" fill="#085F2C" />
            <rect
              x="68"
              y="74"
              width="82"
              height="24"
              rx="2"
              className={isDarkMode ? 'fill-white' : 'fill-slate-900'}
            />
            <rect
              x="98"
              y="20"
              width="24"
              height="132"
              rx="2"
              className={isDarkMode ? 'fill-white' : 'fill-slate-900'}
            />
            <path
              d="M 148 34 C 126 62, 106 80, 102 96 C 98 112, 122 132, 146 148 C 138 152, 126 154, 116 151 C 98 138, 88 118, 90 96 C 92 74, 112 52, 136 30 Z"
              fill="#085F2C"
              stroke={isDarkMode ? '#020617' : '#ffffff'}
              strokeWidth="5"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Text Lockup matching typography */}
        <div className="flex flex-col justify-center leading-tight">
          <div className="flex items-baseline space-x-1">
            <span
              className={`font-black text-xl tracking-tight leading-none ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              azon<sup className="text-[9px] font-bold ml-0.5">™</sup>
            </span>
          </div>
          <span className="text-[9px] font-serif italic text-slate-500 dark:text-slate-400 tracking-tight mt-0.5">
            a step towards expectation
          </span>
          <span className="text-[10px] font-extrabold text-[#085F2C] dark:text-emerald-400 tracking-tight uppercase">
            Kazon India Pvt. Ltd.
          </span>
        </div>
      </div>
    );
  }

  // Full High-Resolution Vector Logo (Exact match to the uploaded brand asset)
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 380 190"
        className="w-full h-full max-h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left Brand Green Solid Pillar */}
        <rect x="14" y="12" width="58" height="166" rx="2" fill="#085F2C" />

        {/* Medical Plus Cross */}
        <rect
          x="88"
          y="84"
          width="80"
          height="24"
          rx="2"
          className={isDarkMode ? 'fill-slate-100' : 'fill-[#1C1C1C]'}
        />
        <rect
          x="122"
          y="26"
          width="24"
          height="138"
          rx="2"
          className={isDarkMode ? 'fill-slate-100' : 'fill-[#1C1C1C]'}
        />

        {/* Stylized K Ribbon with White Protective Halo Outline */}
        <path
          d="M 166 40 C 145 68, 126 84, 123 100 C 120 115, 142 135, 168 152 C 160 156, 148 158, 138 156 C 120 144, 108 124, 110 102 C 112 80, 130 58, 154 36 Z"
          fill="#085F2C"
          stroke={isDarkMode ? '#090d16' : '#FFFFFF'}
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* Wordmark 'azon' */}
        <text
          x="180"
          y="122"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="82"
          letterSpacing="-1.5"
          className={isDarkMode ? 'fill-white' : 'fill-[#1A1A1A]'}
        >
          azon
        </text>

        {/* Trademark TM */}
        <text
          x="328"
          y="62"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="18"
          className={isDarkMode ? 'fill-slate-300' : 'fill-[#1A1A1A]'}
        >
          TM
        </text>

        {/* Tagline 'a step towards expectation' */}
        <text
          x="146"
          y="152"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontStyle="italic"
          fontSize="17"
          className={isDarkMode ? 'fill-slate-300' : 'fill-[#242424]'}
        >
          a step towards expectation
        </text>

        {/* Bottom Corporate Title: Kazon India Pvt. Ltd. */}
        <text
          x="88"
          y="182"
          fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
          fontWeight="800"
          fontSize="24"
          letterSpacing="-0.5"
          fill={isDarkMode ? '#34D399' : '#085F2C'}
        >
          Kazon India Pvt. Ltd.
        </text>
      </svg>
    </div>
  );
};
