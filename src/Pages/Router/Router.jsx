import { createBrowserRouter } from "react-router";
import Layout from "../../Components/Layout/Layout";
import ErrorPage from "../ErrorPage";
import Home from "../Home";
import Brands from "../Brands";
import Shop from "../Shop";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/brands",
                element: <Brands />,
            },
            {
                path: "/shop",
                element: <Shop />,
            }
        ]
    }
])