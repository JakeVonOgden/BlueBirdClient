import * as React from 'react';
import APIURL from '../../../helpers/environment';
import { Redirect } from 'react-router-dom'



interface ReviewsCreateProps 
{
    title: string | null
    image_url?: string | null | undefined
    sessionToken: string | null
}
interface ReviewsCreateState 
{
    anime: string | null,
    rating: number,
    content: string,
    success: boolean,
}
 
class ReviewsCreate extends React.Component<ReviewsCreateProps, ReviewsCreateState> {
    constructor(props: ReviewsCreateProps) {
        super(props);
        this.state = {
            anime: "",
            rating: 0,
            content: "",
            success: false,
        }
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
    }

    

    handleSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        fetch(`${APIURL}review/create`, {
            method: 'POST',
            body: JSON.stringify({anime: this.props.title, rating: this.state.rating, content: this.state.content, image: this.props.image_url}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            })
        }).then((res) => res.json())
        .then((review) =>{
            console.log(review);
            this.setState({
                anime: "",
                rating: 0,
                content: "",
                success: true,
            })
        })
    }

    handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            rating: parseInt(e.currentTarget.value)
        })
    }

    handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            content: e.target.value
        })
    }
    
    render() {
        return (
            
            <>  
                <div className="post-container">
                    <div className="post-image-container">
                        <img className="post-image" src={this.props.image_url!} alt="poster" />
                    </div>
                    <div className="text-container">
                        <h1 className="post-header1">{this.props.title}</h1>
                        <br/>
                        <form action="" className="mainWrap">
                            <div className="review-header">
                                <select id="rating" className="custom-select" value={this.state.rating} onChange={this.handleRatingChange}>
                                    <option selected>Rating</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <textarea placeholder="Leave your review..." className="mainArea" value={this.state.content} onChange={this.handleContentChange}></textarea>
                            <button type="submit" onClick={this.handleSubmit} className="reviewBtn">Post Review</button>
                        </form>
                    </div>
                </div>
                {this.state.success === true ? <Redirect to="/myReviews"/> : null}
            </>
        );
    }
}
 
export default ReviewsCreate;