import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Error from "@pages/Error";
import PageSuspenseFallBack from "@components/feedback/PageSuspenseFallBack/PageSuspenseFallBack";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";

const MainLayout = lazy(() => import("@layouts/MainLayout/MainLayout"));
const Home = lazy(() => import("@pages/Home"));
const Categories = lazy(() => import("@pages/Categories"));
const Products = lazy(() => import("@pages/Products"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Cart = lazy(() => import("@pages/Cart"));
const Wishlist = lazy(() => import("@pages/Wishlist"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div style={{marginTop: "70px"}}>
        <LottieHandler type ="loading" message ="please wait..."/>
      </div>}>
        <MainLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <PageSuspenseFallBack>
            <Home />
          </PageSuspenseFallBack>
        ),
      },
      {
        path: "categories",
        element: (
          <PageSuspenseFallBack>
            <Categories />
          </PageSuspenseFallBack>
        ),
      },
      {
        path: "cart",
        element: (
          <PageSuspenseFallBack>
            <Cart />
          </PageSuspenseFallBack>
        ),
      },
      {
        path: "wishlist",
        element: (
          <PageSuspenseFallBack>
            <Wishlist />
          </PageSuspenseFallBack>
        ),
      },
      {
        path: "categories/products/:prefix",
        element: (
          <PageSuspenseFallBack>
            <Products />
          </PageSuspenseFallBack>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category not found!",
              status: 400,
            });
          }

          return true;
        },
      },
      {
        path: "about-us",
        element: (
          <PageSuspenseFallBack>
            <AboutUs />
          </PageSuspenseFallBack>
        ),
      },
      {
        path: "login",
        element: (
          <PageSuspenseFallBack>
            <Login />
          </PageSuspenseFallBack>
        ),
      },
      {
        path: "register",
        element: (
          <PageSuspenseFallBack>
            <Register />
          </PageSuspenseFallBack>
        ),
      },
    ],
  },
]);
const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
