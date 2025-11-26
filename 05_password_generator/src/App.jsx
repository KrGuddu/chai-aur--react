import { useCallback, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);                          //length ko track krne ke liye useState lagega
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);                     // Agr sirf equal to(=) dege to value ko bar bar override kar dega to value override na ho uske liye += lagayege, matlab char se jo v value ayegi wo pass ke under store ho jayegi [matlab, old value me new value add hokar update/final value degi].     // yani, yaha par value concatenate or append ho rhi hai.
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);                        // yaha optimized ki bat ho rhi hai    //yaha par mera goal chache/memory me rakhne ka hai.

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);        // ye line na v de to v koe dikkat nhi hai
    window.navigator.clipboard.writeText(password);       // use to write password, jab v value ko copy kare aur window clipboard par kahi v paste kare to wo value paste ho jana chahiye matlab value aa jani chahiye.
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);                 //Aur aya operation ki bat ho rhi hai ki kux v chher-chhar(update) ho to phir se run kar do operation ko.      // yaha par mera goal run karne ka hai.


  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          copy
        </button>
      </div>
      
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}                                            // yaha par onChange directly nhi de skta qki mujhe event v pass krna hoga, aur jab event pass karege to actually me ye event setLength property ko call kar payega. And setLength ke under value dege jo ki e.target.value se ayega.
          />
          <label>Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);          // jab v iss tarah ke events propagate karne hote hai to ek callBack fired krna hota hai like ( ()=> ). Aur es callback ke under previous value ka access milta hai and then updated value (yaha par reverse value) likhte hai like  !prev.
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
