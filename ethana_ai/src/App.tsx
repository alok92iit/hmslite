import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import  Dashboard from "./pages/Dashboard/indes";
import AddEmployee from "./pages/AddEmployee";

import Department from "./pages/departements";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,       // Layout must be inside router
      children: [
        {
          index: true,
          element: <Dashboard/>,
        },
        {
          path:"/employee",
          element: <AddEmployee />,
        },
        
        {
          path:"/department",
          element: <Department/>,
        },

      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
