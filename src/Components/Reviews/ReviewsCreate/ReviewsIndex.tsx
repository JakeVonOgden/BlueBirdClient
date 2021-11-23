import * as React from 'react';
import '../../../StyleSheets/ReviewStyles/ReviewCreate.css'
import ReviewsCreate from './ReviewsCreate';

interface ReviewsIndexProps 
{
    sessionToken: string | null,
}
 
interface ReviewsIndexState 
{
    title: string | null,
    image_url?: string | null,
    content: string,
    rating: number,
    userId: number
}

class ReviewsIndex extends React.Component<ReviewsIndexProps, ReviewsIndexState> {
    constructor(props: ReviewsIndexProps) {
        super(props);
        this.state = {
            title: "",
            image_url: "",
            content: "",
            rating: 0,
            userId: 0
        };
    }

    componentDidMount(){
        this.onLoad();
        if (localStorage.getItem("title")) {
            this.setState({
                title: localStorage.getItem("title"),
                image_url: localStorage.getItem("image")
            })
        }
    }

    onLoad = () => {
        if( window.localStorage )
        {
          if( !localStorage.getItem('firstLoad') )
          {
            localStorage['firstLoad'] = true;
            window.location.reload();
          }  
          else
            localStorage.removeItem('firstLoad');
    
        }
    }

    
    
    clearAnime = () => {
        localStorage.removeItem("image")
        localStorage.removeItem("title")
        this.setState({
            title: "",
            image_url: "",
        })
    }

    render() { 
        return (
        <>
            <ReviewsCreate sessionToken={this.props.sessionToken} title={this.state.title} image_url={this.state.image_url}/>
        </>
        );
    }
}
 
export default ReviewsIndex;