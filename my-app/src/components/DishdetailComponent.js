import React from "react";
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";


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

    function RenderComments({dish}) {
        if (!dish.comments.length)
            return (
                <div></div>
            )

        const comments = dish.comments.map((comment) => {
            return (
                <div>
                    <div className="row mt-4 m-1">{comment.comment}</div>
                    <div className="row mt-4 m-1">--{comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</div>
                </div>
            )
        })

        return (
            <div>
                <h4>Comments</h4>
                {comments}
            </div>

        );
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
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1" style={{wordWrap:"break-word"}}>
                        <RenderComments dish={props.dish}/>
                    </div>
                </div>
            </div>
        )
    }


export default DishDetail;
