import { BrowserRouter , Routes, Route } from "react-router-dom";
import ScreenSizeIndicator from "./components/ScreenSizeIndicator";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Products from "./pages/Products";
import LenisScrollProvider from "./components/LenisScrollProvider";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL} >
      <LenisScrollProvider>
        <div className="min-h-screen dark:bg-black">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/products"
              element={<Products />}
            />
          </Routes>
          <ScreenSizeIndicator />
        </div>
      </LenisScrollProvider>
    </BrowserRouter>
  );
}

export default App;
