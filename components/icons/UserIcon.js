/* eslint-disable react/no-unknown-property */
import React from "react";

function UserIcon({size = 15}) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_37_2859)">
        <path
          d="M13.2149 9.69668C12.3718 8.87982 11.3682 8.27511 10.2733 7.90904C11.446 7.12649 12.2164 5.81684 12.2164 4.33594C12.2164 1.94511 10.2088 0 7.7411 0C5.27341 0 3.26578 1.94511 3.26578 4.33594C3.26578 5.81684 4.03623 7.12649 5.20898 7.90904C4.11403 8.27511 3.11047 8.87982 2.26733 9.69668C0.805226 11.1133 0 12.9967 0 15H1.20955C1.20955 11.5107 4.13958 8.67188 7.7411 8.67188C11.3426 8.67188 14.2727 11.5107 14.2727 15H15.4822C15.4822 12.9967 14.677 11.1133 13.2149 9.69668ZM7.7411 7.5C5.94036 7.5 4.47532 6.08062 4.47532 4.33594C4.47532 2.59125 5.94036 1.17188 7.7411 1.17188C9.54185 1.17188 11.0069 2.59125 11.0069 4.33594C11.0069 6.08062 9.54185 7.5 7.7411 7.5Z"
          fill="#333333"
        />
      </g>
      <defs>
        <clipPath id="clip0_37_2859">
          <rect width="15.4822" height="15" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default UserIcon;
