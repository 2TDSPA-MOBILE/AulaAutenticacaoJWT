import React, { useState,useEffect } from "react"
import { View, TextInput, Button, Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../services/api"

export default function LoginScreen({ navigation }) {

 const [email, setEmail] = useState("")
 const [senha, setSenha] = useState("")

 //Verifica que já existe token salvo no AsyncStorage
 useEffect(()=>{
  async function verificarLogin() {
    const token = await AsyncStorage.getItem("token")
    if(token){
      navigation.replace("Perfil")
    }
  }
  //Chamando a função
  verificarLogin()
 },[])

 async function fazerLogin(){

   try{

     const response = await api.post("/login", {
       email,
       senha
     })

     const token = response.data.token

     await AsyncStorage.setItem("token", token)

     navigation.replace("Perfil")

   }catch{

     Alert.alert("Erro", "Login inválido")

   }

 }

 return (

   <View style={{padding:20}}>

     <TextInput
      placeholder="Email"
      onChangeText={setEmail}
     />

     <TextInput
      placeholder="Senha"
      secureTextEntry
      onChangeText={setSenha}
     />

     <Button
      title="Login"
      onPress={fazerLogin}
     />

   </View>

 )

}