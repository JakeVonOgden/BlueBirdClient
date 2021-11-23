import * as React from 'react';
import '../../StyleSheets/Navbar Styles/Navbar.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Landing from '../Landing/Landing'
import Anime from '../Anime/Anime'
import Account from '../Account/Account';
import UserBansIndex from '../Admin/UserBans/UserBansIndex'
import AccountIndex from '../Account/AccountEdit/AccountIndex';
import ReviewsIndex from '../Reviews/ReviewsCreate/ReviewsIndex';
import ReviewDataSet from '../Reviews/ReviewsRead/ReviewDataSet';
import PersonalReviews from '../Reviews/ReviewsEditDelete/PersonalReviews'
import { faSearch } from '@fortawesome/free-solid-svg-icons/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    Collapse, 
    Navbar, 
    NavbarToggler, 
    Nav, 
    NavItem, 
    NavLink, 
} from 'reactstrap';


interface NavBarProps 
{
    updateToken(newToken: string): void,
    updateRole(newRole: string): void,
    updatePw(newPw: string): void, 
    clearToken(): void, 
    sessionToken: string | null,
    role: string | null
    unhashedPw: string | null
    username: string | null,
    updateUsername(newUsername: string): void,
}

interface NavBarState 
{ 
    isOpen: boolean 
    search: string
    didSearch: boolean
    value: string
}
 
class NavBar extends React.Component <NavBarProps, NavBarState> {
    
    constructor(props: NavBarProps) {
        super(props);
        this.state = { 
            isOpen: false,
            search: "",
            didSearch: false,
            value: "" 
        };
        this.handleChange = this.handleChange.bind(this)
    }

    toggle = () => {
        
        if(this.state.isOpen === false) {
            this.setState({
                isOpen: true 
            });
        
        } else if (this.state.isOpen === true) {
            this.setState({
                isOpen: false
            })
        }
    }

    expand = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        const search = document.querySelector(".search");
        const input = document.querySelector(".search-input");
        search?.classList.toggle('active');
        (input as HTMLElement)?.focus();
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            search: e.target.value
        })
    }

    handleSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        this.setState({
            didSearch: true,
            value: this.state.search
        })
    }
    
    render() {
        const {clearToken, updateToken, sessionToken} = this.props; 
        
        return (  
         <>
            <Navbar expand="md" className="navbar-container" >
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <NavLink  className="brand" href='/'>
                        RedHawk
                    </NavLink>
                    
                    {   // START VIEW PROTECTION TERNARY ***
                        this.props.sessionToken !== "" 
                        ?   // LOGGED IN ->
                            <>
                                <Nav navbar>
                                   <NavItem className="white-items">
                                        <form onSubmit={this.handleSubmit}      className="search">
                                            <input type="text" className="search-input" placeholder="Search for Anime..."
                                            value={this.state.search}
                                            onChange={this.handleChange}/>
                                            <button type="button" onClick={this.expand} className="search-btn">
                                                <FontAwesomeIcon className="fas fa-search" icon={faSearch} />
                                            </button>
                                        </form> 
                                    </NavItem>
                                </Nav> 
                            </>
                        :   // LOGGED OUT ->
                            null
                        //  END VIEW PROTECTION TERNARY ***
                    }
                                            
                    {   // START ADMIN CHECK TERNARY ***
                        this.props.role === "Admin"
                        ?   // ADMIN USER ->
                            <>
                                <Nav className="ms-auto" navbar>
                                    <NavItem className="green-items">
                                        <NavLink href="/admin">
                                            Admin
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="green-items">
                                        <NavLink href="/user">
                                            Profile
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </>
                        :   // NORMAL USER ->
                            null
                        // END ADMIN CHECK TERNARY *** 
                    }
                    
                    {   // START NORMAL USER CHECK TERNARY ***
                        this.props.role !== "Admin" && this.props.sessionToken !== ""
                        ?   // NORMAL USER ->
                            <Nav className="ms-auto">
                                <NavItem className="green-items">
                                    <NavLink href="/user">
                                        Profile
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        :   // LOGGED OUT ->
                            null
                        // END NORMAL USER CHECK TERNARY ***
                    }
                                            
                    {   // START LOGIN/LOGOUT TERNARY ***
                        this.props.sessionToken !== ""
                        ?   // LOGGED OUT ->
                            <>
                                <NavLink onClick={clearToken} href="/" className="brand">
                                    Logout
                                </NavLink>
                            </>
                        :   // LOGGED IN ->
                            <>
                                <NavLink href="/account" className="login-logout">
                                    Login
                                </NavLink>
                            </>
                        // END LOGOUT/LOGIN TERNARY ***
                    }
                                            
                    
                </Collapse>
            </Navbar>
                <Switch>
                    <Route exact path='/'>
                        <Landing clearToken={clearToken} sessionToken={sessionToken} /> 
                    </Route>
                    <Route exact path='/anime'>
                        <Anime search={this.state.search} value={this.state.value} didSearch={this.state.didSearch}/>
                    </Route>
                    <Route exact path='/reviews'> 
                        <ReviewDataSet sessionToken={sessionToken} />
                    </Route>
                    <Route exact path="/myReviews">
                        <PersonalReviews sessionToken={sessionToken} />
                    </Route>
                    <Route exact path='/leaveReview'>
                        <ReviewsIndex sessionToken={sessionToken} />
                    </Route>
                    <Route exact path='/account'>
                        <Account 
                            clearToken={clearToken} 
                            sessionToken={sessionToken} 
                            updateToken={updateToken} 
                            role={this.props.role} 
                            updateRole={this.props.updateRole} 
                            unhashedPw={this.props.unhashedPw} 
                            updatePw={this.props.updatePw}
                            updateUsername={this.props.updateUsername} 
                            username={this.props.username}
                        /> 
                    </Route>
                    <Route exact path='/admin'>
                        <UserBansIndex sessionToken={sessionToken} />
                    </Route>
                    <Route exact path='/user'>
                        <AccountIndex 
                            sessionToken={sessionToken} 
                            unhashedPw={this.props.unhashedPw} 
                            updatePw={this.props.updatePw} 
                        />
                    </Route>
                </Switch>
                {this.state.didSearch === true ? <Redirect to="/anime" /> : <> </>}
            </>
        );
    }
}

export default NavBar;