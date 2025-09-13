import { Outlet } from "react-router";
import Navigation from "./components/Navigation/Navigation";
import { useState } from "react";

export function App() {
  const [checkoutItems, setCheckoutItems] = useState([]);

  return (
    <div>
      <Navigation itemLength={checkoutItems.length}></Navigation>
      <Outlet context={[checkoutItems, setCheckoutItems]} />
    </div>
  );
}

export default App;
