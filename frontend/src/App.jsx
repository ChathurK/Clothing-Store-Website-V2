import { BrowserRouter , Routes, Route } from "react-router-dom";
import ScreenSizeIndicator from "./components/ScreenSizeIndicator";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Products from "./pages/Products";
import Items from "./pages/Items";
import LenisScrollProvider from "./components/LenisScrollProvider";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <LenisScrollProvider>
        <div className="min-h-screen dark:bg-black">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/products" element={<Products />} />
            <Route path="/items/:id" element={<Items />} />
          </Routes>
          <ScreenSizeIndicator />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </LenisScrollProvider>
    </BrowserRouter>
  );
}

export default App;
