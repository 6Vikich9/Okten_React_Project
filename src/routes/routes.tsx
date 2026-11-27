import { createBrowserRouter } from "react-router";
import { MainLayout } from "../layouts/MainLayout";
import { MoviesPage } from "../pages/MoviesPage";
import { MoviePage } from "../pages/MoviePage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const routes = createBrowserRouter([
    { path: "/", element: <MainLayout><MoviesPage /></MainLayout> },
    { path: "/movie/:id", element: <MainLayout><MoviePage /></MainLayout> },
    { path: "*", element: <MainLayout><NotFoundPage /></MainLayout> },
]);
