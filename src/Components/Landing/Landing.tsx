import * as React from 'react';
import Luffy from '../../Assets/luffy.png';
import Zoro from '../../Assets/zoro.png';
import Logo3 from '../../Assets/firefistlogo.png';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
interface LandingProps 
{
	sessionToken: string | null
}

class Landing extends React.Component<LandingProps> {
  
    constructor(props: LandingProps) {
        super(props);
        this.state = {};
    }
  
  render() { 
    return ( 
      <>
          
        <div className="text-box">
          
          <h4 style={h4Style}>
              RedHawk
          </h4>
            <p style={pStyle}>Discover , rate , and review anime</p>
            <img src={Logo3} style={logoStyle} alt="fire"/>
            
            {/*                START TERNARY                      */}
              { 
                this.props.sessionToken === "" 
                ? // LOGGED OUT -->
                  <div>
                        <Button className="landing-button" style={buttonStyle}>
                            <Link to="/account" style={linkStyle}>
                                <span> Login / Register </span>
                            </Link>
                        </Button>
                    </div>
                : // LOGGED IN -->
                    <div>
                        <Button className="landing-button" style={buttonStyle}>
                            <Link to="/anime" style={linkStyle}>
                                <span> Discover! </span>
                            </Link>
                        </Button>
                    </div>
              }
            {/*                 END TERNARY                      */}
        
        </div>
        <img src={Luffy} alt="pirate-king" style={imgStyle} />
        <img src={Zoro} alt="right-hand" style={imgStyle2} />
      </>
    );
  }
}
                
export default Landing;

/*    ****************    
      <--- STYLES --->    
      ****************   */

const logoStyle = 
{
  height: "450px",
  width: "350px",
}

const h4Style = 
{
  maxWidth: "100%",
  height: "auto",
  fontSize: "100px",
  textShadow: "3px 4px 5px #000",
  color: "crimson",
  fontWeight: 600,
  fontFamily: "Long Cang",
  marginTop: "45px"
}

const pStyle =
{
  maxWidth: "100%",
  height: "auto",
  fontSize: "18px",
  fontWeight: 300,
  color: "#addfad",
  fontFamily: "Reggae One"
}

const buttonStyle = 
{
  maxWidth: "100%",
  height: "auto",
  backgroundColor: "rgba(215,215,215,1)",
  borderRadius: "10px",
  borderColor: "rgba(0,0,0,0)",
  boxShadow: "4px 4px 3px 1px rgba(0,0,0,0.8), 9px 9px 3px 1px rgba(0,0,0,0.8)",
  fontFamily: "Reggae One",
  marginTop: "20px"
}

const linkStyle =
{
  fontSize: "35px",
  fontWeight: 600,
  fontFamily: "Reggae One",
  color: "rgba(20,20,20,1)",
  textShadow: "2px 3px rgba(57,55,54,0.4)"
}

const imgStyle =
{
  height: "850px",
  width: "450px",
  marginLeft: "6%"
}


const imgStyle2 =
{
  height: "825px",
  width: "510px",
  marginLeft: "41%"
}

