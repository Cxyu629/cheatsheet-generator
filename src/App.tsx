import { createSignal, onCleanup, onMount } from "solid-js";
import "./App.css";
import Menu from "./Menu";
import PrintDisplay from "./PrintDisplay";

function App() {
  const [rect, setRect] = createSignal<{ height: number; width: number }>({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [numCols, setNumCols] = createSignal<number>(3);

  const resizeHandler = () => {
    setRect({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  onMount(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
  });

  onCleanup(() => window.removeEventListener("resize", resizeHandler));

  return (
    <>
      <Menu rect={rect} numCols={numCols} setNumCols={setNumCols} />
      <div style={`width: ${rect().width}px`}>
        <PrintDisplay numCols={numCols} rect={rect}></PrintDisplay>
      </div>
    </>
  );
}

export default App;
