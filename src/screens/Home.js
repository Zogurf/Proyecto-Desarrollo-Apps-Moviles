import { Text, StyleSheet, View, FlatList } from 'react-native'
import React from 'react'
import { REPORTES } from '../data/reportes.js'


export default function Home() {
    return (
        <View>
            <Text> Home </Text>

            <FlatList
                data={MIS_REPORTES}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>


    )
}

const styles = StyleSheet.create({})