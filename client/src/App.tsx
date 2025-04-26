import { useState } from "react";
import { Map } from "./components/Map";
import { TopNav } from "./components/TopNav";

function App() {
  const [income, setIncome] = useState(0);
  const [rateRange, setRateRange] = useState<[number, number]>([0, 20]);

  return (
    <>
      <TopNav
        income={income}
        setIncome={setIncome}
        rateRange={rateRange}
        setRateRange={setRateRange}
      />
      <Map income={income} rateRange={rateRange} />
    </>
  );
}

export default App;
