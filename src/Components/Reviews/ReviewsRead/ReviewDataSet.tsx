import * as React from 'react';
import ReviewsGetAll from './ReviewsGetAll';


interface ReviewDataSetProps 
{
    sessionToken: string | null
}
 
interface ReviewDataSetState 
{
    title: string | null,
    image_url: string | null,
    username: string | null,
}
 
class ReviewDataSet extends React.Component<ReviewDataSetProps, ReviewDataSetState> {
    constructor(props: ReviewDataSetProps) {
        super(props);
        this.state = {
            title: "",
            image_url: "",
            username: ""
        };
    }

    componentDidMount(){
        this.onLoad();
        if (localStorage.getItem("title")) {
            this.setState({
                title: localStorage.getItem("title"),
                image_url: localStorage.getItem("image"),
                username: localStorage.getItem("username")
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
                <ReviewsGetAll sessionToken={this.props.sessionToken} title={this.state.title} image_url={this.state.image_url} username={this.state.username} />
            </>
        );
    }
}
 
export default ReviewDataSet;