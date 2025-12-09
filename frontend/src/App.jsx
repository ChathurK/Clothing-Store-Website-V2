import ScreenSizeIndicator from "./components/ScreenSizeIndicator";
import Landing from "./pages/Landing";
import LenisScrollProvider from "./components/LenisScrollProvider";

function App() {
  return (
    <LenisScrollProvider>
      <div className="min-h-screen dark:bg-black">
        <Landing />
        {/* <ScreenSizeIndicator /> */}
      </div>
    </LenisScrollProvider>
  );
}

export default App;
