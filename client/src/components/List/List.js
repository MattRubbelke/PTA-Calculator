import React from "react";
import "./style.css";


export function List ({children}) {
    return (
    <div>{children}</div>
);
}

export function Table({children}){
    return(
    <table className="dashboard"
    style={{marginBottom: "50px"}}>
        {children}
    </table>
    )
}

export function Header(){
    return(
    <tr>
        <th>File Number</th>
        <th>Application Number</th> 
        <th>PTA Days</th>
        <th>More Information</th>
        <th>Edit</th>
        <th>Delete</th>
    </tr>)
}

export function ListItem(props){
return (
            <tr>
                <td>{props.application.fileNo}</td>
                <td>{props.application.appNo}</td> 
                <td>{props.application.PTA}</td>
                <td><a style={{color: "white"}} href={"/apps/"+ props.application._id}><button type="button" className="btn btn-info">More Info</button></a></td>
                <td><a style={{color: "white"}} href={"/add/" + props.application._id}><button type="button" className="btn btn-primary">Edit</button></a></td>
                <td><button type="button" className="btn btn-danger" onClick={() => props.delete(props.application._id)}>Delete</button></td>
            </tr>
)
}