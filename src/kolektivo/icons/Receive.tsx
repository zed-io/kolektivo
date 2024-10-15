import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import colors from 'src/styles/colors'

interface Props {
  height?: number
  width?: number
  color?: string
}

export default class Receive extends React.PureComponent<Props> {
  static defaultProps = {
    height: 18,
    width: 18,
    color: colors.primary,
  }

  render() {
    return (
      <Svg width={this.props.width} height={this.props.height} viewBox="0 0 19 19" fill="none">
        <Path
          d="M2.00011 15.342L16.5591 0.783035C16.7437 0.598413 16.9757 0.503969 17.2552 0.499702C17.5347 0.495436 17.771 0.58988 17.9642 0.783035C18.1573 0.976191 18.2539 1.21037 18.2539 1.48557C18.2539 1.76079 18.1573 1.99498 17.9642 2.18814L3.40521 16.7471H11.6668C11.9501 16.7471 12.1876 16.843 12.3793 17.0347C12.5709 17.2265 12.6668 17.4641 12.6668 17.7475C12.6668 18.031 12.5709 18.2684 12.3793 18.4599C12.1876 18.6513 11.9501 18.7471 11.6668 18.7471H1.20527C0.863831 18.7471 0.577618 18.6316 0.34664 18.4006C0.115639 18.1696 0.000139236 17.8834 0.000139236 17.5419V7.0804C0.000139236 6.79709 0.0960178 6.5596 0.287773 6.36794C0.479528 6.17627 0.717129 6.08044 1.00057 6.08044C1.28404 6.08044 1.5215 6.17627 1.71294 6.36794C1.90438 6.5596 2.00011 6.79709 2.00011 7.0804V15.342Z"
          fill={this.props.color}
        />
      </Svg>
    )
  }
}
