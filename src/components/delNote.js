import React from "react";
import { Alert } from "react-native";  // Add missing import for Alert
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';

async function delNote(note, navigation) {  // Add note and navigation as arguments
    if (note.id === undefined) {
        Alert.alert(
            'ERROR',
            'ID is undefined',
            [
                {
                    text: 'OK',
                    style: 'cancel'
                }
            ]
        );
    } else {
        try {
            let data = JSON.parse(await AsyncStorage.getItem('notes'));  // Corrected JSON.parse
            for (let i = 0; i < data.length; i++) {  // Corrected data.length
                if (data[i].id === note.id) {
                    data.splice(i, 1);  // Corrected splice to remove the item at the right index
                    break;  // Stop loop once the note is found and deleted
                }
            }

            if (note.notificationId !== null) {  // Corrected notificationId (you had notificationsId)
                await Notifications.cancelAllScheduledNotificationsAsync(note.notificationId);
            }

            await AsyncStorage.setItem('notes', JSON.stringify(data));
            navigation.goBack();
        } catch (err) {
            console.log(err);
            Alert.alert(
                'ERROR',
                'There is an error!',
                [
                    {
                        text: 'OK',
                        style: 'cancel'
                    }
                ]
            );
        }
    }
}

export default delNote;