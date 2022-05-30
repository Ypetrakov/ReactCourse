import React, {Component} from "react";
import {
    Card, CardImg, CardText, CardBody, Modal,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Row, Col
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


function RenderDish({dish}) {
    return (
        <Card>
            <CardImg top src={dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

function RenderComments({comments}) {
    if (comments == null)
        return (
            <div></div>
        )

    const comment = comments.map((comment) => {
        return (
            <div>
                <div className="row mt-4 m-1">{comment.comment}</div>
                <div className="row mt-4 m-1">--{comment.author} {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }).format(new Date(Date.parse(comment.date)))}</div>
            </div>
        )
    })

    return (
        <div>
            <h4>Comments</h4>
            {comment}
        </div>

    );
}


class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }

    render() {
        return (
            <div>
                <Button outline className="mt-2" onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit({values})}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                                      className="form-control">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>

                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Username</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                                  placeholder="Your Name"
                                                  className="form-control"
                                                  validators={{
                                                      required, minLength: minLength(3), maxLength: maxLength(15)
                                                  }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".yourName"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 3 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />

                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                                      rows="7"
                                                      className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={5}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const DishDetail = (props) => {
    const dish = props.dish

    if (dish == null)
        return (
            <div></div>
        );

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr/>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish}/>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments}/>
                    <CommentForm/>
                </div>

            </div>
        </div>
    );
}


export default DishDetail;
