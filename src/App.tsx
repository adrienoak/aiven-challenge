import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useCloudInfo } from "./cloud-info.hook";
import { DbChoices } from "./screen/db-choices";

function Selection() {
  return <div>Welcome to the Aiven Database Selector</div>;
}

function App() {
  const { isPreSelection, context } = useCloudInfo();

  if (isPreSelection) {
    return <Selection />;
  }

  return (
    <div className="App">
      <DbChoices context={context} />
    </div>
  );
}

export default App;
