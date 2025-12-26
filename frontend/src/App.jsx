import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Products from "./pages/Products";
import Items from "./pages/Items";
import LenisScrollProvider from "./components/LenisScrollProvider";
import { ToastContainer } from "react-toastify";
import authService from "./services/authService";

function OAuthHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for OAuth token in URL on any page
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.has("token")) {
      try {
        authService.handleOAuthCallback();
        // Clean URL and stay on current page
        window.history.replaceState({}, document.title, location.pathname);
      } catch (error) {
        console.error("OAuth error:", error);
      }
    }
  }, [location, navigate]);

  return null;
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <OAuthHandler />
      <LenisScrollProvider>
        <div id="app" className="min-h-screen dark:bg-black">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/products" element={<Products />} />
            <Route path="/items/:id" element={<Items />} />
          </Routes>
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
