// LocationService.js
import * as Location from 'expo-location';

export const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.error('Location permission not granted');
        return null;
    }

    let location = await Location.getCurrentPositionAsync({});
    return location.coords
};

// LocationService.js
export const isOnRoadPath = (latitude: number | string, longitude: number | string) => {
    // console.warn(latitude + ", " + longitude);
    return true;
};