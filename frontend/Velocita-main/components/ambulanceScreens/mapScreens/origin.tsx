import React, { useState, useEffect } from 'react'
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getLocationAsync, isOnRoadPath } from '../../../api/locationService';
import { NavigationProp } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { nav, search, styles } from '../../Styles/styles';
import { color } from '../../../constants/colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MAP_KEY } from '../../../constants/key';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from "lottie-react-native"


const OriginMap = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [origin, setOrigin] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.008,
        longitudeDelta: 0.007,
    })
    const [name, setName] = useState("name")
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const handleLocationChange = async (name: string) => {
            const location = await getLocationAsync();
            if (!location) return;
            const { latitude, longitude } = location;

            const current_location = {
                coordinates: {
                    latitude: latitude,
                    longitude: longitude,
                    pincode: 560087
                }
            }

            setOrigin({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.008,
                longitudeDelta: 0.007,
            })
            setLoaded(true)
            // console.log(`(amb.) ${na} ↓`)
            // console.log(current_location)
        };


        // Set up location tracking
        const locationTask = setInterval(() => handleLocationChange(name), 10000);
        return () => clearInterval(locationTask);
    }, [name]);
    return (
        <View style={styles.container}>
            <SafeAreaView style={{position: 'relative'}}>
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

                {/* Go with live location button  */}
                <TouchableOpacity
                    style={styles.searchBtn}
                    onPress={async () => {
                        const jsonValue = JSON.stringify(origin);
                        await AsyncStorage.removeItem('Origin')
                        await AsyncStorage.setItem('Origin', jsonValue);
                        navigation.navigate('DestinationScreen')
                    }}
                >
                    <Icon name="search" style={{ color: color.search, fontSize: 27, fontWeight: '100' }} />
                </TouchableOpacity>

                {/* Map View Start  */}
                <MapView style={styles.map}
                    region={origin}
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
                </MapView>
                {/* Map View End  */}

                {/* Search places Start  */}
                {/* <View style={search.pickupSearch}> */}
                <GooglePlacesAutocomplete
                    placeholder='Your current location'
                    styles={{
                        container: {
                            flex: 0,
                            position: 'absolute',
                            top: 10,
                            left: 0,
                            marginHorizontal: "3%",
                            width: '94%'
                        },
                        textInput: {
                            fontSize: 18,
                            height: 50,
                            borderRadius: 30,
                            elevation: 6,
                            shadowColor: color.primary,
                            paddingLeft: 30
                        }
                    }}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    enablePoweredByContainer={false}
                    onPress={(data, details) => {
                        // const latitude = details.geometry.location.lat;
                        // const longitude = details.geometry.location.lng;
                        console.log(details.place_id)
                        // console.log(`${latitude}, ${longitude}`)
                        const fetchCoordinates = async () => {
                            console.log("Hello")
                            const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${details.place_id}&key=${MAP_KEY}`;
                            try {
                                const response = await fetch(apiUrl);
                                const placeDetails = await response.json();
                                const coordinates = placeDetails.result.geometry.location;
                                console.log("Latitude:", coordinates.lat);
                                console.log("Longitude:", coordinates.lng);
                                const lat = coordinates.lat
                                const lng = coordinates.lng
                                const obj = {
                                    latitude: lat,
                                    longitude: lng,
                                    latitudeDelta: 0.008,
                                    longitudeDelta: 0.007,
                                }
                                const jsonValue = JSON.stringify(obj);
                                await AsyncStorage.removeItem('Origin')
                                await AsyncStorage.setItem('Origin', jsonValue);
                                navigation.navigate('DestinationScreen')
                            } catch (error) {
                                console.error("Error fetching coordinates:", error);
                            }
                        };
                        fetchCoordinates()
                    }}
                    query={{
                        key: MAP_KEY,
                        language: 'en',
                    }}
                />
                {/* </View> */}
                {/* Search places End  */}
                <SafeAreaView>
                    {/* Bottom Nav Start  */}
                    <View style={nav.navWrap}>
                        <TouchableOpacity>
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
            </SafeAreaView>
        </View>
    )
}

export default OriginMap