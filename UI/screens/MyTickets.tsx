
import { NavigationContainer } from '@react-navigation/native';
import { Image, StyleSheet, Text, View } from 'react-native';
import Ticket from '../components/ticket';

const props = {
  ticketId : "Meo",
  departureTime: "Meo",
  date: "Meo",
  departure: "Meo",
  destination: "Meo",
  seatCode: "Meo",
  arrivalTime: "Meo",
  arrivalDate: "Meo",
}

function MyTickets() {
  return (
    <View>
      <Image
          style={styles.tinyLogo}
          source={require('../assets/img/logo.png')}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    position:'relative',
    width: 150,
    height: 150,
    alignSelf: 'center',
  }
})

export default MyTickets;