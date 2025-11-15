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

  const calculateGrandTotal = () => {
    // Reduce the items array to a single number (the sum of all item totals)
    const total = items.reduce((sum, item) => {
        // Ensure price is treated as a number
        const price = item.price || 0; 
        
        // Add the total for the current item (quantity * price)
        return sum + (item.quantity * price);
    }, 0); // Start the sum at 0

    // Format the total to a currency string (R$ 0,00)
    // toFixed(2) ensures two decimal places. replace('.', ',') converts to Brazilian format.
    return `R$ ${total.toFixed(2).replace('.', ',')}`;
  };

  async function handleAdd(){
    if (!description.trim()){
      return Alert.alert("Adicionar", "Informe a descrição para adicionar")
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,
      quantity: 1,
      price: 0
    }
    
    await itemsStorage.add(newItem)
    await itemsByStatus()

    // Alert.alert("Adicionado", `Adicionado ${description}`);
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
      Alert.alert("Removido", `Removido ${description}`);
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
      await itemsByStatus()
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível atualizar a quantidade.")
    }
  }
  
  async function handlePrice(id: string, price: number) {
    try {
      await itemsStorage.changePrice(id, price);
      await itemsByStatus()
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível atualizar o preço.")
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
        <View>
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
          {filter === FilterStatus.DONE && (
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 10, paddingTop: 10, textAlign: "left", color: "#006caaff"}}>
                Total: {calculateGrandTotal()}
            </Text>
          )}
          

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
                  onPrice={(price) => handlePrice(item.id, price)}
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