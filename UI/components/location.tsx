import { Divider } from "@rneui/themed";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Props } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";


type LocationProps = {
    _id: string;
    name: string;
    detail: string;
    onPressLocation: (name: string) => void;
};

const Location = (prop: LocationProps ) => {
    
    const [choosenLocationName, setChoosenLocationName] = useState("");
    const {_id, name , detail, onPressLocation} = prop;
    return (
        <View>
            <TouchableOpacity onPress={() => onPressLocation(name)} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginVertical: 20, marginRight: 40}}>
                  <Icon style={{textAlign: 'center', fontSize: 24, fontWeight: '400'}} name="location-arrow" color="black" />
                  <View>
                    <Text style={{fontSize: 24, fontWeight: '400', marginLeft: 30}}>{name}</Text>
                    <Text style={{fontSize: 12, fontWeight: '400', marginLeft: 30}}>{detail}</Text>
                  </View>
              </TouchableOpacity>
              <Divider />
        </View>
    );
}

export default Location;