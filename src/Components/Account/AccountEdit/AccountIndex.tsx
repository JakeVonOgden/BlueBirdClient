import * as React from 'react';
import APIURL from '../../../helpers/environment';
import AccountEdit from './AccountEdit';
import AccountTable from './AccountTable';

interface AccountIndexProps 
{
    sessionToken: string | null,
    unhashedPw: string | null,
    updatePw(newPw: string): void 
}
 
interface AccountIndexState 
{
    userAccount: [{username: "", email: "", password: ""}],
    updateActive: boolean,
    accountToUpdate: UserJson
    token: string | null
}

interface UserJson 
{
    username: string,
    email: string,
    password: string
}
 
class AccountIndex extends React.Component<AccountIndexProps, AccountIndexState, UserJson> {
    
    constructor(props: AccountIndexProps) {
        super(props);
        this.state = { 
            userAccount: [{
                username: "", 
                email: "", 
                password: ""
            }], 
            accountToUpdate: {
                username: "", 
                email: "", 
                password: ""
            }, 
            token: "",  
            updateActive: false, 
        };
    }

    fetchAccount = () => {
        fetch(`${APIURL}user/mine`, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            })
        }).then((res) => res.json())
        .then((accountData) => {
            console.log([accountData]);
            this.setState({
                userAccount: [accountData]
            })
        })
    }
    
    editUpdateAccount = (account: UserJson) => {
        this.setState({
            accountToUpdate: account
        });
        console.log(account);
    }

    updateOn = () => {
        this.setState({
            updateActive: true
        });
    }

    updateOff = () => {
        this.setState({
            updateActive: false
        })
    }

    componentDidMount() {
        this.setState({
            token: this.props.sessionToken
        })
    }

    componentDidUpdate(prevProps: Readonly<AccountIndexProps>) {
        if (this.props.sessionToken !== prevProps.sessionToken) {
            this.fetchAccount();
        }
    }
    
    render() { 
        return (
            <>  
                <div className="table-container">
                    <AccountTable 
                        userAccount={this.state.userAccount} 
                        editUpdateAccount={this.editUpdateAccount} 
                        updateOn={this.updateOn} 
                        updateOff={this.updateOff} 
                        sessionToken={this.props.sessionToken} 
                        fetchAccount={this.fetchAccount} 
                        unhashedPw={this.props.unhashedPw} 
                    />
                </div>
                {
                    this.state.updateActive 
                        ? 
                            <AccountEdit 
                                accountToUpdate={this.state.accountToUpdate} 
                                updateOff={this.updateOff} 
                                sessionToken={this.props.sessionToken} 
                                fetchAccount={this.fetchAccount} 
                                unhashedPw={this.props.unhashedPw} 
                                updatePw={this.props.updatePw} 
                            /> 
                        : 
                            null
                }
            </>
        );
    }
}
 
export default AccountIndex;