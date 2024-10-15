import Colors from 'src/styles/colors'

export enum TokenActionName {
  Send = 'Send',
  Swap = 'Swap',
  Add = 'Add',
  Withdraw = 'Withdraw',
  More = 'More',
  Transfer = 'Transfer',
}

export interface TokenAction {
  name: TokenActionName
  title: string
  details: string
  iconComponent: React.MemoExoticComponent<({ color }: { color: Colors }) => JSX.Element>
  onPress: () => void
  visible: boolean
}

export enum AssetTabType {
  Transactions = 0,
  Tokens = 1,
  Collectibles = 2,
  Positions = 3,
}
