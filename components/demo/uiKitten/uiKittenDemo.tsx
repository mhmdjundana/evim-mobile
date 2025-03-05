import { View, StyleSheet, Dimensions } from 'react-native';
// import { UiKittenCardFull } from './cards';
import { CardAccessoriesShowcase } from './cards';
import { Text } from 'react-native-paper';

const { height, width } = Dimensions.get('window')

export default function UiKittenDemo() {

  return (
    <View style={styles.container}>
      <CardAccessoriesShowcase />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    // backgroundColor: 'yellow',
    minHeight: height,
    minWidth: width,
  },
  card: {
    width: '90%',
    margin: 20,
    backgroundColor: '#FFFFFF'
  },
  cardTitle: {
    // backgroundColor: "#ddd"
  },
  cardContent: {
    backgroundColor: "#bbb"
  },
  cardActions: {
    // backgroundColor: "#ddd"

  }
})