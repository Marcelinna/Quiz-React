import React from "react";



const Progress =({steps})=>{

    return(
        <div className="progress"> 
           {steps.map(step=>(

           <div key={step.step.toString()} className={step.selected?`progress__step progress__step--selected`:`progress__step`}>{step.completed? <span>&#10003;</span>: step.step}</div>

           ))}
            
        </div>
    );
}



export default Progress;