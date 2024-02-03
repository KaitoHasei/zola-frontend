import { useContext, useEffect } from "react";
import { useLoaderData, Outlet } from "react-router-dom";

import { GlobalContext } from "#/contexts/GlobalContext";

const AppLayout = () => {
  const data = useLoaderData();
  const { setUser } = useContext(GlobalContext);

  useEffect(() => {
    setUser(data.data);
  }, [data, setUser]);

  return <Outlet />;
};

export default AppLayout;
