import { useEffect, useState } from "react"
import { View, Image, Text, TouchableOpacity, FlatList, Alert} from "react-native"

import { Item } from "@/components/Item"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import { Filter } from "@/components/Filter"

import { styles } from "./styles"
import { FilterStatus } from "@/types/FilterStatus"
import { itemsStorage, ItemStorage } from "@/storage/itemsStorage"

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  let [description, setDescription] = useState("")
  const [items, setItems] = useState<ItemStorage[]>([])

  async function handleAdd(){
    if (!description.trim()){
      return Alert.alert("Adicionar", "Informe a descrição para adicionar")
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING
    }
    
    await itemsStorage.add(newItem)
    await itemsByStatus()

    Alert.alert("Adicionado", `Adicionado ${description}`);
    setFilter(FilterStatus.PENDING)
    setDescription("")
  }

  async function itemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filter)
      setItems(response)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível filtrar os itens.")
    }
  }

  useEffect(() => {
    itemsByStatus()
  }, [filter])
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo}/>

      <View style={styles.form}>
        <Input 
          placeholder="Nome completo" 
          onChangeText={setDescription}
          value={description}
        />
        <Button title="Adicionar" onPress={handleAdd} />
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
          data={items}
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