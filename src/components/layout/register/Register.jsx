import { Link } from 'react-router-dom';
import './register.scss';


const Register = () => {
    const role = localStorage.getItem("roles");
    const username = localStorage.getItem("username");
    return (
        <div className='container-login-signup'>
            <div className='slogan'>
                <h1>"Laissez-vous tenter, croquez et prenez du plaisir à chaque bouchée !"</h1>
            </div>
            <div id="main-header">
                <div className= "container-about">
                    <Link to={"/about"} className='btn-about'>
                        PRESENTATION
                    </Link>
                </div>    
                <div className="container-btn-register">
                    {!role ? (
                        <div>
                            <Link to={"/login"} className= "login" >
                                <div className="push">
                                    <h2>PUSH</h2>
                                    <p>Connexion</p>
                                </div>                    
                            </Link>   
                            <Link to={"/signup"} className='signup'>
                                <p>INSCRIPTION</p>
                            </Link>
                        </div>
                        ) : (
                        <div className='username'>
                            <p>Bienvenue {username} !</p>
                        </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Register;