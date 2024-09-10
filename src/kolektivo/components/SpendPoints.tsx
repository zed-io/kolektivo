import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Donate from 'src/kolektivo/icons/Donate'
import Groceries from 'src/kolektivo/icons/Groceries'
import More from 'src/kolektivo/icons/More'
import Restaurants from 'src/kolektivo/icons/Restaurant'
import { typeScale } from 'src/styles/fonts'

const SpendPoints = () => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Spend Points</Text>

      {/* Grid of blocks */}
      <View style={styles.grid}>
        <TouchableOpacity style={styles.block}>
          <View style={styles.icon}>
            <Donate color="#1E7672" />
          </View>
          <Text style={styles.blockText}>Donate</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.block}>
          <View style={styles.icon}>
            <Restaurants color="#1E7672" />
          </View>
          <Text style={styles.blockText}>Restaurant</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.block}>
          <View style={styles.icon}>
            <Groceries color="#1E7672" />
          </View>
          <Text style={styles.blockText}>Groceries</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.block}>
          <View style={styles.icon}>
            <More color="#1E7672" />
            <Text style={styles.blockText}>More</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    ...typeScale.labelLarge,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  block: {
    width: '48%',
    height: 60, // Reduced height
    backgroundColor: '#E7F6F6',
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row', // Align icon and text in a row
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  blockText: {
    ...typeScale.labelMedium,
  },
})

export default SpendPoints
