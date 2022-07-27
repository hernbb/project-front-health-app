/* Titulo de bienvenida, Datos del perfil, btn de editar perfil, incluir direccion(pais, ciudad, codigo postal, calle, historial, etc.) */
import { useState, useContext, useEffect } from 'react';
import { updateService, getProfileService } from '../../services/profile.services';
import {useNavigate, Link} from "react-router-dom"
import { AuthContext } from '../../context/auth.context';
 import PerfilCss from "./PerfilCss.css"


export default function Profile() {
    //States
	const { user } = useContext(AuthContext);
    // const [usuario, setUsuario] = useState([]);
    // const [ loading, setLoading ] = useState(true);

    // const [ email, setEmail ] = useState('');
	// const [ password, setPassword ] = useState('');
	// const [ name, setName ] = useState('');
	// const [repeatPassword, setRepeatPassword] = useState('');
	// const [telefono, setTelefono] = useState('');
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('');
    const [zipCode, setZipCode]=useState('');
    const [address1, setAddress1]=useState('');
    const [address2, setAddress2]=useState('');
    
    //navigate
    const navigate = useNavigate();
    const [ errorMessage, setErrorMessage ] = useState(undefined);

    //handles
    // const handleEmail = (e) => setEmail(e.target.value);
	// const handleName = (e) => setName(e.target.value);
	// const handlePassword = (e) => setPassword(e.target.value);
	// const handlerepeatPassword = (e) => setRepeatPassword(e.target.value);
	// const handleTelefono = (e) => setTelefono(e.target.value);
    const handleAddress = (e) => setAddress1(e.target.value);
    const handleAddress2 = (e) => setAddress2(e.target.value)
    const handleCity = (e) => setCity(e.target.value)
    const handleCountry = (e)=> setCountry(e.target.value)
    const handleZipCode = (e) => setZipCode(e.target.value)
    const handleProvince = (e) => setProvince(e.target.value)
    

    
    const handleUpdateSubmit = async (e) => {
        
    
		e.preventDefault();
		// Create an object representing the request body
		const requestBody = { country, city, zipCode, province, address1, address2 };
    try{
      const response = await updateService(requestBody);

      navigate(`/`);
    }
    catch(err){
      if(err.response?.status === 400){
        setErrorMessage(err.response.data.message);
	}
    }
    }


    const getProfile = async () => {
        localStorage.getItem('authToken');
        try {
            const response = await getProfileService()
            console.log(response.data)
            setCountry(response.data.country)
            setCity(response.data.city)
            setProvince(response.data.province)
            setZipCode(response.data.zipCode)
            setAddress1(response.data.address1)
            setAddress2(response.data.address2)
        }
        catch (err) {
        console.log(err);
    }
    }
    useEffect(() => {
        getProfile()
    }, [])
//     useEffect(() => {
//         // Get the token from the localStorage
//         const storedToken = localStorage.getItem('authToken');
        
//         // Send the token through the request "Authorization" Headers 
//         axios
//           .get(
//             `${API_URL}/profile`,
//             { headers: { Authorization: `Bearer ${storedToken}` } }    
//           )
//           .then((response) => { 
//             setUsuario(response.data);
//             setLoading(false)
//           })
//           .catch((error) => console.log(error));
        
//       }, []);
// console.log(usuario)

// console.log(profile)
return (
    <>
      <div id="containerPerfil">
        <div id="ajustesCard" className="Column">
          <div>
            <h3 className="classh3">Ajustes de perfil</h3>
          </div>

          <div className="Column">
            <Link to={""} style={{ textDecoration: "none" }}>
              <span>Información del Perfil</span>
            </Link>

            <Link to={""} style={{ textDecoration: "none" }}>
              <span>Carrito de la Compra</span>
            </Link>

            {/* <a>                        
                        Historial
                    </a> 
                    <a>                       
                        Cambiar Contraseña
                    </a> 
                    <a>                        
                        Eliminar cuenta
                    </a> */}
          </div>
        </div>

        <div id="perfilCard" className="Column">
          <div>
            <h3 className="classh3">Informacion Personal</h3>
          </div>
          <div class="">
            <form onSubmit={handleUpdateSubmit}>
              <div class="">
                <label for="inputAddress">Dirección</label>
                <input
                  type="text"
                  name="address1"
                  value={address1}
                  onChange={handleAddress}
                />
              </div>
              <div class="">
                <label for="inputAddress2">Dirección 2</label>
                <input
                  type="text"
                  class=""
                  name="address2"
                  placeholder="Opcional"
                  value={address2}
                  onChange={handleAddress2}
                />
              </div>
              <div class="">
                <label for="inputAddress2">Pais</label>
                <input
                  type="text"
                  class=""
                  name="country"
                  value={country}
                  onChange={handleCountry}
                />
              </div>
              <div class="">
                <div class="">
                  <label for="inputCity">Ciudad</label>
                  <input
                    type="text"
                    class=""
                    name="city"
                    value={city}
                    onChange={handleCity}
                  />
                </div>
                <div class="">
                  <label for="inputState">Provincia</label>
                  <input
                    type="text"
                    class=""
                    name="province"
                    value={province}
                    onChange={handleProvince}
                  />
                </div>
                <div class="">
                  <label for="inputZip">Codigo Postal</label>
                  <input
                    type="text"
                    class=""
                    name="zipCode"
                    value={zipCode}
                    onChange={handleZipCode}
                  />
                </div>
              </div>
              <button type="submit">Guardar cambios</button>
            </form>
          </div>
        </div>

        <div id="ajustesCard" className="Column">
          <div>
            <h3 className="classh3">Información General</h3>
          </div>
          <div className="Informacion">
            <p>Nombre completo: <b>{user.name}</b></p>
            <p>Correo electronico: <b>{user.email}</b></p>
            <p>DNI: <b>{user.dni}</b></p>
            <p>Número de telefono: <b>{user.telefono}</b></p>
          </div>
        </div>
      </div>
    </>
  );
}
