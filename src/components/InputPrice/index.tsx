import { TextInput } from "react-native"
import { useState, useMemo } from "react" 

type Props = {
    price: number,
    onPrice: (price: number) => void 
}

export function InputPrice({ price, onPrice }: Props) {
    // O estado interno armazena apenas dígitos.
    // O valor inicial (price) deve ser convertido para centavos e depois para string.
    // Ex: 123.45 (price) -> 12345 (centavos) -> "12345" (rawNumberString)
    const initialCents = Math.round(price * 100).toString()
    const [rawNumberString, setRawNumberString] = useState(initialCents)

    // 2. Função principal que lida com cada alteração de texto
    const handleChangeText = (text: string) => {
        // Remove tudo que não for dígito e garante que não comece com 0 (a menos que seja apenas "0")
        const cleanDigits = text.replace(/[^\d]/g, '')
        .replace(/^0+(?=\d)/, ''); // Remove zeros à esquerda, exceto se for só "0"

        // Atualiza o estado interno com a nova string de dígitos.
        setRawNumberString(cleanDigits)

        // 3. Calcula o novo preço em R$ para o componente pai
        let newPriceInCents = parseInt(cleanDigits || '0', 10)
        
        // Garante que o número mínimo seja 0
        if (isNaN(newPriceInCents)) {
            newPriceInCents = 0
        }
        
        // Converte centavos para Reais e chama o callback do pai
        const newPriceInReais = newPriceInCents / 100
        onPrice(newPriceInReais)
    }

    // Mapeia a string de dígitos para o formato de exibição R$ 0.000,00
    const formattedValue = useMemo(() => {
        let displayValue = rawNumberString || '0'
        
        // Adiciona padding com '0's à esquerda para garantir pelo menos 3 dígitos (0,00)
        while (displayValue.length < 3) {
            displayValue = '0' + displayValue;
        }

        // Separa Reais (à esquerda) de Centavos (últimos 2 dígitos)
        const integerPart = displayValue.slice(0, -2);
        const decimalPart = displayValue.slice(-2);

        // Formata a parte inteira com o separador de milhares (ponto '.')
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

        // Junta tudo no formato brasileiro
        return `R$ ${formattedInteger},${decimalPart}`

    }, [rawNumberString])

    // Se o usuário apagar tudo, o estado vira "", mas queremos mostrar "R$ 0,00"
    const displayValue = rawNumberString ? formattedValue : ''


    return (
        <TextInput
            style={{
                marginLeft: 2,
                height: 32,
                width: 100, 
                borderColor: "#ccc",
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 8,
                textAlign: 'left', 
            }}
            placeholder="R$ 0,00"
            keyboardType="numeric" 
            onChangeText={handleChangeText} 
            value={displayValue} 
            selectTextOnFocus={false} 
        />
    )
}