import PageBuilder from "./_components/PageBuilder";
import { ThreeProvider } from "./_context/ThreeContext";

const App: React.FC = () => (
  <ThreeProvider>
    <PageBuilder />
  </ThreeProvider>
);

export default App;
