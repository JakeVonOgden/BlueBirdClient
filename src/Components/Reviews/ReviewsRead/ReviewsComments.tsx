import * as React from 'react';
import APIURL from '../../../helpers/environment';

interface ReviewsCommentsProps 
{
    reviewId: number 
}
 
interface ReviewsCommentsState 
{
    reviewComments: [CommentJSON]
    mounted: boolean
}

interface CommentJSON
{
    id: number,
    content: string,
    createdAt: string,
    updatedAt: string,
    userId: number
    reviewId: number
}
 
class ReviewsComments extends React.Component<ReviewsCommentsProps, ReviewsCommentsState, CommentJSON> {
    constructor(props: ReviewsCommentsProps) {
        super(props);
        this.state = {   
            reviewComments: [{
                id: 0,
                content: "",
                createdAt: "",
                updatedAt: "",
                userId: 0,
                reviewId: 0,
            }],
            mounted: false
        };
    }

    fetchComments = (id: number) => {
        fetch(`${APIURL}comment/${id}`, {
            method: "GET",
            headers: new Headers ({
                'Content-Type': 'application/json',
            })
        }).then((res) => res.json())
        .then((comments) => {
            console.log(comments);
            this.setState({
                reviewComments: comments
            })
        })
    }

    componentDidMount() {
       this.fetchComments(this.props.reviewId)
    }
    
   
    
    render() { 
        return (  
            <>
              
            </>
        );
    }
}
 
export default ReviewsComments;