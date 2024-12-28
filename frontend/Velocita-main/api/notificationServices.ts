import * as Notifications from "expo-notifications";


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export async function schedulePushNotification(title, body) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: title, //phishing or safe
            body: body,
            data: { data: "goes here" },
            // icon: require('')
        },
        trigger: { seconds: 1 },
    });
}
