// import Onboarding from 'react-native-onboarding-swiper';
import { Image, View,  } from 'react-native';
import React, { useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { color } from '../../constants/colors'
import LottieView from 'lottie-react-native'
import { StatusBar } from 'expo-status-bar';

// import screeOneImg from '../'


const screeOne = ({ navigation }: { navigation: NavigationProp<any> }) => {

    const [loaded, setLoaded] = useState(false)
    setTimeout(()=> {
        setLoaded(true)
    })
    return(

        <View style={{flex: 1, width: '100%'}}>
            {/* Preloader start */}
            <LottieView
                source={require("../../assets/loader.json")}
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
        <Onboarding
            onDone={() => {
                navigation.navigate("Home")
            }}
            pages={[
            {
                backgroundColor: color.primary,
                image: <Image source={require('../../assets/screenOne.png')} 
                style={{
                    width:280,
                    height:280,
                    borderRadius: 100
                }}
            />,
            title: 'Enhancing Safety on the Roads',
            subtitle: '',
        },

        {
        backgroundColor: color.primary,
        image: <Image source={require('../../assets/screenTwo.png')} 
        style={{
            width: 280,
            height: 280,
            borderRadius: 14
        }}
        />,
        title: 'Become a Life Saver',
        subtitle: 'Join us in creating a community committed to helping those in need and making our roads safer for everyone.',
        subTitleStyles: {color: '#fff', fontWeight: 'bold'}
        }
        // ...

        ]}
        />
        <StatusBar backgroundColor={color.primary}/>
        </View>
    )
    }
export default screeOne