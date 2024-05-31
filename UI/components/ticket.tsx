import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


type ticketProps = {
  guestName: String,
  identifyNumber: String,
  ticket: {
      _id: String,
      tripId: String,
      available: boolean,
      isBought: boolean,
      seatCode: String,
  },
  dateBooking: String,
  tripId: String,
  departureTime: String,
  date: String,
  departure: String,
  departureDescriptions: String,
  destination: String,
  destinationDescriptions: String,
  estimatedTime: String,
  arrivalTime: String,
  arrivalDate: String,
  driverName: String,
  coachLicensePlate: String,
  billId: String,
  _id: String
  onPressTicket: (ticket : any) => void,
}

const Ticket = (props : ticketProps) => {
  const {guestName, identifyNumber, ticket, dateBooking, tripId, departureTime, date, departure, departureDescriptions, destination, destinationDescriptions, estimatedTime, arrivalTime, arrivalDate, driverName, coachLicensePlate, billId, _id, onPressTicket} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPressTicket(props)}>
      <View style={styles.leftContainer}>
        <Text style={styles.timeText}>{departureTime}</Text>
        <Text style={styles.dateText}>{date}</Text>
        <Text style={styles.statusText}>Thành Công</Text>
      </View>
      <View style={styles.middleLine} />
      <View style={styles.rightContainer}>
        <Text style={styles.ticketIdText}>Mã vé: {ticket._id}</Text>
        <Text style={styles.locationText}><Icon name="location-outline" color="white" style={{fontSize: 20, color: 'white', fontWeight: '900', alignSelf: 'center'}}/> {departure}</Text>
        <Text style={styles.locationText}><Icon name="location-sharp" color="#1CA653" style={{fontSize: 20, color: 'white', fontWeight: '900', alignSelf: 'center'}}/> {destination}</Text>
        <Text style={styles.seatCodeText}>Số ghế: {ticket.seatCode}</Text>
        <Text style={styles.arrivalText}>Giờ tới bến: {arrivalTime} {arrivalDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#1CA653',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: '#1CA653',
    shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  dateText: {
    fontSize: 10,
    color: 'white',
  },
  statusText: {
    fontSize: 14,
    color: 'white',
    marginTop: 10,
  },
  middleLine: {
    width: 1,
    backgroundColor: '#078511',
    marginHorizontal: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: 'white'
  },
  rightContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  ticketIdText: {
    fontSize: 12,
    color: 'white',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 12,
    color: 'white',
  },
  seatCodeText: {
    fontSize: 12,
    color: 'white',
    marginTop: 10,
  },
  arrivalText: {
    fontSize: 12,
    color: 'white',
    marginTop: 5,
  },
});

export default Ticket;
