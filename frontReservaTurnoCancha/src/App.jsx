import { Router } from "./router/Router";
import canchaBackground from "../src/assets/img/backgroundcancha.jpg";
function App() {
  return (
    <main className="layout">
      <img src={canchaBackground} alt="" className="canchaBackground" />
      <Router />
    </main>
  );
}

export default App;
