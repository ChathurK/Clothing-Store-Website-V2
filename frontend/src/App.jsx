import ScreenSizeIndicator from "./components/ScreenSizeIndicator";
import Landing from "./pages/Landing";
import SmoothScrollWrapper from "./components/SmoothScrollWrapper";

function App() {
  return (
    //<SmoothScrollWrapper smoothness={0.1} damping={0.9}>
    <div className="min-h-screen dark:bg-black">
      <Landing />
      <ScreenSizeIndicator />
    </div>
    //</SmoothScrollWrapper>
  );
}

export default App;
