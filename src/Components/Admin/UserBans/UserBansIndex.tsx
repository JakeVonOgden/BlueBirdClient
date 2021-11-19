import * as React from 'react';
import '../../../StyleSheets/AdminStyles/AdminContainers.css'
import UserBans from './UserBans';
interface UserBansIndexProps
{
    sessionToken: string | null
}
 interface UserBansIndexState 
 {
    list: []
    accountToBan: UserJson
    success: boolean
    hideButton: boolean
}
interface UserJson 
{
    id: number,
    username: string,
    email: string,
    password: string,
    role: string,
    createdAt: string,
    updatedAt: string
}

class UserBansIndex extends React.Component<UserBansIndexProps, UserBansIndexState, UserJson> {
    
    constructor(props: UserBansIndexProps) {
        super(props);
        this.state = { 
            accountToBan: {
                id: 0, 
                username: "", 
                email: "",
                password: "", 
                role: "", 
                createdAt: "", 
                updatedAt: ""
            }, 
                list: [], 
                success: false, 
                hideButton: false
        };
    }

    fetchAccounts = () => {
        fetch("http://localhost:4000/user/MasterList", {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            })
        }).then((res) => res.json())
        .then((masterList) => {
            console.log(masterList);
            this.setState({
                list: masterList,
                success: true,
                hideButton: true
            })
        })
    }

    banAccount = (account: UserJson) => {
        this.setState({
            accountToBan: account
        })
        console.log(account);
    }

    render() { 
        return (
            <>  
                {   
                    this.state.hideButton === false
                        ?   // Button Visible
                            <div className="btn-container">
                                <button className="masterListBtn" onClick={this.fetchAccounts}> 
                                    Master List 
                                </button>
                            </div>
                        :   // Button Clicked
                            null
                }
                
                {   
                    this.state.success === true
                        ?   //Button Clicked
                            <div className="table-container">
                                <UserBans 
                                    list={this.state.list} 
                                    sessionToken={this.props.sessionToken} 
                                    fetchAccounts={this.fetchAccounts} 
                                    banAccount= {this.banAccount} 
                                    success={this.state.success} 
                                />
                            </div>
                        :   //Button Visible
                            null
                }
            </>
        );
    }
}
 
export default UserBansIndex;