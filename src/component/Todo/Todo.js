import React, { useState, useEffect } from 'react'
import './Todo.css'
import AddActivity from './AddActivity'
import { useNavigate } from 'react-router-dom'

function Todo() {
  const navigate = useNavigate()
  const [username, setusername] = useState('')
  const [addToggle, setAddToggle] = useState(false)
  const [todoData, settodoData] = useState([])
  const [start, setStart] = useState('')
  const [on, setOn] = useState(false)
  const [sec, setsec] = useState(0)
  const [min, setMin] = useState(0)
  const [hour, setHour] = useState(0)
  const [hide, setHide] = useState(true)




  useEffect(() => {
    if (!sessionStorage.getItem("accessToken")) {
      navigate('/')
    }
    fetch('https://todoapp10x.herokuapp.com/username', {
      method: 'get',
      headers: {
        accessToken: sessionStorage.getItem("accessToken"),
      }
    }).then(res => res.json()).then(data => {

      setusername(data.message)

    })
  }, [])
  useEffect(() => {
    fetch('https://todoapp10x.herokuapp.com/todoListAll', {
      method: 'get',
      headers: {

        accessToken: sessionStorage.getItem("accessToken"),
      }
    }).then(res => res.json()).then(data => {

      settodoData(data)
      console.log(data)


    })
  }, [addToggle, on])

  const logout = () => {
    sessionStorage.removeItem("accessToken")
    navigate('/')
  }

  const starttask = (e) => {

    if (!start) {
      setStart(e.target.id)


      fetch('https://todoapp10x.herokuapp.com/todoListUpdate', {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
          accessToken: sessionStorage.getItem("accessToken"),
        }, body: JSON.stringify({
          id: e.target.id,
          status: "ongoing"
        })
      }).then(res => res.json()).then(data => {
        setOn(true)
      })
    }
  }

  if (on) {

    setInterval(() => {
      setsec(sec + 1)

    }, 1000)
  }
  if (sec === 60) {
    setMin(min + 1)
    setsec(0)
  }
  if (min === 60) {

    setHour(hour + 1)
    setMin(0)
  }
  let time = `0${hour}:0${min}:${sec}`
  const endTask = (e) => {
    fetch('https://todoapp10x.herokuapp.com/todoListUpdateStop', {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        accessToken: sessionStorage.getItem("accessToken"),
      }, body: JSON.stringify({
        id: e.target.id,
        time_taken: time, status: "completed"
      })
    }).then(res => res.json()).then(data => {
      setStart('')
      setOn(false)
    })
  }

  const pause = () => {
    setHide(false)
    setOn(false)
  }
  const resume = () => {
    setOn(true)
    setHide(true)
  }
  return (
    <div className='todo_mainContainer'>
      <header className='todo_header'>
        <p>{username.split('@')[0].toUpperCase()}</p>
      </header>
      <div className='todo_container'>
        <section className='todo_sidebar'>
          <div>
            <p className='todoname'>To Do List</p>
            <p className='History'>History</p>
            <br />
            <div className='historydata'>
              {
                todoData.map((data, i) => (
                  <div key={i}>
                    <span>{data.status === "completed" ? data.activity : ""}</span>
                    &nbsp;&nbsp;
                    <span>{data.status === "completed" ? data.time_taken : ""}</span>
                  </div>
                ))
              }
            </div>
          </div>
          <button className="btn btn-danger" onClick={() => { logout() }}>logout</button>
        </section>
        <section className='todo_todoContainer'>
          <div className='todo_addactivity'>
            <button onClick={() => { setAddToggle(!addToggle) }} >Add new activity</button>
          </div>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Activity</th>
                  <th scope="col">Status</th>
                  <th scope="col">Time Taken(Hrs:Min:Sec)</th>
                  <th className='action' scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  todoData.map((data, i) => (


                    <tr key={i}>
                      <th scope="row">{data.activity.toUpperCase()}</th>
                      <td>{hide ? data.status : "pending"}</td>
                      <td>{data.time_taken}</td>
                      {<td>

                        {data.status === "pending" ? <button className='taskstarter' id={data._id} onClick={(e) => starttask(e)}>Start</button> : ""}
                        <div className='pause'>
                          {hide && data.status === "ongoing" ? <button id={data._id} onClick={(e) => { endTask(e) }} className='end btn btn-danger'>end</button> : ''}
                          {hide && data.status === "ongoing" ? <button id={data._id} onClick={(e) => { pause(e) }} className='end '>pause</button> : ''}
                        </div>
                        {!hide && data.status !== "pending" && data.status !== "completed" && < button id={data._id} onClick={(e) => { resume(e) }} className='end '>Resume</button>}
                      </td>}
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

        </section>
      </div >
      {
        addToggle && <AddActivity setAddToggle={setAddToggle} addToggle={addToggle} />
      }
    </div >
  )
}

export default Todo