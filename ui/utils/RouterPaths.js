import RouterError from "./RouterError";
import MainLayout from "../components/MainLayout";
import { Suspense, lazy } from "react";
import Cart from "../components/cart/Cart";
const SearchLayout = lazy(() => import("../components/search/SearchLayout"));
const Restaurant = lazy(() => import("../components/BodyComponent/Restaurant"));
const RestaurantMenuSearch = lazy(() =>
  import("../components/BodyComponent/RestaurantMenuSearch")
);

const applicationPaths = [
  {
    path: "/*",
    element: <MainLayout />,
    errorElement: <RouterError />,
  },
  {
    path: "/search",
    element: (
      <Suspense>
        <SearchLayout />
      </Suspense>
    ),
  },
  {
    path: "/cart",
    element: (
      <Suspense>
        <Cart />
      </Suspense>
    ),
  },
  {
    path: "/restaurant/:restaurantId",
    children: [
      {
        path: "",
        element: (
          <Suspense>
            <Restaurant />
          </Suspense>
        ),
      },
      {
        path: "search",
        element: (
          <Suspense>
            <RestaurantMenuSearch />
          </Suspense>
        ),
      },
    ],
  },
];

export default applicationPaths;
