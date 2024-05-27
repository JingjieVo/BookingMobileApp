import { Divider } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Props } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import timeHandler from "../module/timeHandler";
import dateHandler from "../module/dateHandler";

type tripProps = {
    _id: string;
    departure: string;
    departureTime: string;
    destination: string;
    date: string;
    coachLicensePlate: string;
    driverName: string,
    tickets: any[];
    estimatedTime : number,
    tripPrice : number
    onPressTrip: (trip : any) => void;
};

const Trip = (prop: tripProps ) => {
    const {_id, departure, departureTime , destination, date, coachLicensePlate, driverName, tickets, estimatedTime, tripPrice, onPressTrip} = prop;
    return (
        <TouchableOpacity onPress={() => onPressTrip(prop)} style={[ styles.trip,{flexDirection: 'row', justifyContent: 'space-around', margin:16,marginVertical: 10, paddingVertical: 20, paddingLeft: 20, backgroundColor: 'white', borderRadius: 20}]}>
                    <View>
                            <View style={{flexDirection: 'row'}}>
                                <Icon name="bus" style={{ fontSize: 20}}></Icon>
                                <Text style={{color: '#56e865', fontSize: 20}}>  VietTravel ({prop.coachLicensePlate})</Text>
                            </View>
                            <Text style={{fontStyle: 'italic', marginTop: 10}}>Thời gian ước tính khoảng: {timeHandler.convertHour(estimatedTime)}</Text>
                            <View>
                            <Text style={{fontSize: 13, paddingVertical: 5, fontStyle: 'italic', color: 'black', maxWidth: 300}}>{departureTime} ({dateHandler.formatVNDateForTrip(date)}) <Icon style={{fontSize: 16, color: 'gray'}} name="long-arrow-right"></Icon> {timeHandler.addHours(departureTime, estimatedTime)} ({dateHandler.toTimeDate(departureTime, date, estimatedTime)})</Text>
                            <Text style={{fontSize: 16, fontStyle: 'italic', color: 'black', maxWidth: 300, fontWeight: '200'}}>({departure}) <Icon style={{fontSize: 16, color: 'gray'}} name="long-arrow-right"></Icon> ({destination})</Text>      
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
                                    <View > 
                                        <Text style={{color: '#ff924f', fontSize: 16}}><Icon name="dollar" style={{fontWeight: '900', color: '#ff924f', fontSize: 16}}></Icon> {tripPrice}VND</Text>
                                    </View>
                                    <Icon name="angle-double-right" style={{fontSize: 20}}></Icon>
                                </View>    
                            </View>  
                        
                    </View>
                    
                
              <Divider />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    trip: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
});

export default Trip;