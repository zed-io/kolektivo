import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import colors from 'src/styles/colors'

interface Props {
  height?: number
  width?: number
  color?: string
}

export default class Send extends React.PureComponent<Props> {
  static defaultProps = {
    height: 18,
    width: 18,
    color: colors.primary,
  }

  render() {
    return (
      <Svg width={this.props.width} height={this.props.height} viewBox="0 0 19 19" fill="none">
        <Path
          d="M16.2538 3.90507L1.69483 18.464C1.51021 18.6487 1.27817 18.7431 0.9987 18.7474C0.719211 18.7516 0.482889 18.6572 0.289733 18.464C0.0965778 18.2709 0 18.0367 0 17.7615C0 17.4863 0.0965778 17.2521 0.289733 17.0589L14.8487 2.49997H6.5871C6.30379 2.49997 6.0663 2.40409 5.87463 2.21233C5.68297 2.0206 5.58713 1.783 5.58713 1.49953C5.58713 1.21609 5.68297 0.978645 5.87463 0.787201C6.0663 0.595734 6.30379 0.5 6.5871 0.5H17.0486C17.3901 0.5 17.6763 0.615501 17.9073 0.846501C18.1383 1.07748 18.2538 1.36369 18.2538 1.70514V12.1667C18.2538 12.45 18.1579 12.6875 17.9661 12.8791C17.7744 13.0708 17.5368 13.1666 17.2533 13.1666C16.9699 13.1666 16.7324 13.0708 16.541 12.8791C16.3495 12.6875 16.2538 12.45 16.2538 12.1667V3.90507Z"
          fill={this.props.color}
        />
      </Svg>
    )
  }
}
