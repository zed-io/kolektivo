import { supabase } from 'src/kolektivo/config/services'

export type ActivityModel = {
  id: string
  created_at: string
  activity_host_id: string
  activity_hosts: {
    id: string
    name: string
    wallet_address: string
  }
  stamp: string
  points: number
  banner_path: string
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
  let { data, error } = await supabase
    .from('activities')
    .select(
      `
      id,
      created_at,
      activity_host_id,
      title,
      description,
      start_date,
      end_date,
      full_address,
      banner_path,
      badge_contract_address,
      requirements,
      activity_hosts (
        id,
        created_at,
        name,
        wallet_address
      )
    `
    )
    .order('start_date', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  const result: Activity[] = []
  if (!data) {
    return result
  }

  for (let index = 0; index < data.length; index++) {
    const activity = data[index]
    result.push(translateActivityFromDatabase(activity as unknown as ActivityModel))
  }

  return result
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
    bannerPath: dbActivity.banner_path,
    title: dbActivity.title,
    description: dbActivity.description,
    startDate: dbActivity.start_date,
    endDate: dbActivity.end_date,
    fullAddress: dbActivity.full_address,
    badgeContractAddress: dbActivity.badge_contract_address,
    requirements: dbActivity.requirements,
  }
}

export const isActivityLive = (activity: Activity): boolean => {
  const startDate = new Date(activity.startDate)
  const endDate = new Date(activity.endDate)
  const now = new Date()
  return startDate <= now && now <= endDate
}
