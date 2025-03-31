import React from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import updateNote from "./updateNote";

async function SaveNote(note, navigation){
    async function getKey(){
        const storedKey = await AsyncStorage.getItem('0');
        if(storedKey === null){
            await AsyncStorage.setItem('0', '1');
            return 1;
        }else{
            const key = (Number(storedKey) + 1).toString();
            await AsyncStorage.setItem('0', key);
            return key;
        }
    }

    if (!note.title || !note.note) {
        Alert.alert('ERROR', 'There is an error!', [{ text: 'OK', style: 'cancel' }]);
        return;
    }

    try {
        let storedNotes = await AsyncStorage.getItem('notes');
        let data = storedNotes ? JSON.parse(storedNotes) : [];

        if (!Array.isArray(data)) {
            data = [data]; // Convert single object to array if needed
        }

        if (note.id) {
            // Updating an existing note
            data = updateNote(data, note);
        } else {
            // Creating a new note
            note.id = await getKey();
            data.push(note);
        }

        await AsyncStorage.setItem('notes', JSON.stringify(data));
    } catch (err) {
        console.log(err);
        Alert.alert('ERROR', 'Enter some information before saving!', [{ text: 'OK', style: 'cancel' }]);
    }
}

export default SaveNote;