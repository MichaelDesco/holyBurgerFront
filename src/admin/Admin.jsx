import HeaderAdmin from './HeaderAdmin';
import { Helmet } from 'react-helmet';

const Admin = () => {

  return (
    <div className="container-admin">
      <Helmet>
        <title>Admin</title>
      </Helmet>
      <HeaderAdmin />
    </div>
  );
};

export default Admin;

