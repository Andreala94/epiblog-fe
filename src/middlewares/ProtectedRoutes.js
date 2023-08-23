import React, { useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import LoginModal from '../Components/LoginModal'
import NavBar from '../Components/NavBar/NavBar'
import { Outlet, useNavigate } from 'react-router-dom'

const auth = () => {
    return JSON.parse(localStorage.getItem('userLoggedIn')) // ci ristetuisce un booleano 
}

//! decodifica la sessione  ( cioe il token)

const useSession = () => {
    const session = auth()
    const decodeSession = session ? jwtDecode(session) : null

    const navigate = useNavigate() // spedire l'utente da "qualche parte"

    useEffect(() => {
        if (!session) {
            navigate('/', { replace: true }) // replace true consente di non andare avanti o dientro il tuo brosware
        }
    }, [navigate, session])

    // ritorna l'oggetto decodificato

    return decodeSession
}
// 
const ProtectedRoutes = () => {
    const isAuthorized = auth() // controlla se siamo autorizzati e ti salva il token con la funzione di sopra
    const session = useSession()

    return isAuthorized ? <Outlet /> : <LoginModal /> 
    
    // se siamo autorizzati mostra il componente figlio che abbiamo richiesto (cioè outlet sarebbe qualcosa che noi abbiamo richiesto 
    // dentro il nostro componente di verifica "proddectRoute" es nel nostro caso la rotta "newpost") altrimenti ci mandi nella pagina login
    
}

export default ProtectedRoutes
