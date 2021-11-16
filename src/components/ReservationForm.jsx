import { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// HOW TO CREATE AN OBJECT PROPERTY FROM THE VALUE OF A VARIABLE/PARAMETER?
let myObj = {}
let property = 'studentName'

// you want to create a property into myObj called 'studentName'
// (so with the VALUE of the name variable!)

// this will create a property called 'name', not 'studentName'
myObj.property = 'Stefano Casasola'

// the result (not what you wanted...)
// let myObj = {
//     property: 'Stefano Casasola'
// }

// this instead will create a property called 'studentName',
// so the VALUE of the variable property
myObj[property] = 'Stefano Casasola'

// the result (this time is right!)
// let myObj = {
//     studentName: 'Stefano Casasola'
// }

const ReservationForm = () => {

    // this component will be about a form for submitting a restaurant reservation
    // we want to leverage the state of this component to hold the values of the input fields

    // fields of my form:
    // name
    // phone
    // numberOfPeople
    // smoking
    // dateTime
    // specialRequests

    const [reservation, setReservation] = useState({
        name: '',
        phone: '',
        numberOfPeople: 1,
        smoking: false,
        dateTime: '',
        specialRequests: ''
    })


    const handleInput = (fieldName, value) => {
        // which parameter do I need?
        // 1) field name
        // 2) the value for the field

        setReservation({
            ...reservation,
            [fieldName]: value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        console.log(reservation)
        try {
            let response = await fetch('https://striveschool-api.herokuapp.com/api/reservation', {
                method: 'POST',
                body: JSON.stringify(reservation),
                headers: {
                    'Content-type': 'application/json'
                }
            })

            if (response.ok) {
                alert('OK!')
                // let's reset the form restoring the initial values
                setReservation({
                    name: '',
                    phone: '',
                    numberOfPeople: 1,
                    smoking: false,
                    dateTime: '',
                    specialRequests: ''
                })
            } else {
                alert('ERROR')
                // you'll fall here if something went wrong on the request processing
            }
        } catch (error) {
            // probably you'll fall here if your internet connection has a problem...
            console.log(error)
        }
    }

    return (
        <>
            <h2>Book your table NOW!</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Your name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Input your name"
                        value={reservation.name}
                        onChange={(e) => {
                            // this is the long way
                            // this.setState({
                            //     reservation: {
                            //         // spread operator
                            //         ...this.state.reservation,
                            //         name: e.target.value
                            //     }
                            // })
                            // and now this is with the function I created:
                            handleInput('name', e.target.value)
                        }}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Your phone</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="Input your cellphone"
                        value={reservation.phone}
                        onChange={(e) => {
                            handleInput('phone', e.target.value)
                        }}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>How many people?</Form.Label>
                    <Form.Control as="select"
                        value={reservation.numberOfPeople}
                        onChange={(e) => {
                            handleInput('numberOfPeople', e.target.value)
                        }}
                        required
                    >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Check
                        type="checkbox"
                        label="Do you smoke?"
                        // value -> on/off, not very useful
                        checked={reservation.smoking}
                        onChange={(e) => {
                            handleInput('smoking', e.target.checked)
                        }}

                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date?</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        value={reservation.dateTime}
                        onChange={(e) => {
                            handleInput('dateTime', e.target.value)
                        }}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Any special request?</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        value={reservation.specialRequests}
                        onChange={(e) => {
                            handleInput('specialRequests', e.target.value)
                        }}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default ReservationForm