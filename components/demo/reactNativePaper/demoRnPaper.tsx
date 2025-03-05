import { View, StyleSheet, Dimensions } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { RnPaperCardFull } from './cards';

const { height } = Dimensions.get('window')

export default function DemoRnPaper() {

  return (
    <View style={styles.container}>
      <RnPaperCardFull />
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
    minHeight: height,
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