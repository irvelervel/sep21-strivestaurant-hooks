// for fetching external data and use it in our component, we'll need
// to store it in the STATE
// we're building Reservations as a Class Component

// in this component we're going to grab all the reservations sent through the form
// our reservations are going to come back as an array of objects

// [ {}, {}, {}, ... ]

// we need to make room in our state for the incoming array of reservations
// the state variable you're going to use for storing the array of reservations
// must be initialized with an EMPTY ARRAY (because we still want to be able to map() it)

import { useState, useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import { parseISO, format } from "date-fns";

const Reservations = () => {

    const [reservations, setReservations] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    // what's the best practise to fill our state up with data coming from an API?

    // componentDidMount is a lifecycle method
    // it will allow you to inject come logic immediately after the mounting of the
    // component into the DOM
    // you can use componentDidMount just in a Class Component

    // componentDidMount is PERFECT for fetching remote data in a React Component
    // it happens AFTER the initial invokation of render()

    // 1) render()
    // 2) componentDidMount()
    // ...and, if you're setting the state in componentDidMount
    // 3) render()

    useEffect(() => {
        fetchReservations()
    }, [
        // if I leave this empty, this is just like componentDidMount!
    ])

    // componentDidMount = () => {
    //     console.log("I'm the componentDidMount")
    //     // let's do our fetch here!
    //     this.fetchReservations()
    //     // now let's set the state of the component with the reservations we just grabbed!

    //     // componentDidMount gets just called ONCE
    //     // that's why it's the perfect place for an initial fetch
    // }

    const fetchReservations = async () => {
        try {
            let response = await fetch('https://striveschool-api.herokuapp.com/api/reservation')
            console.log(response)
            // we came here after some time...

            if (response.ok) {
                // we got something! the response code was likely 200
                let data = await response.json()
                // console.log(data)

                setReservations(data)
                setIsLoading(false)

                // this.setState({
                //     reservations: data, // <-- this.state.reservations now is NOT a [] anymore
                //     isLoading: false
                // })
            } else {
                // if we fall here we're getting an error, maybe a 404

                setIsLoading(false)
                setIsError(true)

                // this.setState({
                //     isLoading: false,
                //     isError: true
                // })
            }
        } catch (error) {
            // an internet problem

            setIsLoading(false)
            setIsError(true)

            // this.setState({
            //     isLoading: false,
            //     isError: true
            // })
        }
    }

    // the render() method FIRES AGAIN every time there's a change in the state
    // or in the props of this component

    console.log("I'm the render")
    return (
        <>
            <h2 className="mt-4">BOOKED TABLES</h2>
            {
                isLoading && <Spinner animation="border" variant="info" />
            }
            {
                isError ? (
                    <Alert variant="danger">
                        Something went wrong :(
                    </Alert>
                ) : (
                    <ListGroup className="mb-5">
                        {
                            reservations.map(res => (
                                <ListGroup.Item key={res._id}>
                                    {res.name} for {res.numberOfPeople} on {format(parseISO(res.dateTime), 'EEEE, MMM. do - HH:mm')}
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                )
            }
        </>
    )
}

export default Reservations

// dateTime is a string coming from the db in the reservations objects

// 2022-03-26T20:04:00.000Z

// the process for converting this string into something more readable (Saturday, Nov. 26th at...)
// goes like this:

// 1) you have to convert that string into a Date object, for retrieving all the info about that date
// 2) convert BACK that Date object into another string