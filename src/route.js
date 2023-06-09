import ShowProduct from "./Components/ShowProduct";
const routes = [
    {
        path: "/thien",
        exact: true,
        main: () => <ShowProduct/>
    },
    {
        path: "/thienadmin",
        exact: true,
        main: () => <ShowProduct />
    }
]

export { routes }