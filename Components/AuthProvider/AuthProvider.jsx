"use client";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react"
import store from "../store";

const AuthProvider = ({children})=>{
   return(
   <SessionProvider >
       <Provider store={store}>
         {children}
       </Provider>
   </SessionProvider>
   )
}

export default AuthProvider