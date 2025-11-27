import { useState } from "react";
import { AppLayout } from "./components/layout/AppLayout";
import { MapView } from "./components/MapView";

function App() {
  const [showWms, setShowWms] = useState(true);

  const handleToggleWms = () => {
    setShowWms((prev) => !prev);
  };

  return (
    <AppLayout showWms={showWms} onToggleWms={handleToggleWms}>
      <MapView showWms={showWms} />
    </AppLayout>
  );
}

export default App;
