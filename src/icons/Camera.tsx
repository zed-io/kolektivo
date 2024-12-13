import React from 'react'
import { Path, Svg } from 'react-native-svg'

export const CameraIcon = ({ size = 24 }: { size?: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 17.1152C13.1475 17.1152 14.1202 16.7163 14.9183 15.9183C15.7162 15.1203 16.1152 14.1475 16.1152 13C16.1152 11.8525 15.7162 10.8798 14.9183 10.0818C14.1202 9.28375 13.1475 8.88475 12 8.88475C10.8525 8.88475 9.87975 9.28375 9.08175 10.0818C8.28375 10.8798 7.88475 11.8525 7.88475 13C7.88475 14.1475 8.28375 15.1203 9.08175 15.9183C9.87975 16.7163 10.8525 17.1152 12 17.1152ZM12 15.6155C11.2615 15.6155 10.641 15.3642 10.1385 14.8615C9.63583 14.359 9.3845 13.7385 9.3845 13C9.3845 12.2615 9.63583 11.641 10.1385 11.1385C10.641 10.6358 11.2615 10.3845 12 10.3845C12.7385 10.3845 13.359 10.6358 13.8615 11.1385C14.3642 11.641 14.6155 12.2615 14.6155 13C14.6155 13.7385 14.3642 14.359 13.8615 14.8615C13.359 15.3642 12.7385 15.6155 12 15.6155ZM4.30775 20.5C3.80258 20.5 3.375 20.325 3.025 19.975C2.675 19.625 2.5 19.1974 2.5 18.6923V7.30775C2.5 6.80258 2.675 6.375 3.025 6.025C3.375 5.675 3.80258 5.5 4.30775 5.5H7.3615L8.66925 4.08275C8.83342 3.90192 9.03183 3.75958 9.2645 3.65575C9.49717 3.55192 9.74233 3.5 10 3.5H14C14.2577 3.5 14.5028 3.55192 14.7355 3.65575C14.9682 3.75958 15.1666 3.90192 15.3307 4.08275L16.6385 5.5H19.6923C20.1974 5.5 20.625 5.675 20.975 6.025C21.325 6.375 21.5 6.80258 21.5 7.30775V18.6923C21.5 19.1974 21.325 19.625 20.975 19.975C20.625 20.325 20.1974 20.5 19.6923 20.5H4.30775ZM4.30775 19H19.6923C19.7821 19 19.8558 18.9712 19.9135 18.9135C19.9712 18.8558 20 18.7821 20 18.6923V7.30775C20 7.21792 19.9712 7.14417 19.9135 7.0865C19.8558 7.02883 19.7821 7 19.6923 7H15.9693L14.1345 5H9.8655L8.03075 7H4.30775C4.21792 7 4.14417 7.02883 4.0865 7.0865C4.02883 7.14417 4 7.21792 4 7.30775V18.6923C4 18.7821 4.02883 18.8558 4.0865 18.9135C4.14417 18.9712 4.21792 19 4.30775 19Z"
        fill="#1E7672"
      />
    </Svg>
  )
}