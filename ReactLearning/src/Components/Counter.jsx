import React, { useReducer } from 'react'


function reducer(state,action){
    if(action.type=='INCREEMENT'){
        state = state + 1;
        return state;
    }
    if(action.type=='DECREMENT'){
        if(state>0){
        state = state - 1;
        return state;}
    }
    return state
    }
export default function Counter() {
   
        let [count,dispatch] = useReducer(reducer,0)
      return (
        <div>
          <h1>{count}</h1>
          <button  className="btn btn-primary mb-3" style={{marginRight:'12px'}}onClick={()=>dispatch({type:'INCREEMENT'})}>Increment</button>
          <button  className="btn btn-primary mb-3" onClick={()=>dispatch({type:'DECREMENT'})}>Decrement</button>
        </div>
      )
    }
    
    
    