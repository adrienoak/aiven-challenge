import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { ROUTES } from "./routes";
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
      </Routes>
    </Layout>
  );
}

export default App;
