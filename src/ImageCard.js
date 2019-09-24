import React from 'react'
import { View, Text, StyleSheet} from 'react-native'

const ImageCard = ({ data }) => {
    return (
        <View style={style.container}>
            <Text style={style.h1}>{data.cardColor}</Text>
            <Text style={style.h1}>{data.cardPrice}</Text>
            <Text style={style.h1}>{data.cardName}</Text>
            
        </View>
    )
}


const style = StyleSheet.create({
    container: {
        width: 150,
        height: 300,
        borderColor: 'green',
        borderWidth: 1,
        margin: 10
    },
    h1: {
        fontSize: 18,
        alignSelf: 'center',
        textAlign: 'center'
    }
})

export {ImageCard}