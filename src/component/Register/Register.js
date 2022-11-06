import React, { useState } from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom'
function Register() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [cnfpass, setcnfpass] = useState('')
    const navigate = useNavigate()

    const submitForm = (e) => {
        e.preventDefault()
        if (user.password !== cnfpass) {
            alert('password not match')
        } else {

            fetch('https://todoapp10x.herokuapp.com/register', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }).then(res => res.json()).then(data => {
                console.log(data)
                if (data.message === "user already registered") {
                    alert('user already registered')
                } else {
                    navigate('/')
                }
            })
        }
    }
    return (
        <div className='Register_mainContainer'>
            <div className='Register_middleContainer'>
                <p className='heading_title'>Register</p>
                <form onSubmit={submitForm} className='form' >
                    <input id='email' name='email' type="email" placeholder='Username' value={user.email} onChange={(e) => { setUser({ ...user, [e.target.name]: e.target.value }) }} />
                    <input name='password' type="password" placeholder='password' value={user.password} onChange={(e) => { setUser({ ...user, [e.target.name]: e.target.value }) }} />
                    <input name='password' type="password" placeholder='confirm password' value={cnfpass} onChange={(e) => { setcnfpass(e.target.value) }} />
                    <button type='sumbit'>Register</button>
                </form>
                <p className='login' onClick={() => navigate('/')}>Member Login</p>
            </div>
        </div>
    )
}

export default Register