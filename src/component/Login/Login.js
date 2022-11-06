import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    const submitForm = (e) => {
        e.preventDefault()
        fetch('https://todoapp10x.herokuapp.com/login', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(res => res.json()).then(data => {
            console.log(data)
            if (data.message === "incorrect password") {
                alert('Incorrect password')
            } else if (data.message === 'user not registered') {
                alert('user not registered')
            }
            else {
                sessionStorage.setItem("accessToken", data.token)

                navigate('/todo')
            }

        })
    }

    return (
        <div className='login_mainContainer'>
            <div className='login_middleContainer'>
                <p className='heading_title'>Member Login</p>
                <form onSubmit={submitForm} className='form' >
                    <input id='email' name='email' type="email" placeholder='Username' value={user.email} onChange={(e) => { setUser({ ...user, [e.target.name]: e.target.value }) }} />
                    <input id='password' name='password' type="password" placeholder='. . . . . . . . .' value={user.password} onChange={(e) => { setUser({ ...user, [e.target.name]: e.target.value }) }} />
                    <button type='sumbit'>LOGIN</button>
                </form>
                <div>
                    <p className='forgot'>Forgot Password?</p>
                    <p className='register' onClick={() => navigate('/register')}> Register?</p>
                </div>
            </div>
        </div>
    )
}

export default Login