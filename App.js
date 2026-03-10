import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import LoginScreen from "./screens/LoginScreen"
import PerfilScreen from "./screens/PerfilScreen"

const Stack = createNativeStackNavigator()

export default function App(){

 return(

   <NavigationContainer>

     <Stack.Navigator>

       <Stack.Screen
        name="Login"
        component={LoginScreen}
       />

       <Stack.Screen
        name="Perfil"
        component={PerfilScreen}
       />

     </Stack.Navigator>

   </NavigationContainer>

 )

}