import ProfilTaster from "./ProfilTaster";
import ProfilRestorer from "./ProfilRestorer";
import Admin from "../../../../admin/Admin";
import { Helmet } from 'react-helmet';

const Profil = () => {
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
