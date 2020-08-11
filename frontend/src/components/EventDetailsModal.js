import React, { useState } from 'react'
import { Modal, Button, Table, Alert } from 'react-bootstrap'
import Participants from './Participants'

const EventDetailsModal = ({ handleClose, show, event, participate, notify, remove }) => {
  const [username, setUsername] = useState('')
  const [notification, setNotification] = useState({})
  const [data, setData] = useState(event)
  
  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const notifyHere = (notObj) => {
    setNotification(notObj)
    setTimeout(() => {
      setNotification({})
    }, 7000)
  }

  const createParticipant = () => {
    if (!username) {
      notifyHere({
        variant: "danger",
        body: "Input name!",
        show: true
      })
    } else if (event.participants.find(p => p.name.toLowerCase() === username.toLowerCase())) {
      notifyHere({
        variant: "danger",
        body: "You have already participated!",
        show: true
      })
    } else {
      const participant = {
        name: username,
        eventID: event.id
      }
  
      participate(participant)
      setUsername('')
      //handleClose("events")
      notify({
        variant: 'success',
        body: `${participant.name} is participating in the "${event.eventName}" event!`,
        show: true
      })
    }
  }

  const deleteParticipant = (id) => {
    console.log(data)
    
    try {
      remove(id)
      if(Object.keys(data).length === 0) {
        setData(event.participants.filter(p => p.userId !== id))
        console.log('1', event.participants.filter(p => p.userId !== id));
        
      } else {
        setData(data.participants.filter(p => p.userId !== id))
        console.log('2');
        
      }
    } catch (error) {
      notify({
        variant: "danger",
        body: error.message,
        show: true
      })
    }
    console.log(data)
  }

  const addPerson = () => {
    setData(data.concat({name: 'lorppa', age: 33}))
  }

    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{event.eventName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Alert variant={notification.variant} show={!notification.show ? false : notification.show}>{notification.body}</Alert>
          <p>{event.eventAddress}, {new Date(event.eventDate).toLocaleString()}</p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {/* {event.participants.map(p => 
                <tr className="event" key={p.userId}>
                  <td>{p.name}</td>
                  <td><Button size="sm" variant="danger" onClick={() => deleteParticipant(p.userId)}>Remove</Button></td>
                </tr>
              )} */}
              <Participants event={Object.keys(data).length === 0 ? event : data} deleteParticipant={deleteParticipant} />
            </tbody>
          </Table>
          </Modal.Body>
          <Modal.Footer>
            <span>
              <input placeholder="name" className="mr-1" onChange={(e) => handleUsername(e)} />
              <Button variant="primary" onClick={createParticipant}>Participate</Button>
            </span>
            <Button variant="secondary" onClick={() => handleClose("events")}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}

export default EventDetailsModal