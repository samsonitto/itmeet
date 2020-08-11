import React from 'react'
import { Button } from 'react-bootstrap'

const Participants = ({ event, deleteParticipant }) => {

  if (event.participants) {
    return (
      <>
        {event.participants.map(p =>
          <tr key={p.userId}>
            <td>{p.name}</td>
            <td><Button variant="danger" size="sm" onClick={() => deleteParticipant(p.userId)}>Remove</Button></td>
          </tr>
        )}
      </>
    )
  } else {
    return null
  }
}

export default Participants