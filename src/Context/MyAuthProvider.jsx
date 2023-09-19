import React, { createContext, useState } from 'react'


const AuthContext = createContext()

const MyAuthProvider = ({children}) => {
 
const [user, setUser] = useState([])


    return <AuthContext.Provider value={{setUser}}>{children}</AuthContext.Provider>
}

export {AuthContext}
export default MyAuthProvider