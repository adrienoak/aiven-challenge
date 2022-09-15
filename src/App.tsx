import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { ROUTES } from "./routes";
import { Combined } from "./screen/combined";
import { HomePage } from "./screen/home";
import { Promixity } from "./screen/proximity";
import { Region } from "./screen/region";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={ROUTES.HOME_PAGE} element={<HomePage />} />
        <Route path={ROUTES.REGION} element={<Region />} />
        <Route path={ROUTES.PROXIMITY} element={<Promixity />} />
        <Route path={ROUTES.PROVIDER_AND_REGION} element={<Combined />} />
      </Routes>
    </Layout>
  );
}

export default App;
