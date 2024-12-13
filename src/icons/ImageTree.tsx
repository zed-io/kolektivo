import * as React from 'react'
import colors from 'src/styles/colors'
import Svg, { Path } from 'svgs'

interface Props {
  height?: number
  width?: number
  color?: string
}

export default class ImageTree extends React.PureComponent<Props> {
  static defaultProps = {
    height: 32,
    width: 32,
    color: colors.primary,
  }

  render() {
    return (
      <Svg width={this.props.width} height={this.props.height} viewBox="0 0 32 32" fill="none">
        <Path
          d="M6.05493 15.59C5.55204 15.59 5.13526 15.4257 4.80459 15.097C4.4737 14.7681 4.30826 14.3523 4.30826 13.8497C4.30826 13.3468 4.4727 12.9299 4.80159 12.599C5.13026 12.2683 5.54604 12.103 6.04893 12.103C6.55182 12.103 6.96859 12.2675 7.29926 12.5963C7.63015 12.925 7.79559 13.3408 7.79559 13.8437C7.79559 14.3466 7.63115 14.7633 7.30226 15.094C6.97359 15.4247 6.55782 15.59 6.05493 15.59ZM7.64159 27.0003H19.0519V19.59H16.3853C14.987 19.59 13.8041 19.1085 12.8366 18.1453C11.869 17.182 11.3853 16.0226 11.3853 14.667C11.3853 13.5919 11.6955 12.6273 12.3159 11.7733C12.9366 10.9196 13.734 10.279 14.7083 9.85167C14.8587 8.42434 15.4519 7.24612 16.4879 6.31701C17.5237 5.3879 18.7117 4.92334 20.0519 4.92334C21.3921 4.92334 22.5801 5.3879 23.6159 6.31701C24.6519 7.24612 25.245 8.42434 25.3953 9.85167C26.3697 10.279 27.1671 10.9196 27.7876 11.7733C28.4083 12.6273 28.7186 13.5919 28.7186 14.667C28.7186 16.0226 28.2348 17.182 27.2673 18.1453C26.2997 19.1085 25.1168 19.59 23.7186 19.59H21.0519V27.0003H26.7186C27.0019 27.0003 27.2394 27.0962 27.4309 27.288C27.6227 27.4798 27.7186 27.7173 27.7186 28.0007C27.7186 28.2842 27.6227 28.5217 27.4309 28.713C27.2394 28.9046 27.0019 29.0003 26.7186 29.0003H5.66726C5.32593 29.0003 5.0397 28.8853 4.80859 28.6553C4.5777 28.4253 4.46226 28.1403 4.46226 27.8003V23.0003C4.21782 22.8499 3.96015 22.6939 3.68926 22.5323C3.41815 22.3708 3.28259 22.1337 3.28259 21.821V17.9233C3.28259 17.64 3.37848 17.4026 3.57026 17.211C3.76181 17.0192 3.99926 16.9233 4.28259 16.9233H7.82093C8.10426 16.9233 8.34181 17.0192 8.53359 17.211C8.72515 17.4026 8.82093 17.64 8.82093 17.9233V21.821C8.82093 22.1337 8.68548 22.3708 8.41459 22.5323C8.1437 22.6939 7.88604 22.8499 7.64159 23.0003V27.0003ZM16.3853 17.59H23.7186C24.5544 17.59 25.2634 17.3086 25.8456 16.7457C26.4276 16.1828 26.7186 15.4899 26.7186 14.667C26.7186 14.0072 26.5254 13.4179 26.1389 12.899C25.7527 12.3803 25.2519 11.9902 24.6366 11.7287L23.5186 11.2567L23.3956 10.0977C23.3134 9.20723 22.956 8.45556 22.3236 7.84267C21.6911 7.22978 20.9339 6.92334 20.0519 6.92334C19.1699 6.92334 18.4126 7.22978 17.7799 7.84267C17.1475 8.45556 16.7903 9.20723 16.7083 10.0977L16.5853 11.2567L15.4673 11.7287C14.8519 11.9902 14.351 12.3803 13.9646 12.899C13.5784 13.4179 13.3853 14.0072 13.3853 14.667C13.3853 15.4899 13.6763 16.1828 14.2583 16.7457C14.8403 17.3086 15.5493 17.59 16.3853 17.59Z"
          fill={this.props.color}
        />
      </Svg>
    )
  }
}
