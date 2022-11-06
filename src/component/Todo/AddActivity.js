
import "./AddActivity.css";
import { useState } from "react";
const AddActivity = ({ setAddToggle, addToggle }) => {

    const [activity, setActivity] = useState('');
    const createHandler = (e) => {
        fetch("https://todoapp10x.herokuapp.com/todoList", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "accessToken": sessionStorage.getItem("accessToken")
            },
            body: JSON.stringify({ activity })
        })
            .then(data => data.json())
            .then(res => {
                if (res.message === "success") {
                    alert("task created successfully");
                    setAddToggle(!addToggle)
                }
            });
    }
    return (
        <>
            <div className="activityContainer">
                <div>
                    <p>Create new activity</p>
                    <input type="text" value={activity} onChange={(e) => setActivity(e.target.value)} />
                    <br />

                    <button onClick={createHandler}>Create</button>
                    <button onClick={() => { setAddToggle(!addToggle) }}>cancel</button>

                </div>
            </div>
        </>
    )
}
export default AddActivity;




