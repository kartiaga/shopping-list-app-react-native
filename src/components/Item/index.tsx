import { View, Text, TouchableOpacity } from "react-native";
import { Trash2, SquarePen } from "lucide-react-native";

import { styles } from "./styles";
import { StatusIcon } from "../StatusIcon";
import { FilterStatus } from "@/types/FilterStatus";

import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

type ItemData = {
    status: FilterStatus,
    description: string,
    quantity: number
}

type Props = {
    data: ItemData,
    onRemove: () => void,
    onStatus: () => void,
    onQuantity: (quantity: number) => void
}

export function Item({data, onStatus, onRemove, onQuantity}: Props){
    const [quantity, setQuantity] = useState(data.quantity);

    const numeros = Array.from({ length: 20 }, (_, i) => ({
        label: `${i + 1}`,
        value: i + 1,
    }));

    return (
        <View style={{flexDirection: "row", flex:1, gap:12}}>
                <TouchableOpacity onPress={onStatus} activeOpacity={0.8}>
                    <StatusIcon status={data.status} />
                </TouchableOpacity>
            <View style={{flex:1, gap: 12}}>
                <View style={styles.container}>
                    <Text style={styles.description}>
                        {data.description}
                    </Text>

                    <TouchableOpacity onPress={onRemove}>
                        <Trash2 size={18} color={"#828282"}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    
                    <Text style={{fontSize: 14}}>Quantidade:</Text>
                    <Dropdown
                        style={{
                            marginLeft: 2,
                            height: 32,
                            width: 62,
                            borderColor: "#ccc",
                            borderWidth: 1,
                            borderRadius: 8,
                            paddingHorizontal: 8,
                        }}
                        value={quantity}
                        onChange={(item) => {
                            setQuantity(item.value);
                            onQuantity(item.value);
                        }}
                        data={numeros}
                        labelField="label"
                        valueField="value"
                        placeholder="Quantidade"
                        placeholderStyle={{ fontSize: 14, color: "#999" }}
                        selectedTextStyle={{ fontSize: 14, color: "#000" }}
                    />
                    
                    {/* <TouchableOpacity onPress={onRemove}>
                        <SquarePen style={{}} size={18} color={"#828282"}/>
                    </TouchableOpacity> */}
                </View>
            </View> 
        </View>
    )
}