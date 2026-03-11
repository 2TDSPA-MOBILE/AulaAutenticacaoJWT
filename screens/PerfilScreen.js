import React, { useEffect, useState } from "react"
import { View, Text, Button } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../services/api"

export default function PerfilScreen({ navigation }){

 const [user, setUser] = useState(null)

 // Função que busca os dados do usuário na API
 async function carregarPerfil(){

   // Recupera o token salvo no celular
   const token = await AsyncStorage.getItem("token")

   // Faz requisição para rota protegida
   const response = await api.get("/perfil", {
     headers:{
       Authorization: `Bearer ${token}`
     }
   })

   // Salva dados do usuário no estado
   setUser(response.data.user)

 }

 useEffect(()=>{
   carregarPerfil()
 },[])

 // FUNÇÃO DE LOGOUT
 async function logout(){

   // Remove o token do armazenamento do celular
   await AsyncStorage.removeItem("token")

   // Volta para tela de login
   navigation.navigate("Login")

 }

 return(

   <View style={{padding:20}}>

     <Text>Usuário logado:</Text>

     {user && (
       <Text>{user.email}</Text>
     )}

     <View style={{marginTop:20}}>

       <Button
        title="Logout"
        onPress={logout}
       />

     </View>

   </View>

 )

}