import "./App.css";
import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{
      backgroundImage: 'url("/src/images/background.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
    <div className="absolute top-6 left-10">
      <img src="/src/images/logo.png" alt="Logo" className="h-20" />
    </div>

    <div className="container">
      <CurrencyConverter />
    </div>
    </div>
  );
}

export default App;
