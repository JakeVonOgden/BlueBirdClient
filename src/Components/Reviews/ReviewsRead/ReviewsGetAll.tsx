import * as React from 'react';
import ReviewsRender from './ReviewsRender';
import CommentsCreate from '../../Comments/CommentCreate';
import CommentsEdit from '../../Comments/CommendEdit';
import {Container} from 'reactstrap';


interface ReviewGetProps 
{
    sessionToken: string | null
    title: string | null
    image_url: string | null
    username: string | null
}
 
interface ReviewGetState 
{
    title: string | null,
    image_url: string | null,
    
    
    content: string,
    rating: number,
    
    userId: number
    userReviews: [ReviewJSON]
    
    commentActive: boolean,
    reviewToComment: ReviewJSON
    
    success: boolean

    commentId: number
    userComment: [CommentJSON]
    commentEditActive: boolean
    commentToEdit: CommentJSON
    
}

interface ReviewJSON
{
    anime: string,
    rating: number,
    content: string,
    image: string,
    owner: string,
    id: number
}

interface CommentJSON
{
    id: number,
    content: number,
    owner: string,
    createdAt: string,
}
 
class ReviewGet extends React.Component<ReviewGetProps, ReviewGetState, ReviewJSON> {
    constructor(props: ReviewGetProps) {
        super(props);
        this.state = {
            userReviews: [{
                anime: "",
                rating: 0, 
                content: "",
                image: "",
                owner: "",
                id: 0
            }],
            reviewToComment: {
                anime: "",
                rating: 0,
                content: "",
                image: "",
                owner: "",
                id: 0,
            },
            userComment: [{
                id: 0,
                content: 0,
                owner: "",
                createdAt: ""
            }],
            commentToEdit: {
                id: 0,
                content: 0,
                owner: "",
                createdAt: ""
            },  
            
            title: "",
            image_url: "",
            content: "",
            rating: 0,
            userId: 0,
            commentActive: false,
            success: false,

            commentId: 0,
            commentEditActive: false,

           
        };
    }
    


    fetchReviews = () => {
        fetch(`http://localhost:4000/review/${this.props.title}`, {
            method: "GET",
            headers: new Headers ({
                'Content-Type': 'application/json',
            })
        }).then((res) => res.json())
        .then((reviews) => {
            console.log(reviews);
            this.setState({
                userReviews: reviews,
                title: reviews.title,
                image_url: reviews.image
            })
        })
    }
    //CommentCreate Methods
    clickCommentReview = (review: ReviewJSON) => {
        this.setState({
            reviewToComment: review
        })
        console.log(review);
    }

    updateOn = () =>{
        this.setState({
            commentActive: true
        })
    }

    updateOff = () => {
        this.setState({
            commentActive: false
        })
    }
    //End CommentCreate Methods

    //CommendEdit Methods
    clickEditComment = (comment: CommentJSON) => {
        this.setState({
            commentToEdit: comment
        })
        console.log(comment);
    }

    updateCommentOn = () => {
        this.setState({
            commentEditActive: true
        })
    }

    updateCommentOff = () => {
        this.setState({
            commentEditActive: false
        })
    }
    //End CommentEdit Methods

    

    componentDidUpdate(prevProps: Readonly<ReviewGetProps>, prevState: Readonly<ReviewGetState>) {
        if (this.props.title !== prevProps.title){
            this.fetchReviews()
        }
    }
    
    render() { 
        return (
            <>  
                <Container>
                    <ReviewsRender 
                        fetchReviews={this.fetchReviews}
                        userReviews={this.state.userReviews}
                        updateOn={this.updateOn}
                        updateOff={this.updateOff}
                        commentActive={this.state.commentActive}
                        clickCommentReview={this.clickCommentReview}
                        reviewToComment={this.state.reviewToComment}
                        sessionToken={this.props.sessionToken}
                        title={this.state.title}
                        username={this.props.username}
                        commentEditActive={this.state.commentEditActive}
                        clickEditComment={this.clickEditComment}
                        updateCommentOn={this.updateCommentOn}
                        updateCommentOff={this.updateCommentOff}
                    />
                </Container>
                {
                    this.state.commentActive
                        ?
                            <CommentsCreate
                                fetchReviews={this.fetchReviews}
                                userReviews={this.state.userReviews}
                                updateOn={this.updateOn}
                                updateOff={this.updateOff}
                                clickCommentReview={this.clickCommentReview}
                                commentActive={this.state.commentActive}
                                reviewToComment={this.state.reviewToComment}
                                sessionToken={this.props.sessionToken}
                            />
                        :
                            null
                }
                {
                    this.state.commentEditActive
                        ?
                            <CommentsEdit
                                userComment={this.state.userComment}
                                updateCommentOn={this.updateCommentOn}
                                updateCommentOff={this.updateCommentOff}
                                clickEditComment={this.clickEditComment}
                                commentEditActive={this.state.commentEditActive}
                                commentToEdit={this.state.commentToEdit}
                                sessionToken={this.props.sessionToken}
                                fetchReviews={this.fetchReviews}
                            />
                        :
                            null    
                }
            </>  
        );
    }
}
 
export default ReviewGet;