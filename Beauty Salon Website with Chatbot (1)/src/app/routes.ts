import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import DashboardLayout from "./components/DashboardLayout";
import HomePage from "./pages/HomePage";
import ServiciosPage from "./pages/ServiciosPage";
import GaleriaPage from "./pages/GaleriaPage";
import ContactoPage from "./pages/ContactoPage";
import CatalogoPage from "./pages/CatalogoPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardCitasPage from "./pages/DashboardCitasPage";
import DashboardPlaceholderPage from "./pages/DashboardPlaceholderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "catalogo", Component: CatalogoPage },
      { path: "servicios", Component: ServiciosPage },
      { path: "galeria", Component: GaleriaPage },
      { path: "contacto", Component: ContactoPage },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "citas", Component: DashboardCitasPage },
      {
        path: "clientes",
        Component: () => DashboardPlaceholderPage({ titulo: "Clientes", descripcion: "Aquí verás el historial y datos de tus clientas." }),
      },
      {
        path: "servicios",
        Component: () => DashboardPlaceholderPage({ titulo: "Servicios", descripcion: "Gestiona tu catálogo de servicios y precios." }),
      },
      {
        path: "calendario",
        Component: () => DashboardPlaceholderPage({ titulo: "Calendario", descripcion: "Vista completa de tu agenda semanal y mensual." }),
      },
      {
        path: "reportes",
        Component: () => DashboardPlaceholderPage({ titulo: "Reportes", descripcion: "Estadísticas de ingresos, servicios y clientas." }),
      },
      {
        path: "configuracion",
        Component: () => DashboardPlaceholderPage({ titulo: "Configuración", descripcion: "Personaliza tu perfil y preferencias del salón." }),
      },
    ],
  },
]);
