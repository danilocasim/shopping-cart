import { Outlet } from "react-router";
import Navigation from "./components/Navigation/Navigation";

export function App() {
  return (
    <div>
      <Navigation></Navigation>
      <Outlet />
    </div>
  );
}

export default App;
