import React, {useState} from "react";
import {Modal, Text, TouchableOpacity, View, Platform} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import Style from "./style";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowAlert: true
    })
});

const ModalNotification = ({
    modalVisible,
    setModalVisible,
    date,
    setDate,
    note,
    setNote,
}) => {
    const [showPicker, setShowPicker] = useState({
        showDate: false,
        showHours: false,
    });
    async function schedulePushNotification(){
        const id = await Notifications.schedulePushNotification({
            content: {
                title: `Notification: ${note.title.substr(0, 40)}`,
                body: note.note.substr(0, 50),
            },
            trigger: {
                date: date,
            }
        });
        setNote({...note, notificationId: id});
    }
    const onChange = (event, selectedDate) => {
        setShowPicker({showDate: false, showHours: false});
        const currentDate = selectedDate || date;
        setDate(currentDate);
    }

    const manual = new Date();


    const currentFormattedData = (type) => {
        const day = manual.getDate().toString().padStart(2, "0");
        const month = (manual.getMonth() + 1).toString().padStart(2, "0");
        const year = manual.getFullYear();
        const hours = manual.getHours();
        const min = manual.getMinutes();
        if(type === 'date'){
            return day + "/" + month + "/" + year;
        } else{
            return hours + ":" + min;
        }
    }
    return(
        <Modal
         animationType="fade"
         transparent={true}
         visible={modalVisible}
         onRequestClose={() => {
            setModalVisible(!modalVisible)
         }}
         >
         <View style={Style.centeredView}>
            <View
                style={[
                    Style.modalView,{
                        marginTop: '75%'
                    }
                ]}
            >
                <Text style={Style.modalText}>
                    Select a time to get notified for the next task!
                </Text>
                <View>
                    <Text style={{textAlign: 'center'}}>DATE</Text>
                    <TouchableOpacity style={Style.buttonHours}
                    onPress={() => setShowPicker({...showPicker, showDate: true})}>
                        <Text style={Style.txtHours}>{currentFormattedData('date')}</Text>
                    </TouchableOpacity>
                    {showPicker.showDate && (
                        <DateTimePicker mode="date" value={date} onChange={onChange} />
                    )}
                    <Text style={{textAlign: 'center'}}>TIME</Text>
                    <TouchableOpacity style={Style.buttonHours}
                    onPress={() => setShowPicker({...showPicker, showHours: true})}>
                        <Text style={Style.txtHours}>{currentFormattedData('hours')}</Text>
                    </TouchableOpacity>
                    {showPicker.showHours && (
                        <DateTimePicker mode="time" value={date} onChange={onChange} />
                    )}
                </View>
                <View style={Style.modalButtons}>
                    <TouchableOpacity style={[Style.button, Style.buttonSave]}
                    onPress={() => {
                        schedulePushNotification();
                        setModalVisible(!modalVisible);
                    }}>
                        <Text style={Style.txtStyle}>SET</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[Style.button, Style.buttonCancel]}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}>
                        <Text style={Style.txtStyle}>CANCEL</Text>
                    </TouchableOpacity>
                </View>
            </View>
         </View>
        </Modal>
    )
}

export default ModalNotification;