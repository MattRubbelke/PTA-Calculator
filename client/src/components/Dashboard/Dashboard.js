import React from "react";

function Dashboard(props){
    return <div className="dashboard">
    <div>
        <h1 style={{margin: "20px auto"}}>{props.user}'s Dashboard</h1>
    </div>
    <div>
        <p style={{fontSize: "20px"}}>Capture your PTA throughout prosecution. Click the Add Patent button to add patents to your firm's 
        table of patents. View patent details, currently on file from the USPTO, by clicking on the More Info button. To add additional PTA time,
        click the Edit button. </p>
    </div>
    </div>
}

export default Dashboard