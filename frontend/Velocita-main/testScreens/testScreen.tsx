import React, { useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { PanGestureHandler, NativeViewGestureHandler } from 'react-native-gesture-handler';

const SwipeableButton = () => {
    const [translateX, setTranslateX] = useState(0);

    const handlePanGesture = (evt) => {
        const { translationX } = evt.nativeEvent;
        setTranslateX(translationX);

        if (translationX > 100) {
            console.log("Right")
            setTranslateX(0);
        } else if (translationX < -100) {
            console.log("left")
            setTranslateX(0);
        }
    };

    return (
        <PanGestureHandler onGestureEvent={handlePanGesture}>
            <NativeViewGestureHandler>
                <View style={[{ transform: [{ translateX }] }]}>
                    <Button title="Swipe Me" onPress={() => console.log('Button pressed')} />
                </View>
            </NativeViewGestureHandler>
        </PanGestureHandler>
    );
};

export default SwipeableButton
