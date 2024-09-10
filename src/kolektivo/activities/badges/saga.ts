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
  const badges: BadgeDataResponse[] = []
}
