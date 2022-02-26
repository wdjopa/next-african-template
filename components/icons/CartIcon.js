/* eslint-disable react/no-unknown-property */
import React from "react";

function CartIcon({size = 15}) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.14317 8.4099C5.42702 8.41073 4.73271 8.17102 4.17848 7.7316C3.62424 7.29218 3.24436 6.68021 3.10352 5.99991C3.09229 5.92825 3.09728 5.85509 3.11814 5.78548C3.13899 5.71587 3.17522 5.65149 3.22431 5.5968C3.2734 5.5421 3.33418 5.4984 3.40243 5.46872C3.47068 5.43904 3.54478 5.4241 3.61959 5.42492C3.74253 5.42319 3.86207 5.46404 3.95669 5.54012C4.0513 5.61621 4.11477 5.72252 4.13566 5.83992C4.23285 6.28937 4.48673 6.69273 4.85464 6.98225C5.22256 7.27176 5.6821 7.42979 6.15608 7.42979C6.63006 7.42979 7.0896 7.27176 7.45751 6.98225C7.82543 6.69273 8.0793 6.28937 8.1765 5.83992C8.19739 5.72252 8.26085 5.61621 8.35547 5.54012C8.45008 5.46404 8.56962 5.42319 8.69257 5.42492C8.76737 5.4241 8.84147 5.43904 8.90972 5.46872C8.97797 5.4984 9.03875 5.5421 9.08784 5.5968C9.13693 5.65149 9.17316 5.71587 9.19402 5.78548C9.21488 5.85509 9.21986 5.92825 9.20864 5.99991C9.06695 6.68445 8.68328 7.29967 8.12371 7.73958C7.56415 8.17949 6.86375 8.41655 6.14317 8.4099V8.4099Z"
        fill="#333333"
      />
      <path
        d="M10.7362 15H1.55015C1.34015 15.0003 1.1323 14.9591 0.939233 14.8791C0.746165 14.7991 0.571918 14.6818 0.427094 14.5345C0.282269 14.3872 0.169894 14.2128 0.0968037 14.0221C0.0237136 13.8314 -0.00856333 13.6282 0.00193662 13.425L0.419954 4.80505C0.437255 4.4186 0.607976 4.05357 0.896469 3.78617C1.18496 3.51878 1.56892 3.36969 1.96817 3.37006H10.3182C10.7174 3.36969 11.1014 3.51878 11.3899 3.78617C11.6784 4.05357 11.8491 4.4186 11.8664 4.80505L12.2844 13.425C12.2949 13.6282 12.2627 13.8314 12.1896 14.0221C12.1165 14.2128 12.0041 14.3872 11.8593 14.5345C11.7145 14.6818 11.5402 14.7991 11.3471 14.8791C11.1541 14.9591 10.9462 15.0003 10.7362 15V15ZM1.96817 4.37505C1.8313 4.37505 1.70003 4.42773 1.60325 4.5215C1.50647 4.61527 1.4521 4.74244 1.4521 4.87505L1.03408 13.475C1.03058 13.5427 1.04134 13.6105 1.0657 13.674C1.09006 13.7376 1.12752 13.7957 1.1758 13.8448C1.22407 13.8939 1.28216 13.933 1.34651 13.9597C1.41087 13.9864 1.48015 14.0001 1.55015 14H10.7362C10.8062 14.0001 10.8755 13.9864 10.9399 13.9597C11.0042 13.933 11.0623 13.8939 11.1106 13.8448C11.1588 13.7957 11.1963 13.7376 11.2207 13.674C11.245 13.6105 11.2558 13.5427 11.2523 13.475L10.8343 4.85505C10.8343 4.72244 10.7799 4.59527 10.6831 4.5015C10.5863 4.40773 10.4551 4.35505 10.3182 4.35505L1.96817 4.37505Z"
        fill="#333333"
      />
      <path
        d="M9.23961 3.87498H8.20746V2.99999C8.20746 2.46956 7.98998 1.96085 7.60285 1.58578C7.21572 1.21071 6.69066 0.999995 6.14318 0.999995C5.5957 0.999995 5.07064 1.21071 4.68351 1.58578C4.29638 1.96085 4.0789 2.46956 4.0789 2.99999V3.87498H3.04675V2.99999C3.04675 2.20434 3.37298 1.44128 3.95368 0.878676C4.53437 0.316069 5.32196 0 6.14318 0C6.9644 0 7.75199 0.316069 8.33268 0.878676C8.91338 1.44128 9.23961 2.20434 9.23961 2.99999V3.87498Z"
        fill="#333333"
      />
    </svg>
  );
}

export default CartIcon;
