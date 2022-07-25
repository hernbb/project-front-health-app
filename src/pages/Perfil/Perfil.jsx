/* Titulo de bienvenida, Datos del perfil, btn de editar perfil, incluir direccion(pais, ciudad, codigo postal, calle, historial, etc.) */
import { useState, useContext, useEffect } from 'react';
import { updateService, getProfileService } from '../../services/profile.services';
import {useNavigate, Link} from "react-router-dom"
import { AuthContext } from '../../context/auth.context';
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL;

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
      await updateService(requestBody);
      navigate(`/perfil`);
    }
    catch(err){
      if(err.response?.status === 400){
        setErrorMessage(err.response.data.message);
	}
    }
    }

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
    return(<>
<div class="container p-0">
    <div class="row">
        <div class="col-md-5 col-xl-4">

            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Ajustes de perfil</h5>
                </div>

                <div class="list-group list-group-flush" role="tablist">
                    <a class="list-group-item list-group-item-action active" data-toggle="list" href="#account" role="tab">
                      Información del Perfil
                    </a>
                    <a class="list-group-item list-group-item-action" data-toggle="list" href="#password" role="tab">
                      Carrito de la Compra
                    </a>  
                    <a class="list-group-item list-group-item-action" data-toggle="list" href="#password" role="tab">
                      Historial
                    </a> 
                    <a class="list-group-item list-group-item-action" data-toggle="list" href="#password" role="tab">
                      Cambiar Contraseña
                    </a> 
                    <a class="list-group-item list-group-item-action" data-toggle="list" href="#e" role="tab">
                      Eliminar cuenta
                    </a>
                </div>
            </div>
        </div>

        <div class="col-md-7 col-xl-8">
            <div class="tab-content">
                <div class="tab-pane fade show active" id="account" role="tabpanel">

                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">Información General</h5>
                        </div>
                        <div class="card-body">
                                   <ul>
                                       <li>{user.name}</li>
                                       <li>{user.email}</li>
                                       <li>{user.dni}</li>
                                       <li>{user.telefono}</li>
                                   </ul>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">Informacion Personal</h5>
                        </div>
                        <div class="card-body">
                            <form onSubmit={handleUpdateSubmit}>
                                {/* <div class="form-group">
                                    <label for="inputEmail4">Email</label>
                                    <input type="email" class="form-control" name='email' value={user.email} onChange={handleEmail}/>
                                </div>
                                <div class="form-group">
                                    <label for="inputEmail4">Telefono de contacto</label>
                                    <input type="text" class="form-control" name='telefono' value={user.telefono} onChange={handleTelefono}/>
                                </div> */}
                                <div class="form-group">
                                    <label for="inputAddress">Dirección</label>
                                    <input type="text" class="form-control" name='address1' value={user.address1} onChange={handleAddress}/>
                                </div>
                                <div class="form-group">
                                    <label for="inputAddress2">Dirección 2</label>
                                    <input type="text" class="form-control" name='address2' placeholder="Opcional" value={user.address2} onChange={handleAddress2}/>
                                </div>
                                <div class="form-group">
                                    <label for="inputAddress2">Pais</label>
                                    <input type="text" class="form-control" name='country' value={user.country} onChange={handleCountry}/>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputCity">Ciudad</label> 
                                        <input type="text" class="form-control" name='city' value={user.city} onChange={handleCity}/>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="inputState">Provincia</label>
                                        <input type="text" class="form-control" name='province' value={user.province} onChange={handleProvince}/>
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label for="inputZip">Codigo Postal</label>
                                        <input type="text" class="form-control" name='zipCode' value={user.zipCode} onChange={handleZipCode}/>
                                    </div>
                                </div>
                                <button type="submit" >Guardar cambios</button>
                            </form>

                        </div>
                    </div>

                </div>
                {/* <div class="tab-pane fade" id="password" role="tabpanel">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Password</h5>

                            <form>
                                <div class="form-group">
                                    <label for="inputPasswordCurrent">Current password</label>
                                    <input type="password" class="form-control" id="inputPasswordCurrent" />
                                    <small><a href="#">Forgot your password?</a></small>
                                </div>
                                <div class="form-group">
                                    <label for="inputPasswordNew">New password</label>
                                    <input type="password" class="form-control" id="inputPasswordNew" />
                                </div>
                                <div class="form-group">
                                    <label for="inputPasswordNew2">Verify password</label>
                                    <input type="password" class="form-control" id="inputPasswordNew2" />
                                </div>
                                <button type="submit" class="btn btn-primary">Save changes</button>
                            </form>

                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    </div>

</div>
    </>


    );
    }