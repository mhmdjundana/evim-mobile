import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, View, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />

export const RnPaperCardFull = () => {
  return (
    <Card 
    style={styles.card}
    elevation={1}
  >
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} style={styles.cardTitle} />
    <Card.Content style={styles.cardContent}>
      <Title>Card title</Title>
      <Paragraph>Card content</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions style={styles.cardActions}>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
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