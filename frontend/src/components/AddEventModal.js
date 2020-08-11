import React, { useState } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'

const AddEventModal = ({ handleClose, show, createEvent, notify }) => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [place, setPlace] = useState('')
  const [limit, setLimit] = useState(null)
  const [notification, setNotification] = useState({})

  
  const notifyHere = (notObj) => {
    setNotification(notObj)
    setTimeout(() => {
      setNotification({})
    }, 10000)
  }

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleDate = (e) => {
    setDate(e.target.value)
  }

  const handleTime = (e) => {
    setTime(e.target.value)
  }

  const handlePlace = (e) => {
    setPlace(e.target.value)
  }

  const handleLimit = (e) => {
    setLimit(Number(e.target.value))
  }

  const addEvent = () => {
    if(!name) {
      notifyHere({
        variant: 'danger',
        body: 'Input name of the event!',
        show: true
      })
    }
    else if(!date) {
      notifyHere({
        variant: 'danger',
        body: 'Input date of the event!',
        show: true
      })
    }
    else if(!time) {
      notifyHere({
        variant: 'danger',
        body: 'Input time of the event!',
        show: true
      })
    }
    else if(!place) {
      notifyHere({
        variant: 'danger',
        body: 'Input place of the event!',
        show: true
      })
    }
    else if(!limit) {
      notifyHere({
        variant: 'danger',
        body: 'Input maximum amout of participants for this event!',
        show: true
      })
    }
    else {
      const newEvent = {
        eventName: name,
        eventDate: `${date} ${time}:00`,
        eventAddress: place,
        eventLimit: limit
      }
  
      createEvent(newEvent)
      resetForm()
      notify({
        variant: 'success',
        body: `You have added ${newEvent.eventName}`,
        show: true
      })
      handleClose("add")
    }
  }

  const resetForm = () => {
    setName('')
    setDate('')
    setTime('')
    setPlace('')
  }
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant={notification.variant} show={!notification.show ? false : notification.show}>{notification.body}</Alert>
          <Form>
            <Form.Group>
              <Form.Label>Event name</Form.Label>
              <Form.Control type="text" placeholder="Enter event name..." onChange={(e) => handleName(e)} />
              <Form.Label>Event date</Form.Label>
              <Form.Control type="date" placeholder="Enter event date..." onChange={(e) => handleDate(e)} />
              <Form.Label>Event time</Form.Label>
              <Form.Control type="time" placeholder="Enter event date..." onChange={(e) => handleTime(e)} />
              <Form.Label>Event place</Form.Label>
              <Form.Control type="text" placeholder="Enter event place..." onChange={(e) => handlePlace(e)} />
              <Form.Label>Max participants</Form.Label>
              <Form.Control type="number" placeholder="Maximum number of participants" onChange={(e) => handleLimit(e)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose("add")}>
            Close
          </Button>
          <Button variant="primary" onClick={addEvent}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddEventModal