import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'
import Colors from 'src/styles/colors'

interface Props {
  color?: string
}

export function Help({ color }: Props) {
  return (
    <Svg testID="Help" width={32} height={32} viewBox="0 0 32 32" fill="none">
      <Circle cx={16} cy={16} r={11} stroke={color} strokeWidth={2} />
      <Path
        d="M15.753 19.546a.845.845 0 01-.836-.807c-.02-.482-.023-.962.123-1.415.17-.53.412-.959.726-1.287a5.91 5.91 0 011.13-.907c.395-.248.726-.574.995-.977.27-.403.404-.883.404-1.441 0-.46-.103-.858-.31-1.195a2.113 2.113 0 00-.827-.78 2.42 2.42 0 00-1.15-.275c-.367 0-.721.08-1.062.24-.341.159-.626.41-.854.752a2.136 2.136 0 00-.26.555c-.134.43-.488.787-.938.787-.487 0-.886-.41-.777-.885a3.616 3.616 0 011.908-2.461c.596-.3 1.257-.45 1.983-.45.79 0 1.476.164 2.058.492a3.44 3.44 0 011.359 1.35c.323.572.484 1.223.484 1.954 0 .778-.166 1.444-.498 1.997a4.205 4.205 0 01-1.385 1.392c-.395.258-.71.53-.948.816-.238.28-.41.616-.518 1.005-.066.24-.069.486-.053.734a.746.746 0 01-.754.806z"
        fill={color}
      />
      <Circle cx={15.735} cy={22.099} r={1.098} fill={color} />
    </Svg>
  )
}

Help.defaultProps = {
  color: Colors.gray3,
}

export default React.memo(Help)
