import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


type props = {
    ticketId : String,
    departureTime: String,
    date: String,
    departure: String,
    destination: String,
    seatCode: String,
    arrivalTime: String,
    arrivalDate: String,
    onPressTicket: () => void,
}

const Ticket = (props : props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.timeText}>{props.departureTime}</Text>
        <Text style={styles.dateText}>{props.date}</Text>
        <Text style={styles.statusText}>Thành Công</Text>
      </View>
      <View style={styles.middleLine} />
      <View style={styles.rightContainer}>
        <Text style={styles.ticketIdText}>Mã vé: {props.ticketId}</Text>
        <Text style={styles.locationText}><Icon name="location-outline" color="#1CA653" style={{fontSize: 20, color: '#1CA653', fontWeight: '900', alignSelf: 'center'}}/> {props.departure}</Text>
        <Text style={styles.locationText}><Icon name="location-sharp" color="#1CA653" style={{fontSize: 20, color: '#1CA653', fontWeight: '900', alignSelf: 'center'}}/> {props.destination}</Text>
        <Text style={styles.seatCodeText}>Số ghế: {props.seatCode}</Text>
        <Text style={styles.arrivalText}>Giờ tới bến: {props.arrivalTime} {props.arrivalDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#00A859',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
  },
  leftContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A859',
  },
  dateText: {
    fontSize: 16,
    color: '#555',
  },
  statusText: {
    fontSize: 16,
    color: '#00A859',
    marginTop: 10,
  },
  middleLine: {
    width: 1,
    backgroundColor: '#00A859',
    marginHorizontal: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: '#00A859'
  },
  rightContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  ticketIdText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 16,
    color: '#000',
  },
  seatCodeText: {
    fontSize: 16,
    color: '#000',
    marginTop: 10,
  },
  arrivalText: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
  },
});

export default Ticket;
