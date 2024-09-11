import { Address } from 'viem'

export type BadgeDataResponse = {
  contractAddress: Address
  title: string
  description?: string
  level: number
  stamps: {
    contractAddress: Address
    title: string
    description?: string
    amount: number
  }
}

export async function fetchBadgesForAddress(address: string): Promise<any> {
  // eslint-disable-next-line no-unused-vars
  const badges: BadgeDataResponse[] = []

  // @todo change logic Dummy usage to avoid "value never read" warning
  badges.length
}
