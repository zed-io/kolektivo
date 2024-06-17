import { filter } from 'lodash'
import { createSelector } from 'reselect'
import { Vendor, Vendors, VendorWithLocation } from 'src/kolektivo/vendors/types'
import { hasValidLocation } from 'src/kolektivo/vendors/utils'
import { RootState } from 'src/redux/reducers'

export const vendorsSelector = (state: RootState): Vendors => (state as any).vendors?.allVendors

export const vendorLoadingSelector = (state: RootState): boolean => (state as any).vendors?.loading

export const currentVendorSelector = (state: RootState): Vendor | undefined =>
  (state as any).vendors?.currentVendor

export const vendorsWithLocationSelector = createSelector([vendorsSelector], (vendors: Vendors) => {
  return filter(vendors, (vendor: Vendor) =>
    hasValidLocation(vendor as VendorWithLocation)
  ) as VendorWithLocation[]
})
