
import React, {useState} from 'react'

export default function Text(props) {

  const [input, setInput] = useState(""); // State for name input

  function onChangeTextHandler(e){
    setInput(e.target.value)

  }

  function onSubmitHandlerUp(){
   let newInput = input.toUpperCase();
   setInput(newInput);
  }

  function onSubmitHandlerLo(){
    let newInput = input.toLowerCase();
    setInput(newInput);
   }
  return (
    <>
    <div className='container'>
      
 <div className="mb-3">
  
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={input} onChange={(e) => onChangeTextHandler(e)}></textarea>
</div>

<button type="submit" className="btn btn-primary mb-3" style={{marginRight:'12px'}} onClick={() => onSubmitHandlerUp()} >Uppercase</button>
<button type="submit" className="btn btn-primary mb-3" onClick={() => onSubmitHandlerLo()} >Lowercase</button>
    </div>
<div className="container my-4">
<h1>Your Input Summary</h1>
<p>
  Your Input Contains {input.split(" ").length} Words.
  Your Input Contains {input.length} Characters.
</p>
</div>
    </>
  )
}
