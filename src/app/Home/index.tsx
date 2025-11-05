import { useState } from "react"
import { View, Image, Text, TouchableOpacity, FlatList} from "react-native"

import { Item } from "@/components/Item"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import { Filter } from "@/components/Filter"

import { styles } from "./styles"
import { FilterStatus } from "@/types/FilterStatus"

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]
const ITEMS = [
  { id: "1", status: FilterStatus.DONE, description: "Comprar um pacote de café"},
  { id: "2", status: FilterStatus.PENDING, description: "3 Pacotes de mararrão"},
  { id: "3", status: FilterStatus.PENDING, description: "2 Cebolas"},
]

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo}/>

      <View style={styles.form}>
        <Input placeholder="Nome completo"/>
        <Button title="Adicionar" />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter 
              key={status} 
              status={status} 
              isActive={status===filter}
              onPress={() => setFilter(status)}
            />
          ))}

          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList 
          data={ITEMS}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <Item 
                data={item}
                onStatus={() => console.log("Muda status")}
                onRemove={() => console.log("Remove")}
              />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item aqui.</Text>}
        />
        
      </View>
    </View>
  )
}