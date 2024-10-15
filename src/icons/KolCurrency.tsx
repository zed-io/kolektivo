import * as React from 'react'
import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg'
const KolCurrency = ({ size = 16 }: { size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path fill="url(#a)" d="M12 21.5a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19Z" />
    <Path
      fill="#EEA35F"
      d="M12 19.07c3.93 0 7.114-3.176 7.114-7.092 0-3.917-3.185-7.092-7.114-7.092S4.886 8.06 4.886 11.978c0 3.916 3.185 7.092 7.114 7.092Z"
      opacity={0.5}
    />
    <Path
      fill="url(#b)"
      fillRule="evenodd"
      d="M12 18.39c3.556 0 6.436-2.872 6.436-6.412S15.556 5.564 12 5.564s-6.435 2.874-6.435 6.414c0 3.54 2.879 6.413 6.435 6.413Zm7.114-6.412c0 3.916-3.185 7.092-7.114 7.092s-7.114-3.176-7.114-7.092c0-3.917 3.185-7.092 7.114-7.092 3.93 0 7.114 3.175 7.114 7.092Z"
      clipRule="evenodd"
      opacity={0.5}
    />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M14.689 8.517c.504 0 .78.586.46.976l-1.971 2.4a.234.234 0 0 0-.02.273l1.505 2.454a.597.597 0 0 1-.509.909h-.978a.34.34 0 0 1-.297-.179l-1.727-3.195a.238.238 0 0 1 .019-.254l2.432-3.25a.34.34 0 0 1 .272-.134h.814Zm-4.763 0h.991c.2 0 .358.173.337.372l-.655 6.336a.34.34 0 0 1-.337.303h-.94a.597.597 0 0 1-.595-.658l.605-5.819a.598.598 0 0 1 .594-.534Z"
      clipRule="evenodd"
    />
    <Path
      fill="url(#c)"
      fillRule="evenodd"
      d="m15.4 9.698-1.932 2.353 1.471 2.4a.921.921 0 0 1-.785 1.402h-.978a.664.664 0 0 1-.582-.348l-1.425-2.636-.247 2.39a.663.663 0 0 1-.66.594h-.94a.92.92 0 0 1-.917-1.017l.605-5.819a.922.922 0 0 1 .916-.825h.991c.391 0 .7.338.66.73l-.228 2.2 1.995-2.665a.665.665 0 0 1 .53-.265h.815c.779 0 1.203.906.711 1.506Zm-1.797-1.047a.34.34 0 0 1 .272-.134h.814c.504 0 .78.586.46.976l-1.971 2.4a.234.234 0 0 0-.02.273l1.505 2.454a.597.597 0 0 1-.509.909h-.978a.34.34 0 0 1-.297-.179l-1.727-3.195a.238.238 0 0 1 .019-.254l2.432-3.25Zm-2.349.238a.338.338 0 0 0-.337-.372h-.99a.598.598 0 0 0-.595.534l-.605 5.82a.597.597 0 0 0 .594.657h.941a.34.34 0 0 0 .337-.303l.655-6.336Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient id="a" x1={0.423} x2={21.5} y1={12} y2={12} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#EEA35F" />
        <Stop offset={1} stopColor="#FFBF86" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={10.624}
        x2={17.545}
        y1={8.924}
        y2={22.246}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" />
        <Stop offset={1} stopColor="#FFBE84" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={11.993}
        x2={11.993}
        y1={9.202}
        y2={14.845}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EC9E56" />
        <Stop offset={1} stopColor="#FFBF86" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default KolCurrency
