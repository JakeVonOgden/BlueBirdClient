import * as React from 'react';
import '../../StyleSheets/LandingStyles/Landing.css';
import { Link } from 'react-router-dom';
interface LandingProps 
{
	sessionToken: string | null
  clearToken(): void
}

class Landing extends React.Component<LandingProps> {
  
   render() { 
    return ( 
      <>
        <div className="landing-container">
         <div className="land-text-box">
          <h1 className="land-h1">RedHawk</h1>
          <h2 className="land-h2">Welcome</h2>
          <p className="land-para"> Here you will have access to all your favorite anime shows. Browse our database to find reviews on any show you've been curious about. Don't forget to leave your own reviews as well! </p>
          { 
            this.props.sessionToken !== "" 
              ? 
              <div className="box-1">
                <div onClick={this.props.clearToken}  className="landing-btn">
                  <span className="landing-link">
                    LOGOUT
                  </span>
                </div>
              </div>
              :
              <Link className="landing-link" to="/account" >
                <div className="box-1"> 
                  <div className="landing-btn">
                    <span className="landing-link">  
                      LOGIN
                    </span>
                  </div>
                </div> 
               </Link>
                
          }
         </div>
        </div>
      </>
    );
  }
}
                
export default Landing;