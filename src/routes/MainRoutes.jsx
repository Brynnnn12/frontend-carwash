import { Route } from "react-router-dom";
import Page from "../pages/Home/Page";
import Testimonials from "../pages/Home/Testimonials";

const MainRoutes = (
  <>
    <Route path="/" element={<Page />} />
    <Route path="/testimonials" element={<Testimonials />} />
  </>
);

export default MainRoutes;
