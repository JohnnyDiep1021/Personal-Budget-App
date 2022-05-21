import ReactDOM from "react-dom";

import EnvelopeProvider from "./shared/context/EsavingProvider";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <EnvelopeProvider>
    <App />
  </EnvelopeProvider>,
  document.getElementById("root")
);
