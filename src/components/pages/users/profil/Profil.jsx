import ProfilTaster from "./ProfilTaster";
import ProfilRestorer from "./ProfilRestorer";
import Admin from "../../../../admin/Admin";
import { Helmet } from 'react-helmet';
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Profil = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("jwt")) {
            localStorage.removeItem("jwt");
            localStorage.removeItem("roles");
            navigate("/");
        }
    }, [navigate]);


    const role = localStorage.getItem("roles");
    return (
        <>
            <Helmet>
                <title>HOLY·Profil🍔</title>
            </Helmet>
            {role.includes('admin') && <Admin />}
            {role.includes('goûteur') && <ProfilTaster />}
            {role.includes('restaurateur') && <ProfilRestorer />}
        </>
    );
};

export default Profil;
