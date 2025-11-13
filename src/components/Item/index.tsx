import { View, Text, TouchableOpacity } from "react-native";
import { Trash2, SquarePen } from "lucide-react-native";

import { styles } from "./styles";
import { StatusIcon } from "../StatusIcon";
import { FilterStatus } from "@/types/FilterStatus";

import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

import { InputPrice } from "../InputPrice";

type ItemData = {
    id: string, // 🎯 ADDED: The unique identifier for the item
    status: FilterStatus,
    description: string,
    quantity: number,
    price: number
}

type Props = {
    data: ItemData,
    onRemove: () => void,
    onStatus: () => void,
    onQuantity: (quantity: number) => void
    onPrice: (price: number) => void
}

export function Item({data, onStatus, onRemove, onQuantity, onPrice}: Props){

    const numeros = Array.from({ length: 20 }, (_, i) => ({
        label: `${i + 1}`,
        value: i + 1,
    }));

    const total = (data.price * data.quantity).toFixed(2);

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
                    <Text style={{fontSize: 14}}>Uni:</Text>
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
                        value={data.quantity}
                        onChange={(item) => {
                            onQuantity(item.value);
                        }}
                        data={numeros}
                        labelField="label"
                        valueField="value"
                        placeholder="Quantidade"
                        placeholderStyle={{ fontSize: 14, color: "#999" }}
                        selectedTextStyle={{ fontSize: 14, color: "#000" }}
                    />

                    <InputPrice onPrice={onPrice} price={data.price}/>
                    <Text style={{textAlign: "right"}}>Total: R$ {total}</Text>
                    
                    
                    {/* <TouchableOpacity onPress={onRemove}>
                        <SquarePen style={{}} size={18} color={"#828282"}/>
                    </TouchableOpacity> */}
                </View>
            </View> 
        </View>
    )
}