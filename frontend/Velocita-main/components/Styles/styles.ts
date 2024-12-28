import { StyleSheet } from "react-native";
import { color } from "../../constants/colors";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        position: 'relative',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    touch: {
        position: 'absolute',
        bottom: 20,
        zIndex: 333,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        gap: 30,
    },
    txt: {
        fontSize: 20,
        color: 'white',
        backgroundColor: "#bd0808e8",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    searchBtn: {
        position: 'absolute',
        top: 20,
        right: '7%',
        zIndex: 54
    }
});

export const popup = StyleSheet.create({
    popupWrap: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#95f7d5bd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 55,
    },
    card: {
        width: '80%',
        height: '40%',
        backgroundColor: color.secondary,
        borderRadius: 27,
        elevation: 20,
        shadowColor: color.grey,
        display: 'flex',
        gap: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardBtn: {
        padding: 10,
        paddingHorizontal: 30,
        borderRadius: 14,
        elevation: 16,
        shadowColor: color.primary,
        backgroundColor: '#fff'
    },
    cardBtnTxt: {
        color: color.secondary,
        fontSize: 25,
        fontWeight: 'bold'
    },
    cardTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 40,
        color: '#fff'
    }
})

export const nav = StyleSheet.create({
    navWrap: {
        position: 'absolute',
        bottom: 10,
        padding: 10,
        width: '96%',
        marginHorizontal: '2%',
        backgroundColor: color.primary,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    icons: {
        fontSize: 30,
        color: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    selected: {
        backgroundColor: color.secondary,
        color: '#fff',
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 10,
    }
})

export const search = StyleSheet.create({
    pickupSearch: {
        position: 'absolute',
        top: 26,
        width: '94%',
        marginHorizontal: '3%',
        overflow: 'hidden',
        borderRadius: 30,
        height: 50,
        backgroundColor: '#fff',
        paddingLeft: 25
    }
})