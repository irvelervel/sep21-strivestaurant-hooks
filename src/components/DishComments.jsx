import ListGroup from 'react-bootstrap/ListGroup'

const DishComments = (props) => (
    <ListGroup>
        {
            // the && is a conditional rendering operator
            // is called SHORT CIRCUIT
            // if the section before the && is truthy, the second
            // half will be rendered
            // this.state.selectedDish && this.state.selectedDish.comments.map(c => (
            //     <ListGroup.Item key={c.id}>{c.comment}</ListGroup.Item>
            // ))

            // otherwise, if you want to provide 2 different outputs, you can
            // use the good & ol' ternary operator
            props.selectedDish ? props.selectedDish.comments.map(c => (
                <ListGroup.Item key={c.id}>{c.comment}</ListGroup.Item>
            )) : <ListGroup.Item>Click on a pasta to see the reviews!</ListGroup.Item>
        }
    </ListGroup>
)

export default DishComments