import * as React from 'react'
import { Svg } from 'react-native-svg'
import { Path } from 'victory-native'
const Stamp = ({ size = 16 }: { size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      fill="#269793"
      d="M6.808 20.846a1.74 1.74 0 0 1-1.277-.531A1.74 1.74 0 0 1 5 19.038v-3.423c0-.505.175-.932.525-1.282.35-.35.778-.525 1.283-.525h11.384c.505 0 .933.175 1.283.525.35.35.525.777.525 1.282v3.423c0 .497-.177.923-.531 1.277a1.74 1.74 0 0 1-1.277.531H6.808Zm.615-3.5h10.154c.261 0 .48-.088.658-.265a.893.893 0 0 0 .265-.658v-.192a.888.888 0 0 0-.273-.65.888.888 0 0 0-.65-.273H7.423a.888.888 0 0 0-.65.273.888.888 0 0 0-.273.65v.192c0 .262.088.48.265.658a.893.893 0 0 0 .658.265Zm4.338-4.554L8.438 8.204a1.958 1.958 0 0 1-.294-.643 1.818 1.818 0 0 1-.037-.703c.175-1.125.658-2.049 1.449-2.772C10.345 3.362 11.327 3 12.5 3c1.173 0 2.155.362 2.945 1.086.79.723 1.273 1.647 1.45 2.772.032.238.02.473-.038.703-.059.231-.156.445-.294.643l-3.326 4.588a.86.86 0 0 1-.739.377.856.856 0 0 1-.736-.377Zm.739-1.16 3-4.132c0-.833-.292-1.542-.875-2.125A2.893 2.893 0 0 0 12.5 4.5c-.833 0-1.542.292-2.125.875A2.893 2.893 0 0 0 9.5 7.5l3 4.133Z"
    />
  </Svg>
)
export default Stamp
