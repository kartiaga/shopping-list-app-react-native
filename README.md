# 🛍️ Shopping List App - React Native

### **Visão Geral**

Cansado de chegar ao caixa do supermercado e ter surpresas com o valor total da sua compra? O **Shopping List App** é um aplicativo móvel simples e eficiente, construído com **React Native**, projetado para ajudá-lo a manter o controle dos seus gastos enquanto faz as compras.

Funciona de forma semelhante a uma lista de tarefas, mas focada em itens de mercado, permitindo que você:
1. Adicione produtos com preço unitário e quantidade.
2. Calcule o custo total de cada item.
3. Marque os itens que você realmente pegou no carrinho.
4. Visualize o **valor total acumulado da compra** em tempo real, evitando surpresas no caixa.

---

### ✨ **Recursos em Destaque**

* **Controle de Orçamento:** Visualize o custo total da sua compra sendo atualizado a cada item marcado.
* **Adição Detalhada:** Campos para Nome do Produto, Preço Unitário e Quantidade.
* **Cálculo Automático:** O subtotal de cada item ($preço \times quantidade$) é calculado instantaneamente.
* **Carrinho Virtual:** Marque os itens para obter o total exato que será cobrado.
* **Multiplataforma:** Desenvolvido em React Native para rodar em dispositivos iOS e Android.

---

### 📸 **Aplicações e Screenshots**

Veja o aplicativo em ação com algumas imagens:

#### **1. Adição de Item**
Mostra os campos de entrada (Nome, Preço, Quantidade) e o cálculo do subtotal do item.
<img width="362" height="791" alt="Captura de Tela 2025-11-25 às 19 21 16" src="https://github.com/user-attachments/assets/0fa76ab6-6806-40a7-a968-74ef544c184c" />

#### **2. Lista de Compras e Total**
Exibe a lista principal com itens marcados e o valor total da compra acumulado no rodapé.
<img width="362" height="791" alt="image" src="https://github.com/user-attachments/assets/eed3eca1-35b0-4cc9-95fa-addb5d120857" />


### 🛠️ **Tecnologias Utilizadas**

O projeto foi desenvolvido com as seguintes tecnologias:

* **Framework:** React Native
* **Linguagem:** TypeScript
* **Gerenciamento de Estado:**
    * **Estado em Componentes:** Uso do `useState` do React para gerenciar o estado interno dos inputs e da lista.
    * **Persistência de Dados:** Utilização do **AsyncStorage** para salvar a lista de compras localmente no dispositivo.
* **Estilização:** `StyleSheet` do React Native para aplicar estilos otimizados e nativos.

---

### 🚀 **Como Rodar Localmente**

#### **Pré-requisitos**

Certifique-se de ter as seguintes ferramentas instaladas e configuradas:

* **[Node.js](https://nodejs.org/)**
* **[Expo CLI](https://docs.expo.dev/get-started/installation/)** (Se você ainda não tem, instale globalmente: `npm install -g expo-cli`)

#### **Instalação e Execução**

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/kartiaga/shopping-list-app-react-native.git](https://github.com/kartiaga/shopping-list-app-react-native.git)
    cd shopping-list-app-react-native
    ```
2.  **Instale as Dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```
3.  **Execute o Aplicativo:**

    ***Como seu projeto utiliza o Expo, o comando correto é:***
    ```bash
    npx expo start 
    # ou 
    npm start
    ```
    *Este comando abrirá o Metro Bundler no seu navegador. Use o aplicativo **Expo Go** no seu dispositivo (ou emulador/simulador) para escanear o QR Code e carregar o aplicativo.*

    ***Nota:*** *Os comandos `npx react-native run-android` ou `run-ios` só são usados em projetos React Native CLI puros.*

---

### 🤝 **Contribuição**

Contribuições, issues e sugestões são bem-vindas! Se você tiver alguma ideia ou encontrar um bug, sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.

### 🧑‍💻 **Autor**

Feito com ❤️ por **[kartiaga]**
