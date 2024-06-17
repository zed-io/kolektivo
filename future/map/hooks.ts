import { useEffect, useRef } from 'react'
import MapView from 'react-native-maps'
import { useSelector } from 'react-redux'
import { FOREST_OFFSET, LOCALE_OFFSET } from 'src/kolektivo/map/constants'
import { currentForestSelector } from 'src/kolektivo/map/selector'
import { useCurrentVendorLocation } from 'src/kolektivo/vendors/hooks'

export const useMap = () => {
  const mapRef = useRef<MapView>(null)
  const currentFoodForest = useSelector(currentForestSelector)
  const { currentVendor, vendorLocation } = useCurrentVendorLocation()

  useEffect(() => {
    vendorLocation &&
      mapRef.current?.animateToRegion({
        ...vendorLocation,
        ...LOCALE_OFFSET,
      })
  }, [vendorLocation])

  useEffect(() => {
    currentFoodForest &&
      currentFoodForest.ingress &&
      mapRef.current?.animateToRegion({
        ...currentFoodForest.ingress,
        ...FOREST_OFFSET,
      })
  }, [currentFoodForest])

  return { mapRef, currentVendor, vendorLocation }
}
