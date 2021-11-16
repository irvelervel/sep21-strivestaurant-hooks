import { useState } from 'react'
import { Carousel, Container, Col, Row } from 'react-bootstrap'
import items from '../data/menu.json'
import DishComments from './DishComments'
import ReservationForm from './ReservationForm'
import Reservations from './Reservations'

// now I want to generate dinamically a list of comments
// the list should come from the last pasta slide I clicked on
// the list of comments wil be shown below the carousel
// for remembering which is the last pasta we clicked on we're gonna use the STATE
// for having a state object in a React Component, we cannot use the functional shape
// we have to convert the Home component from a function to a class
// once you have a class component, you can create a state object!

const Home = () => {

    const [selectedDish, setSelectedDish] = useState(null)

    return (
        // <div className="container" />
        <Container>
            {/* <div className="row" /> */}
            <Row className="mt-3 justify-content-center">
                {/* <div className="col" /> */}
                <Col xs={12} md={6} className="text-center">
                    <h1>Welcome to Strivestaurant!</h1>
                    <p>We can serve only pasta</p>
                    <Reservations />
                    <ReservationForm />
                    <Carousel className="mt-5">

                        {/* .map() and .forEach() are quite similar */}
                        {/* the only difference is that .map() RETURNS you a new array */}

                        {
                            items.map((pastaObject) => (
                                <Carousel.Item key={pastaObject.id}>
                                    <img
                                        className="d-block w-100"
                                        src={pastaObject.image}
                                        alt="First slide"
                                        // we cannot do this.state.selectedDish = pastaObject
                                        // SUPER WRONG!
                                        onClick={() => setSelectedDish(pastaObject)}
                                    // the setState method accepts an object
                                    // every property of this object will be
                                    // MERGED into the state of the component
                                    // and so if you pass to setState an object
                                    // with a property already present in the actual state
                                    // you're OVERWRITING that property, you're setting
                                    // a new value for it
                                    // final clue: every time you use the setState method
                                    // the component will re-render!!
                                    />
                                    <Carousel.Caption>
                                        <h3>{pastaObject.name}</h3>
                                        <p>{pastaObject.description}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            ))
                        }

                    </Carousel>
                </Col>
            </Row>
            <Row className="mt-3 justify-content-center">
                <Col xs={12} md={6} className="text-center">
                    <DishComments selectedDish={selectedDish} />
                </Col>
            </Row>
        </Container>
    )
}

export default Home

// the Home component is always remembering which one is the selected pasta
// the Dishcomments component always needs a pasta to show the comments for
