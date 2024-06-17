import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { currentVendorSelector } from 'src/kolektivo/vendors/selector'
import { VendorWithLocation } from 'src/kolektivo/vendors/types'
import { hasValidLocation } from 'src/kolektivo/vendors/utils'

/**
 * This custom hook will return the latest vendor selected from the
 * redux store as well as its computed location. If the location of
 * the latest vendor is invalid, it will return the latest location
 * from the local state of this hook.
 */
export const useCurrentVendorLocation = () => {
  const currentVendor = useSelector(currentVendorSelector) as VendorWithLocation
  // @todo - This is a temporary solution to avoid the issue of the
  // refactoring of the map functions. This will be removed once the
  // map functions are refactored.
  const [vendorLocation, setLocation] = useState<unknown>(undefined)
  useEffect(() => {
    if (currentVendor && hasValidLocation(currentVendor)) {
      setLocation(currentVendor.location)
    }
  }, [currentVendor])
  return { currentVendor, vendorLocation }
}
