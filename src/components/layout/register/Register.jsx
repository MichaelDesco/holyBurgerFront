import { Link } from 'react-router-dom';
import './register.scss';


const Register = () => {
    const role = localStorage.getItem("roles");

    return (
        <div className='container-login-signup'>
            <div id="main-header">
                <div className= "container-about">
                    <Link to={"/about"} className='about'>
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
                        <div>
                            <p>Vous êtes bien connectez !</p>
                        </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Register;