import { View, Text, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native'
import { color } from '../../constants/colors'

const Home = ({ navigation }: { navigation: NavigationProp<any> }) => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <TouchableOpacity
                onPress={() => navigation.navigate("OriginScreen")}
                style={{
                    backgroundColor: color.secondary,
                    borderBottomRightRadius: 50,
                    borderBottomLeftRadius: 50,
                    flex: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 333,
                    width: '100%',
                    elevation: 6,
                    shadowColor: color.primary
                }}
            >
                <Text
                    style={{
                        fontSize: 35,
                        fontWeight: 'bold',
                        color: '#fff'
                    }}
                >Ambulance</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("VehicleHome")}
                style={{
                    backgroundColor: '#fff',
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Text
                    style={{
                        fontSize: 35,
                        fontWeight: 'bold',
                        color: color.primary
                    }}
                >Vehicle</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home