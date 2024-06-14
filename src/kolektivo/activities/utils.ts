import { map } from 'lodash'
import { supabase } from 'src/kolektivo/config/services'

export type Activity = {
  id: string
  createdAt: string
  activityHostId: string
  activityHost: {
    id: string
    name: string
    walletAddress: string
  }
  title: string
  description: string
  startDate: string
  endDate: string
  fullAddress: string
  badgeContractAddress: string
  requirements: string
}

type ActivityModel = {
  id: string
  created_at: string
  activity_host_id: string
  activity_hosts: {
    id: string
    name: string
    wallet_address: string
  }
  title: string
  description: string
  start_date: string
  end_date: string
  full_address: string
  badge_contract_address: string
  requirements: string
}

export const getActivities = async (): Promise<Activity[]> => {
  // eslint-disable-next-line prefer-const
  let { data, error } = await supabase.from('activities').select(`
      id,
      created_at,
      activity_host_id,
      title,
      description,
      start_date,
      end_date,
      full_address,
      badge_contract_address,
      requirements,
      activity_hosts (
        id,
        created_at,
        name,
        wallet_address
      )
    `)
  if (error) {
    throw new Error(error.message)
  }

  data = map(data, (activity: ActivityModel) => translateActivityFromDatabase(activity))

  return data
}

export const getActivityHostById = async (id: string) => {
  // eslint-disable-next-line prefer-const
  const { data, error } = await supabase.from('activity_hosts').select('*').eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  if (data) {
    return data[0]
  } else {
    return { name: 'Unknown' }
  }
}

const translateActivityFromDatabase = (dbActivity: ActivityModel): Activity => {
  return {
    id: dbActivity.id,
    createdAt: dbActivity.created_at,
    activityHostId: dbActivity.activity_host_id,
    activityHost: {
      id: dbActivity.activity_hosts.id,
      name: dbActivity.activity_hosts.name,
      walletAddress: dbActivity.activity_hosts.wallet_address,
    },
    title: dbActivity.title,
    description: dbActivity.description,
    startDate: dbActivity.start_date,
    endDate: dbActivity.end_date,
    fullAddress: dbActivity.full_address,
    badgeContractAddress: dbActivity.badge_contract_address,
    requirements: dbActivity.requirements,
  }
}
