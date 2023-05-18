import Taster from "./Taster";
import Restorer from "./Restorer";
import Admin from "../../../admin/Admin";

const Profil = () => {
    const role = localStorage.getItem("roles");
    console.log(role)
    return (
        <div>
            {role.includes('admin') && <Admin />}
            {role.includes('taster') && <Taster />}
            {role.includes('restorer') && <Restorer />}           
        </div>
    );
};

export default Profil;

