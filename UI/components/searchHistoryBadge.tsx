import { Divider } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Props } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome6";
import dateHandler from "../module/dateHandler";


type BadgeProps = {
    departure: string;
    departureDescriptions: string;
    destination: string;
    destinationDescriptions: string;
    date: string;
    onPressBadge: (departure: string, departureDescriptions: string, destination: string, destinationDescriptions: string, date: string) => void;
};

const SearchHistoryBadge = (prop: BadgeProps ) => {
    const {departure, departureDescriptions, destination, destinationDescriptions, date, onPressBadge} = prop;
    return (
        <View style={[]}>
            <TouchableOpacity onPress={() => onPressBadge(departure, departureDescriptions, destination, destinationDescriptions, date)} style={[styles.badge,{flexDirection: 'row', alignItems: 'center', marginVertical: 25, paddingRight: 30}]}>
                  <Icon style={{textAlign: 'center', fontSize: 20, fontWeight: '900'}} name="ticket-simple" color="#56e865" />
                  <View>
                    <Text style={{fontSize: 16, fontWeight: '700', marginLeft: 10}}>{departure}</Text>
                    <Text style={{fontSize: 16, fontWeight: '700', marginLeft: 10}}>{destination}</Text>
                    <Text style={{fontSize: 12, fontWeight: '400', marginLeft: 10, fontStyle: 'italic'}}>{dateHandler.formatDate(date)}</Text>
                  </View>
              </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    }
})

export default SearchHistoryBadge;