import React from "react";
import HeaderAdmin from "./HeaderAdmin.tsx";
import { Helmet } from "react-helmet";

const Admin: React.FC = () => {
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
