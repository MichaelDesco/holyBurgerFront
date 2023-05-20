import { Link } from 'react-router-dom';
import './login-signup.scss';
import { useEffect } from 'react';


const LoginSignup = () => {
    // const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch("http://localhost:5001/api/users/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
            .then((response) => response.json())
            .then((data) => {
                // setIsLogin(true);
                console.log(data);
            })
            .catch((error) => console.log(error));
        }
    },)

    return (
        <div className='container-login-signup'>
            <div id="main-header">
                <div className= "container-about">
                    <Link to={"/about"} className='about'>
                        PRESENTATION
                    </Link>
                </div>    
                <div className="container-btn-register">
                    {/* {isLogin && */}
                        <div>
                            <Link to={"/login"} className= "login" >
                                <div className="push">
                                    PUSH
                                    <p>Se connecter</p>
                                </div>                    
                            </Link>   
                            <Link to={"/signup"} className='signup'>
                                <p id='signup'>INSCRIPTION</p>
                            </Link>
                        </div>
                    {/* } */}
                </div>
            </div>
        </div>
    );
}

export default LoginSignup;