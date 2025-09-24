import React, { useCallback, useMemo, useState } from "react";

function Main() {
  const [num, setNum] = useState(1);
  const [count, setCount] = useState(2);

  function sum(num) {
    console.log(num);
  }

  function sub(e) {
    console.log("sub memo");
    return e + e;
  }

  // useCallback: memoizes function
  const val = useCallback(() => {
    return sum(num);
  }, [count]); // no dependency needed

  // useMemo: memoizes result
  const mem = useMemo(() => {
    let a = 1
    return sub(a);
  }, []); // depends on num

  console.log("render num:", num);
  
  return (
    <>
      <h1>Memo value: {mem}</h1>
      <h1>Callback value: {val()}</h1>
      <button onClick={() => setNum((prev) => prev + 1)}>btn1</button>
      <button onClick={() => setCount((prev) => prev + 1)}>btn2</button>

    </>
  );
}

export default Main;
