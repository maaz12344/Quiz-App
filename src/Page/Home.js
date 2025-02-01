import React from 'react'
import { useNavigate } from "react-router-dom";
function Home(props) {
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form reload
        console.log("hello world")

        navigate("/quiz");

    }
    return (
        <div className="home-container">
            <h1>Welcome to the Testline Quiz 🎮</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder="Enter the name:" type="text" name="name" id="name" onChange={props.changeName} required />
                {props.name === "" ?
                    <button type="submit" className="start-button" disabled={true}>Start Quiz</button>
                    :
                    <button type="submit" className="start-button">Start Quiz</button>

                }
            </form>
        </div>
    );
}

export default Home;
