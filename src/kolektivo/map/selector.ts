import { LatLng } from 'react-native-maps'
import { MapCategory } from 'src/kolektivo/map/constants'
import { FoodForest } from 'src/kolektivo/map/types'
import { Vendor, VendorWithLocation } from 'src/kolektivo/vendors/types'
import { RootState } from 'src/redux/reducers'

export const searchQuerySelector = (state: RootState): string => state.map.searchQuery

export const filteredVendorsSelector = (state: RootState): (Vendor | VendorWithLocation)[] =>
  state.map.filteredVendors

export const currentMapCategorySelector = (state: RootState): MapCategory[] => state.map.mapCategory

export const foodForestsSelector = (state: RootState): FoodForest[] =>
  Object.values(state.map.allFoodForests)

export const currentForestSelector = (state: RootState) => state.map.currentFoodForest
export const userLocationSelector = (state: RootState): LatLng => state.map.userLocation as LatLng
