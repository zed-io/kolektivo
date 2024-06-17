import { createClient } from '@supabase/supabase-js'
import { DEFAULT_TESTNET, keyOrUndefined } from 'src/config'
import * as secretsFile from '../../../secrets.json'

const supabaseUrl = keyOrUndefined(secretsFile, DEFAULT_TESTNET, 'SUPABASE_URL')
const supabaseKey = keyOrUndefined(secretsFile, DEFAULT_TESTNET, 'SUPABASE_CLIENT_KEY')

export const supabase = createClient(supabaseUrl, supabaseKey)
