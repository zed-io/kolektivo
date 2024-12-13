import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

interface Props {
  height?: number
  width?: number
  color?: string
}

export default class Members extends React.PureComponent<Props> {
  static defaultProps = {
    height: 11,
    width: 24,
    color: '#FFFFFF', // You can change this color as needed
  }

  render() {
    return (
      <Svg width={this.props.width} height={this.props.height} viewBox="0 0 24 11" fill="none">
        <Path
          d="M1.06655 10.4806C0.821347 10.4806 0.615813 10.3977 0.449947 10.2318C0.284097 10.066 0.201172 9.86046 0.201172 9.61528V9.26145C0.201172 8.59607 0.548605 8.04959 1.24347 7.62202C1.93834 7.19446 2.8441 6.98067 3.96075 6.98067C4.14536 6.98067 4.33126 6.98645 4.51845 6.998C4.70563 7.00953 4.89409 7.03197 5.08382 7.0653C4.88896 7.37683 4.74441 7.70022 4.65017 8.03547C4.55596 8.37072 4.50885 8.71463 4.50885 9.0672V10.4806H1.06655ZM7.10897 10.4806C6.84864 10.4806 6.63226 10.394 6.45982 10.2208C6.28737 10.0476 6.20115 9.8329 6.20115 9.5768V9.10567C6.20115 8.63749 6.33256 8.20955 6.5954 7.82185C6.85821 7.43415 7.23705 7.09607 7.73192 6.8076C8.22679 6.51915 8.8114 6.30281 9.48575 6.15857C10.1601 6.01434 10.8973 5.94222 11.6973 5.94222C12.5127 5.94222 13.2575 6.01434 13.9319 6.15857C14.6062 6.30281 15.1908 6.51915 15.6857 6.8076C16.1806 7.09607 16.5569 7.43415 16.8145 7.82185C17.0722 8.20955 17.2011 8.63749 17.2011 9.10567V9.5768C17.2011 9.8329 17.1145 10.0476 16.9412 10.2208C16.768 10.394 16.5533 10.4806 16.2972 10.4806H7.10897ZM18.8934 10.4806V9.06857C18.8934 8.69202 18.8488 8.33772 18.7597 8.00568C18.6706 7.67362 18.537 7.36017 18.3588 7.0653C18.5549 7.03197 18.7424 7.00953 18.9213 6.998C19.1001 6.98645 19.2767 6.98067 19.4511 6.98067C20.5678 6.98067 21.4719 7.19189 22.1636 7.61433C22.8553 8.03676 23.2011 8.5858 23.2011 9.26145V9.61528C23.2011 9.86046 23.1182 10.066 22.9523 10.2318C22.7864 10.3977 22.5809 10.4806 22.3357 10.4806H18.8934ZM7.77805 8.98067H15.6396V8.8749C15.537 8.47105 15.1114 8.13131 14.3627 7.85567C13.614 7.58002 12.7268 7.4422 11.7011 7.4422C10.6755 7.4422 9.78829 7.58002 9.03957 7.85567C8.29085 8.13131 7.87035 8.47105 7.77805 8.8749V8.98067ZM3.9582 6.00952C3.48683 6.00952 3.08416 5.84194 2.7502 5.50677C2.41623 5.17161 2.24925 4.76869 2.24925 4.29802C2.24925 3.82111 2.41683 3.41823 2.752 3.08938C3.08716 2.76053 3.49008 2.5961 3.96075 2.5961C4.43766 2.5961 4.84215 2.76053 5.1742 3.08938C5.50625 3.41823 5.67227 3.82206 5.67227 4.30087C5.67227 4.76562 5.50801 5.16659 5.17947 5.50378C4.85094 5.84094 4.44385 6.00952 3.9582 6.00952ZM19.4511 6.00952C18.9844 6.00952 18.5825 5.84094 18.2453 5.50378C17.9082 5.16659 17.7396 4.76562 17.7396 4.30087C17.7396 3.82206 17.9082 3.41823 18.2453 3.08938C18.5825 2.76053 18.9851 2.5961 19.453 2.5961C19.9351 2.5961 20.3405 2.76053 20.6693 3.08938C20.9982 3.41823 21.1626 3.82111 21.1626 4.29802C21.1626 4.76869 20.9986 5.17161 20.6706 5.50677C20.3425 5.84194 19.936 6.00952 19.4511 6.00952ZM11.7045 5.19222C10.9843 5.19222 10.371 4.93983 9.8646 4.43503C9.3582 3.93023 9.105 3.31725 9.105 2.5961C9.105 1.86053 9.3574 1.24396 9.8622 0.746375C10.367 0.248791 10.98 0 11.7011 0C12.4367 0 13.0533 0.248466 13.5509 0.745399C14.0485 1.24233 14.2972 1.85811 14.2972 2.59272C14.2972 3.31292 14.0488 3.92622 13.5518 4.43262C13.0549 4.93902 12.4391 5.19222 11.7045 5.19222ZM11.7059 3.69227C12.0117 3.69227 12.27 3.58522 12.4809 3.37112C12.6918 3.15701 12.7973 2.89707 12.7973 2.5913C12.7973 2.28553 12.6922 2.0272 12.4821 1.8163C12.272 1.6054 12.0117 1.49995 11.7011 1.49995C11.3986 1.49995 11.1402 1.605 10.9261 1.8151C10.712 2.0252 10.605 2.28553 10.605 2.5961C10.605 2.89867 10.712 3.15701 10.9261 3.37112C11.1402 3.58522 11.4002 3.69227 11.7059 3.69227Z"
          fill={this.props.color}
        />
      </Svg>
    )
  }
}