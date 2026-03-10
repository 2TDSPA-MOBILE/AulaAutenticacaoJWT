import React, { useEffect, useState } from "react"
import { View, Text } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../services/api"

export default function PerfilScreen(){

 const [user, setUser] = useState(null)

 async function carregarPerfil(){

   const token = await AsyncStorage.getItem("token")

   const response = await api.get("/perfil", {
     headers:{
       Authorization: `Bearer ${token}`
     }
   })

   setUser(response.data.user)

 }

 useEffect(()=>{
   carregarPerfil()
 },[])

 return(

   <View style={{padding:20}}>

     <Text>Usuário logado:</Text>

     {user && (
       <Text>{user.email}</Text>
     )}

   </View>

 )

}