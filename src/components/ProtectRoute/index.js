import { Navigate } from "react-router-dom";

const ProtectAuthRoutes = ({ redirectPath, children }) => {
  return (
    <>
      {localStorage.getItem("access_token") ? (
        <Navigate to={redirectPath} replace />
      ) : (
        children
      )}
    </>
  );
};

export { ProtectAuthRoutes };
