import ProfilTaster from "./ProfilTaster";
import ProfilRestorer from "./ProfilRestorer";
import Admin from "../../../../admin/Admin";
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

const Profil = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("roles") || "";

  if (!role) {
    localStorage.clear();
    navigate('/');
    return null; // Return null to avoid rendering anything else in the component
  }
  console.log(role);

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


