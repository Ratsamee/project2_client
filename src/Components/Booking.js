import React, { Component } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Form } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../Css/Booking.css';

const SERVICES_ID_URL = 'https://bookbeauty.herokuapp.com/services/:id.json';
const BOOKING_URL = 'http://bookbeauty.herokuapp.com/bookings.json';

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            service: {}
        };

        const serviceId = this.props.match.params.serviceId;
        const fetchData = () => {
            const url = SERVICES_ID_URL.replace(":id", serviceId);
            axios.get(url).then((results) => {
                this.setState({ service: results.data });
            });
        }
        fetchData();
        this.savebooking = this.savebooking.bind(this);
    }

    savebooking(date, booking_time) {
        const data = {
            date: new Date(date),
            booking_time: Number(booking_time),
            user_id: Number(localStorage.user_id),
            retail_id: this.state.service.retail_id,
            service_id: this.state.service.id,
            iscancel: false
        };
        axios.post(BOOKING_URL, data).then((response) => {
            // after save, redirect to my booking page
            this.props.history.push("/customerbookinglist");
        });
    }

    render() {
        return (
            <div>
                <Container>
                    <h3>Choosing your service time</h3>
                    <ListGroup>
                        <ListGroup.Item>
                            <Row>
                                <Col><strong>{this.state.service.title}</strong></Col>
                                <Col>{this.state.service.description}</Col>
                                <Col><span role='img' aria-label='sheep'>🕗</span>{this.state.service.duration} min</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item variant="secondary">
                            <Row>
                                <Col>Total</Col>
                                <Col></Col>
                                <Col><span role='img' aria-label='sheep'>💲</span>{this.state.service.price}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <BookingForm onSubmit={this.savebooking} />
                        </ListGroup.Item>
                    </ListGroup>
                </Container>

            </div>
        );
    }
}
class BookingForm extends Component {
    constructor() {
        super();
        this.state = {
            date: Date.now(),
            booking_time: 9
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(date) {
        this.setState({ date: new Date(date) });
        console.log('booked date:', new Date(date).toLocaleDateString("en-GB"));

    }
    handleClick(event) {
        event.preventDefault();
        this.setState({ booking_time: event.target.value });
        console.log('booked time', event.target.value);
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.date, this.state.booking_time);
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Col>
                            <h5>Please select a date</h5>
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={this.state.date}
                                onChange={this.handleChange}
                                isClearable={true}
                                placeholderText="Click to select a date"
                            />
                        </Col>
                        <Col>
                            <Card style={{ width: '36rem' }}>
                                <Card.Body>
                                    <Card.Title>Please select time</Card.Title>
                                    <Row>
                                        <Col><Button variant="warning" value="9"
                                            onClick={this.handleClick}>9:00</Button></Col>
                                        <Col><Button variant="warning" value="10"
                                            onClick={this.handleClick}>10:00</Button></Col>
                                        <Col><Button variant="warning" value="11"
                                            onClick={this.handleClick}>11:00</Button></Col>
                                        <Col><Button variant="warning" value="12"
                                            onClick={this.handleClick}>12:00</Button></Col>
                                    </Row>
                                    <Row>
                                        <Col><Button variant="warning" value="13"
                                            onClick={this.handleClick}>13:00</Button></Col>
                                        <Col><Button variant="warning" value="14"
                                            onClick={this.handleClick}>14:00</Button></Col>
                                        <Col><Button variant="warning" value="15"
                                            onClick={this.handleClick}>15:00</Button></Col>
                                        <Col><Button variant="warning" value="16"
                                            onClick={this.handleClick}>16:00</Button></Col>
                                    </Row>
                                    <Row>
                                        <Col><Button variant="warning" value="17"
                                            onClick={this.handleClick}>17:00</Button></Col>
                                        <Col><Button variant="warning" value="18"
                                            onClick={this.handleClick}>18:00</Button></Col>
                                        <Col><Button variant="warning" value="19"
                                            onClick={this.handleClick}>19:00</Button></Col>
                                        <Col><Button variant="warning" value="20"
                                            onClick={this.handleClick}>20:00</Button></Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <p>Your booked date: {new Date(this.state.date).toLocaleDateString("en-GB", { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}</p>
                            <p>Your booked time is: {this.state.booking_time}:00</p>
                        </Col>
                        <Col>
                            <Button variant="primary" type="submit">
                                Confirm booking
                        </Button>
                        </Col>
                    </Form.Row>

                </Form>

            </div>
        );
    }
}
export default Booking;