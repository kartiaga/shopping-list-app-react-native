import { useEffect, useState } from "react"
import { View, Image, Text, TouchableOpacity, FlatList, Alert, KeyboardAvoidingView, Platform} from "react-native"

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
      status: FilterStatus.PENDING,
      quantity: 1
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

  async function handleRemove(id: string){
    try {
      await itemsStorage.remove(id)
      await itemsByStatus()
    } catch(error){
      console.log(error)
      Alert.alert("Erro", "Não foi possível remover")
    }
  }

  function handleClear(){
    Alert.alert("Limpar", "Deseja remover todos?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => onClear()}
    ])
  }

  async function onClear() {
    try {
      await itemsStorage.clear()
      setItems([])
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível remover todos os itens")
    }
  }

  async function handleTouggleItemStatus(id: string){
    try {
      await itemsStorage.touggleStatus(id)
      await itemsByStatus()
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível atualizar o status.")
    }
  }

  async function handleQuantity(id: string, quantity: number){
    try {
      await itemsStorage.changeQuantity(id, quantity);
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível atualizar a quantidade.")
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

          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === "ios"? "padding": "height"}
          keyboardVerticalOffset={220}
        >
          <FlatList 
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <Item 
                  data={item}
                  onStatus={() => handleTouggleItemStatus(item.id)}
                  onRemove={() => handleRemove(item.id)}
                  onQuantity={(quantity) => handleQuantity(item.id, quantity)}
                />
            )}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator}/>}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item aqui.</Text>}
          />
        </KeyboardAvoidingView>
        
      </View>
    </View>
  )
}