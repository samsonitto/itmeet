import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Button, Alert } from 'react-bootstrap'
import './App.css'
import EventDetailsModal from './components/EventDetailsModal'
import AddEventModal from './components/AddEventModal'

const baseURL = 'http://142.93.231.94:3001'

function App() {
  const [show, setShow] = useState(false)
  const [showAddEvent, setShowAddEvent] = useState(false)
  const [events, setEvents] = useState([])
  const [users, setUsers] = useState([])
  const [notification, setNotification] = useState({})
  const [event, setEvent] = useState({})

  useEffect(() => {
    axios.get(`${baseURL}/api/events`).then(res => {
      setEvents(res.data.sort((a, b) => (a.eventDate < b.eventDate) ? 1 : -1))
      
    }).catch(error => {
      console.log(error)
    })

    axios.get(`${baseURL}/api/users`).then(res => {
      setUsers(res.data)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  const handleCloseEvents = () => {
      setShowAddEvent(false)
  }

  const handleCloseDetails = () => {
      setShow(false)
  }

  const handleShow = (modal, event) => {
    if(modal === "events") {
      setEvent(event)
      setShow(true)
    } else {
      setShowAddEvent(true)
    }
  }

  const createEvent = (newEvent) => {
    try {
      axios.post(`${baseURL}/api/events`, newEvent).then(res => {
        console.log('response', res);
        setEvents(res.data.sort((a, b) => (a.eventDate < b.eventDate) ? 1 : -1))
      })
    } catch (error) {
      notify({
        variant: "danger",
        body: error.message,
        show: true
      })
    }
  }

  const participate = (newUser) => {
    try {
      axios.post(`${baseURL}/api/users`, newUser).then(res => {
        console.log('response', res);
        setUsers(res.data)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const removeParticipation = (userId) => {
    console.log('userID', userId);
    axios.delete(`${baseURL}/api/users/${userId}`).then(() => {
      notify({
        variant: "success",
        body: `You have removed ${users.find(u => u.userId === userId).name} from the "${event.eventName}" event`,
        show: true
      })
      setUsers(users.filter(user => user.userId !== userId))
      //handleCloseDetails()
      
    }).catch(error => {
      notify({
        variant: "danger",
        body: error.message,
        show: true
      })
    })
  }

  const notify = (notObj) => {
    setNotification(notObj)
    setTimeout(() => {
      setNotification({})
    }, 10000)
  }

  return (
    <div className="App">
      <h1>THE IT FUN</h1>
      <Alert className="m-3" variant={notification.variant} show={!notification.show ? false : notification.show}>{notification.body}</Alert>
      <div className="m-3">
        <h2>Events</h2>
        <Button className="mb-1" variant="primary" onClick={() => handleShow("add")}>Add Event</Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Date</th>
              <th>Participants</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => 
              <tr className="event" key={event.id} onClick={() => handleShow("events", {...event, participants: users.filter(u => u.eventID === event.id)})}>
                <td>{event.eventName}</td>
                <td>{event.eventAddress}</td>
                <td>{new Date(event.eventDate).toLocaleString()}</td>
                <td>{`${users.filter(u => u.eventID === event.id).length} / ${event.eventLimit}`}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <EventDetailsModal event={event} show={show} handleClose={handleCloseDetails} participate={participate} notify={notify} remove={removeParticipation} />
      <AddEventModal show={showAddEvent} handleClose={handleCloseEvents} createEvent={createEvent} notify={notify} />
    </div>
  );
}

export default App;
