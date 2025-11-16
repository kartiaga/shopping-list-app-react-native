import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

import { FilterStatus } from "@/types/FilterStatus";
import { styles } from "./styles";

import { ShoppingBasket, ClipboardList } from "lucide-react-native"

import { StatusIcon } from "../StatusIcon";

type Props = TouchableOpacityProps & {
    status: FilterStatus,
    isActive: boolean
}

export function Filter({status, isActive, ...rest}: Props) {
    return (
        <TouchableOpacity 
            style={[styles.container, {opacity: isActive ? 1: 0.4}]} 
            activeOpacity={0.8}
            {...rest}
         >
            {status === "done" && <ShoppingBasket color={"#2d9700ff"} />}
            {status === "pending" && <ClipboardList />}
            <Text style={styles.title}>
                {status === FilterStatus.DONE ? "Carrinho": "Pendentes"}
            </Text>
        </TouchableOpacity>
    )
}