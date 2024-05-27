import { Divider } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Props } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";


type seatProps = {
    _id: string;
    isBought: boolean;
    seatCode: string;
    onPressSeat: (seat: any) => void;
};

const Seat = (prop: seatProps ) => {
    
    const {_id, isBought, seatCode, onPressSeat} = prop;
    return (
        <View>
            <TouchableOpacity onPress={() => onPressSeat(prop)} disabled={isBought ? true : false}  style={[isBought ? styles.disableButton : styles.enableButton]}>
                <Text style={[isBought ? styles.disableText : styles.enableText]}>{seatCode}</Text>  
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    enableButton: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: 50,
        width: 50,
        
        backgroundColor: '#56e865',
        borderRadius: 10,
    },
    disableButton: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: 50,
        width: 50,
        
        backgroundColor: '#D9DADF',
        borderRadius: 10,
    },
    enableText: {alignSelf: 'center', color: 'white'},
    disableText: {alignSelf: 'center', color: 'black'},
})

export default Seat;