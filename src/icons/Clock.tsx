import * as React from 'react'
import colors from 'src/styles/colors'
import Svg, { Path } from 'svgs'

interface Props {
  height?: number
  width?: number
  color?: string
}

export default class Clock extends React.PureComponent<Props> {
  static defaultProps = {
    height: 32,
    width: 32,
    color: colors.primary,
  }

  render() {
    return (
      <Svg width={this.props.height} height={this.props.height} viewBox="0 0 24 24" fill="none">
        <Path
          d="M13.25 12.1961V8.24995C13.25 8.03747 13.1781 7.85935 13.0343 7.7156C12.8904 7.57185 12.7122 7.49998 12.4997 7.49998C12.2871 7.49998 12.109 7.57185 11.9654 7.7156C11.8218 7.85935 11.75 8.03747 11.75 8.24995V12.4269C11.75 12.5446 11.7718 12.6587 11.8154 12.769C11.859 12.8794 11.9276 12.9814 12.0212 13.075L15.4462 16.5C15.5846 16.6384 15.7587 16.7093 15.9683 16.7125C16.1779 16.7157 16.3551 16.6448 16.5 16.5C16.6448 16.3551 16.7173 16.1795 16.7173 15.9731C16.7173 15.7667 16.6448 15.591 16.5 15.4462L13.25 12.1961ZM12.5016 22C11.1877 22 9.95268 21.7506 8.79655 21.252C7.6404 20.7533 6.63472 20.0765 5.7795 19.2217C4.92427 18.3669 4.24721 17.3616 3.74833 16.206C3.24944 15.0504 3 13.8156 3 12.5017C3 11.1877 3.24933 9.95268 3.748 8.79655C4.24667 7.6404 4.92342 6.63472 5.77825 5.7795C6.6331 4.92427 7.63834 4.24721 8.79398 3.74833C9.94959 3.24944 11.1844 3 12.4983 3C13.8122 3 15.0473 3.24933 16.2034 3.748C17.3596 4.24667 18.3652 4.92342 19.2205 5.77825C20.0757 6.6331 20.7527 7.63834 21.2516 8.79398C21.7505 9.94959 22 11.1844 22 12.4983C22 13.8122 21.7506 15.0473 21.252 16.2034C20.7533 17.3596 20.0765 18.3652 19.2217 19.2205C18.3669 20.0757 17.3616 20.7527 16.206 21.2516C15.0504 21.7505 13.8156 22 12.5016 22ZM12.5 20.5C14.7166 20.5 16.6041 19.7208 18.1625 18.1625C19.7208 16.6041 20.5 14.7166 20.5 12.5C20.5 10.2833 19.7208 8.39581 18.1625 6.83748C16.6041 5.27914 14.7166 4.49998 12.5 4.49998C10.2833 4.49998 8.39581 5.27914 6.83748 6.83748C5.27914 8.39581 4.49998 10.2833 4.49998 12.5C4.49998 14.7166 5.27914 16.6041 6.83748 18.1625C8.39581 19.7208 10.2833 20.5 12.5 20.5Z"
          fill={this.props.color}
        />
      </Svg>
    )
  }
}
