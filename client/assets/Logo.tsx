import React from 'react';

interface Props {
  size?: number;
}

// Logo aspect ratio: w : h = 761 : 522 = 1.458 : 1
const Logo: React.FC<Props> = ({ size = 80 }) => {
  const width = size * (761 / 522);
  const height = size;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 761 522"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M44.2845 194.911L284.868 17.9113L284.868 101.911L44.2851 277.411L44.2845 194.911Z"
        fill="#8684E8"
      />
      <g filter="url(#filter0_d_265_245)">
        <path
          d="M101.999 231.411L302.285 355.411L302.285 431.411L45.285 276.411L101.999 231.411Z"
          fill="#201E9C"
        />
      </g>
      <path
        d="M468.66 17.4113L703.66 205.411L703.66 279.639L468.66 97.139L468.66 17.4113Z"
        fill="#4744DA"
      />
      <g filter="url(#filter1_d_265_245)">
        <path
          d="M429.025 362.411L644.499 232.911L704.16 278.639L429.025 440.139L429.025 362.411Z"
          fill="#2A295E"
        />
      </g>
      <g filter="url(#filter2_d_265_245)">
        <rect
          x="430.197"
          width="25.7142"
          height="521"
          transform="rotate(14.3721 430.197 0)"
          fill="#514EE1"
        />
      </g>
      <g filter="url(#filter3_d_265_245)">
        <circle cx="111.499" cy="408.411" r="36" fill="#4744DA" />
      </g>
      <g filter="url(#filter4_d_265_245)">
        <circle cx="643.499" cy="80.4113" r="36" fill="#8A88EC" />
      </g>
      <defs>
        <filter
          id="filter0_d_265_245"
          x="41.2849"
          y="231.411"
          width="265"
          height="208"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_265_245" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_265_245"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_265_245"
          x="425.025"
          y="232.911"
          width="283.135"
          height="215.228"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_265_245" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_265_245"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_d_265_245"
          x="297.875"
          y="0"
          width="164.231"
          height="521.078"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="2" dy="5" />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_265_245" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_265_245"
            result="shape"
          />
        </filter>
        <filter
          id="filter3_d_265_245"
          x="71.4985"
          y="372.411"
          width="80"
          height="80"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_265_245" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_265_245"
            result="shape"
          />
        </filter>
        <filter
          id="filter4_d_265_245"
          x="603.499"
          y="44.4113"
          width="80"
          height="80"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_265_245" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_265_245"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Logo;
