import React, { useState, useEffect } from 'react'
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome'
import { nav, popup, search, styles } from '../../Styles/styles';
import { color } from '../../../constants/colors';
import MapViewDirections from 'react-native-maps-directions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MAP_KEY } from '../../../constants/key';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native'
import { NavigationProp } from '@react-navigation/native';
import { BlurView } from 'expo-blur'
import { io } from 'socket.io-client';

const socket = io("http://54.91.227.18:8081/");




const FinalMap = ({ navigation }: { navigation: NavigationProp<any> }) => {

    socket.on("connect", () => {
        console.log(socket.id);
    });
    const [origin, setOrigin] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.008,
        longitudeDelta: 0.007,
    })
    const [destination, setDestination] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.008,
        longitudeDelta: 0.007,
    })
    const [scaleval, setScaleval] = useState("flex")
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const final = async () => {
            const jsonValue = await AsyncStorage.getItem('Origin');
            const o = jsonValue != null ? JSON.parse(jsonValue) : null;
            const jsonValue1 = await AsyncStorage.getItem('Destination');
            const d = jsonValue1 != null ? JSON.parse(jsonValue1) : null;
            setOrigin({
                latitude: o.latitude,
                longitude: o.longitude,
                latitudeDelta: 0.008,
                longitudeDelta: 0.007,
            })
            setDestination({
                latitude: d.latitude,
                longitude: d.longitude,
                latitudeDelta: 0.008,
                longitudeDelta: 0.007,
            })
        }
        final()
    }, [])

    return (
        <View style={styles.container}>
            {/* Preloader start */}
            <LottieView
                source={require("../../../assets/loader.json")}
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: color.secondary,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 55,
                    display: loaded ? 'none' : 'flex'
                }}
                autoPlay
                loop
            />
            {/* Preloader End */}

            {/* Map View Start  */}
            <MapView style={styles.map}
                region={origin}
            // mapType={MapType.satellite}
            >
                <Marker coordinate={origin} title="Marker">
                    <Image
                        source={require('../../../assets/originMarker.png')}
                        style={{
                            width: 35,
                            height: 35,
                            resizeMode: 'contain'
                        }}
                    />
                </Marker>
                <Marker coordinate={destination} title="Marker">
                    <Image
                        source={require('../../../assets/originMarker1.png')}
                        style={{
                            width: 35,
                            height: 35,
                            resizeMode: 'contain'
                        }}
                    />
                </Marker>

                {/* Direction view  */}
                {
                    (origin.longitude != 0 && destination.longitude != 0) && (
                        <MapViewDirections
                            origin={origin}
                            destination={destination}
                            apikey={MAP_KEY}
                            strokeWidth={5}
                            strokeColor={color.secondary}
                            onReady={() => {
                                setLoaded(true)
                            }}
                        />
                    )
                }

            </MapView>
            {/* Map View End  */}

            {/* Popup screen */}
            <View style={{ ...popup.popupWrap, display: scaleval }}>
                <BlurView intensity={120}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                >
                </BlurView>
                <View style={popup.card}>
                    <Text style={popup.cardTitle}>Generate Alert</Text>
                    <TouchableOpacity
                        style={{ ...popup.cardBtn }}
                        onPress={() => {
                            setScaleval("none")
                        }}
                    >
                        <Text style={popup.cardBtnTxt}>Okay</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search places End  */}
            <SafeAreaView>
                {/* Bottom Nav Start  */}
                <View style={nav.navWrap}>
                    <TouchableOpacity
                        onPress={async () => {
                            await AsyncStorage.removeItem('Destination')
                            await AsyncStorage.removeItem('Origin')
                            navigation.navigate('Home')
                        }}
                    >
                        <Icon name="home" style={[nav.icons, nav.selected]} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="compass" style={nav.icons} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="comments" style={nav.icons} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="user" style={nav.icons} />
                    </TouchableOpacity>
                </View>
                {/* Bottom Nav End  */}
            </SafeAreaView>
            <StatusBar backgroundColor={loaded ? color.primary : color.secondary} />
        </View>
    )
}

export default FinalMap