import { useEffect, useRef } from "react";

const App = () => {
let usref = useRef(0);

const run =()=>{
  let temp = Number(usref.current.value);
  temp+=1;
  console.log(typeof(temp));
  
  usref.current.value =temp;
  console.log(usref.current.value);
  
}

return(
  <>
 <input type="text" name="name" ref={usref}  defaultValue={0} />
 <button onClick={run}>add</button>
  </>
)
};

export default App;