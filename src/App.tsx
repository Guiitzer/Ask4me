import React from "react";

function App() {
  const [count, setCount] = React.useState<number>(0)

  return (
    <>
<button onClick={()=> setCount( count + 1 )}>Click Me!</button>
<div>{count}</div>

    </>
  );
}

export default App;
