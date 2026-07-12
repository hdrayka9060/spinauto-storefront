import { Routes, Route } from "react-router-dom";
import SiteShell from "@/components/layout/SiteShell";
import Home from "@/pages/Home";
import Inventory from "@/pages/Inventory";
import VehicleDetail from "@/pages/VehicleDetail";
import FinanceApplication from "@/pages/forms/FinanceApplication";
import CarFinder from "@/pages/forms/CarFinder";
import BookAppointment from "@/pages/forms/BookAppointment";
import Service from "@/pages/Service";
import About from "@/pages/About";
import Directions from "@/pages/Directions";
import Privacy from "@/pages/Privacy";
import Placeholder from "@/pages/Placeholder";

export default function App() {
  return (
    <SiteShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Inventory />} />
        <Route path="/cars/:id" element={<VehicleDetail />} />
        <Route path="/finance" element={<FinanceApplication />} />
        <Route path="/forms/financing" element={<FinanceApplication />} />
        <Route path="/forms/car-finder" element={<CarFinder />} />
        <Route path="/forms/book-appointment" element={<BookAppointment />} />
        <Route path="/service" element={<Service />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/directions" element={<Directions />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<Placeholder title="Page Not Found" />} />
      </Routes>
    </SiteShell>
  );
}
