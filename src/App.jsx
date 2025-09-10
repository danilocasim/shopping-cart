import { Outlet } from "react-router";
import Navigation from "./components/Navigation/Navigation";
import { useState } from "react";

export function App() {
  const [checkoutItems, setCheckoutItems] = useState([]);

  console.log(checkoutItems);
  return (
    <div>
      <Navigation></Navigation>
      <Outlet context={[checkoutItems, setCheckoutItems]} />
    </div>
  );
}

export default App;
