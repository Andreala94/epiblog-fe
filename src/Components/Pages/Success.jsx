import React,  { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useSession from "../../middlewares/ProtectedRoutes"


 const Success = () => {

    const navigate = useNavigate();
    const { token } = useParams();
    console.log(token);
    // const location = useLocation() // prendiamo la pagina che stiamo adesso
    // const urlParams = new URLSearchParams(location.search) //legge quello che c'è nella barra degli indirizzi
    // const token = urlParams.get("token") // se e cosa c'è con la chiave token

    const saveUserToLocalStorage = () => {
        localStorage.setItem('userLoggedIn', JSON.stringify(token))
    }

    const session = useSession();

	useEffect(() => {
		if (token) {
			saveUserToLocalStorage(token)

            setTimeout(() => {
                navigate('/')
            }, 3000)
		}
	}, [token, navigate, session]);

	return (
		<div className="h-screen w-full flex justify-center items-center bg-gray-800">
			<h1 className="text-3xl text-white font-bold">
				Benvenuto...
			</h1>
		</div>
	);
};

export default Success;

