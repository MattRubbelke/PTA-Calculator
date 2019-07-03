import React from "react";
import "./style.css";

function Dashboard(props){
    return <div className="dashboard">
    <div>
        <h1 style={{margin: "20px auto"}}>Hello {props.user}!</h1>
    </div>
    <div>
        <p style={{fontSize: "20px"}}>Calculate your PTA! Click the add button to 
            add your application and input reference number. 
            Complete the form, and your PTA will be calculated.</p>
    </div>
    </div>
}

export default Dashboard