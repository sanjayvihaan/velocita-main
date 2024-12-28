import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../home/Home'
import AmbulanceHome from '../ambulanceScreens/ambulanceHome'
import VehicleHome from '../vehicleScreens/vehicleHome'
import OriginMap from '../ambulanceScreens/mapScreens/origin'
import DestinationMap from '../ambulanceScreens/mapScreens/destination'
import FinalMap from '../ambulanceScreens/mapScreens/final'
import NearByAmbulance from '../vehicleScreens/nearbyAmbulance'

const RouteManager = () => {
    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Home'
            >
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="AmbulanceHome" component={AmbulanceHome} options={{ headerShown: false }} />
                <Stack.Screen name="VehicleHome" component={VehicleHome} options={{ headerShown: false }} />
                <Stack.Screen name="OriginScreen" component={OriginMap} options={{ headerShown: false }} />
                <Stack.Screen name="DestinationScreen" component={DestinationMap} options={{ headerShown: false }} />
                <Stack.Screen name="FinalMapScreen" component={FinalMap} options={{ headerShown: false }} />
                <Stack.Screen name="NearByAmbulance" component={NearByAmbulance} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RouteManager