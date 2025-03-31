import React, {useState} from "react";
import { View, TextInput } from "react-native";
import Style from "./style";

function SearchBar(){
    const [masterData, setMasterData] = useState("");
    const search = () => {
        if(text){
            const newData = data.filter((item) => {
                const itemTitle = item.title ? item.title.toUpperCase() : "" .toUpperCase();
                const titleSearch = text.toUpperCase();
                return itemTitle.indexOf(titleSearch) > -1;
            });
            onchange(newData);
        } else{
            onchange(masterData);
        }
    }
    return(
        <View style={[Style.searchArea]}>
            <TextInput placeholder="Search Tasks..." maxLength={50}
            onChangeText={(text) => search(text)} />
        </View>
    )
}

export default SearchBar;