import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {Container} from 'reactstrap'
import NavBar from './Components/Navbar/NavBar';
interface AppProps 
{

}
interface AppState 
{ 
	sessionToken: string | null,
  	role: string | null,
  	unhashedPw: null | string,
	username: string | null
}
 
class App extends React.Component<AppProps, AppState> {
	
	constructor(props: AppProps) {
    	super(props);
    	this.state = { 
      		sessionToken : "",
      		role: "", 
      		unhashedPw: "",
			username: "",
    	};
  	}
  
  	componentDidMount() {
    	if (localStorage.getItem("token")) {
      		this.setState({
        		sessionToken: localStorage.getItem("token"),
        		role: localStorage.getItem("role"),
        		unhashedPw: localStorage.getItem("unhashedPw"),
				username: localStorage.getItem("username")
      		});
    	}
  	}

  	updateToken = (newToken: string) => {
    	localStorage.setItem("token", newToken);
		this.setState({
			sessionToken: newToken
		});
		console.log(this.state.sessionToken);
  	}

  	updateRole = (newRole: string) => {
		localStorage.setItem("role", newRole);
		this.setState({
			role: newRole
		});
		console.log(this.state.role);
  	}
  
  	updatePw = (newPw: string) => {
		localStorage.setItem("unhashedPw", newPw);
		this.setState({
			unhashedPw: newPw
		})
  	}
	
    updateUsername = (newUsername: string) => {
    	localStorage.setItem("username", newUsername);
		this.setState({
			username: newUsername
		});
		console.log(this.state.username);
  	}

	  
  	clearToken = () => {
		localStorage.clear();
		this.setState({
			sessionToken: "",
			role: "",
			unhashedPw: "",
			username: ""
		});
  	}

	render() { 
    	return (
      		<div className="App">
       			<Container fluid className="AppContainer">
          			<Router>
            			<NavBar 
							updateRole={this.updateRole} 
							role={this.state.role} 
							updateToken={this.updateToken} 
							clearToken={this.clearToken} 
							sessionToken={this.state.sessionToken} 
							updatePw={this.updatePw} 
							unhashedPw={this.state.unhashedPw} 
							updateUsername={this.updateUsername}
							username={this.state.username}
						/>
          			</Router>
        		</Container>
      		</div>
    	);
  	}
}
 
export default App;