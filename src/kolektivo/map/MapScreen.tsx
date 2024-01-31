import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { map } from 'lodash'
import React, { useRef } from 'react'
import { Platform, StyleSheet } from 'react-native'
import MapView, { Geojson } from 'react-native-maps'
import Animated from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import MapBottomSheet from 'src/kolektivo/map/MapBottomSheet'
import { GMAP_STYLE, LOCALE_REGION, MapCategory } from 'src/kolektivo/map/constants'
import { useMap } from 'src/kolektivo/map/hooks'
import { currentMapCategorySelector, foodForestsSelector } from 'src/kolektivo/map/selector'
import { FoodForest } from 'src/kolektivo/map/types'
import { vendorsWithLocationSelector } from 'src/kolektivo/vendors/selector'
import { VendorWithLocation } from 'src/kolektivo/vendors/types'
import DrawerTopBar from 'src/navigator/DrawerTopBar'
import { Screens } from 'src/navigator/Screens'
import { StackParamList } from 'src/navigator/types'
import Colors from 'src/styles/colors'

type Props = NativeStackScreenProps<StackParamList, Screens.MapScreen>
export default function MapScreen({ route }: Props) {
  const { targetId: _targetId } = route.params || {}
  const scrollPosition = useRef(new Animated.Value(0)).current
  const dispatch = useDispatch()
  const mapCategory = useSelector(currentMapCategorySelector)
  const forests = useSelector(foodForestsSelector)
  const vendors = useSelector(vendorsWithLocationSelector)
  const { mapRef, ...vendorData } = useMap()
  const { currentVendor: _currentVendor } = vendorData

  const vendorLocationMarkers = () => {
    if (!mapCategory.includes(MapCategory.Vendor)) return
    return (
      <>
        {vendors.map((vendor: VendorWithLocation) => {
          return null
          // return (
          //   <VendorMarker
          //     title={vendor.title}
          //     coordinate={vendor.location}
          //     key={vendor.title}
          //     description={vendor.subtitle}
          //     onPress={() => dispatch(setCurrentVendor(vendor))}
          //     color={currentVendor === vendor ? Colors.primary : Colors.primaryDisabled}
          //   />
          // )
        })}
      </>
    )
  }

  const forestLocationMarkers = () => {
    if (!mapCategory.includes(MapCategory.FoodForest)) return // forest is selected
    return (
      <>
        {map(forests, (forest: FoodForest) => {
          return null
          // return (
          //   <ForestMarker
          //     title={forest.title}
          //     coordinate={forest.ingress || { latitude: 0, longitude: 0 }}
          //     key={forest.title}
          //     onPress={() => dispatch(setFoodForest(forest))}
          //   />
          // )
        })}
      </>
    )
  }

  const renderGeojsonLayer = () => {
    if (!mapCategory.includes(MapCategory.FoodForest)) return
    return (
      <>
        {map(forests, (forest: FoodForest) => {
          return (
            <Geojson
              geojson={forest.data}
              strokeColor={Colors.successLight}
              strokeWidth={StyleSheet.hairlineWidth}
              fillColor={Colors.white}
            />
          )
        })}
      </>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        initialRegion={LOCALE_REGION}
        customMapStyle={Platform.OS === 'android' ? GMAP_STYLE : undefined}
      >
        {forests && renderGeojsonLayer()}
        {forests && forestLocationMarkers()}
        {vendors && vendorLocationMarkers()}
      </MapView>
      <DrawerTopBar scrollPosition={scrollPosition} />
      <MapBottomSheet mapRef={mapRef} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})
