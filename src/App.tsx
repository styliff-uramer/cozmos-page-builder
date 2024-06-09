import Scene from "./_components/Scene";
import { ThreeProvider } from "./_context/ThreeContext";

const App: React.FC = () => (
  <ThreeProvider>
    <Scene />
  </ThreeProvider>
);

export default App;
