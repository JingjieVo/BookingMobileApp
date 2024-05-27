import { Divider } from "@rneui/themed";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Props } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";


const imageLinks : any = {
    "cantho.jpg" : require('../assets/img/cantho.jpg'),
    "hanoi.jpg" : require('../assets/img/hanoi.jpg'),
    "haiphong.jpg" : require('../assets/img/haiphong.jpg'),
    "hochiminh.jpg" : require('../assets/img/hochiminh.jpg'),
    "danang.jpg" : require('../assets/img/danang.jpg'),
    "quangnam.jpg" : require('../assets/img/quangnam.jpg'),
    "angiang.jpg" : require('../assets/img/angiang.jpg'),
    "bacgiang.jpg" : require('../assets/img/bacgiang.jpg'),
    "bacninh.jpg" : require('../assets/img/bacninh.jpg'),
    "binhdinh.jpg" : require('../assets/img/binhdinh.jpg'),
    "binhphuoc.jpg" : require('../assets/img/binhphuoc.jpg'),
    "binhthuan.jpg" : require('../assets/img/binhthuan.jpg'),
    "caobang.jpg" : require('../assets/img/caobang.jpg'),
    "dongnai.jpg" : require('../assets/img/dongnai.jpg'),
    "hagiang.jpg" : require('../assets/img/hagiang.jpg'),
    "bentre.jpg" : require('../assets/img/bentre.jpg'),

}

type LocationProps = {
    _id: string;
    name: string;
    description: string;
    imgLink: any;
    onPressLocation: (name: string, description: string) => void;
};

const Location = (prop: LocationProps ) => {
    
    const [choosenLocationName, setChoosenLocationName] = useState("");
    const {_id, name , description, imgLink, onPressLocation} = prop;
    const link = imgLink
    const linkOfImage = imageLinks[link];
    return (
        <View>
            <TouchableOpacity onPress={() => onPressLocation(name, description)} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginVertical: 20, marginRight: 40}}>
                <Image
                    style={styles.locationImage}
                    source={linkOfImage}
                    />
                  <View>
                  
                    <Text style={{fontSize: 24, fontWeight: '700', marginLeft: 30, color: 'white'}}>{name}</Text>
                    <Text style={{fontSize: 12, fontWeight: '400', marginLeft: 30,marginRight: 30, fontStyle: 'italic', color: 'white'}}>{description}</Text>
                  </View>
              </TouchableOpacity>       
        </View>
    );
}


const styles = StyleSheet.create({
    locationImage: {
        width: 60,
        height: 60,
        alignSelf: 'center',
        borderRadius: 10
    }
})

export default Location;