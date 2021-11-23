import * as React from 'react';
import APIURL from '../../../helpers/environment';
import '../../../StyleSheets/AdminStyles/AdminTable.css'
import {Table} from 'reactstrap'
interface UserBansProps 
{
    list: []
    sessionToken: string | null
    fetchAccounts: any
    banAccount: any
    success: boolean
}
 interface UserBansState 
{
    success: boolean
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
 
class UserBans extends React.Component<UserBansProps, UserBansState, UserJson> {
    
    constructor(props: UserBansProps) {
        super(props);
        this.state = {
            success: false 
        };
        this.deleteAccount = this.deleteAccount.bind(this)
    }

    deleteAccount = (account: UserJson) => {
        fetch(`${APIURL}user/delete/${account.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            })
        })
        .then(() => this.props.fetchAccounts())
    }

    componentDidMount(){
        this.setState({
            success: true
        })
    }

    accountMapper = () => {
        return this.props.list.map((account: UserJson, index) => {
            return (
                <tr className="masterlist-data" key={index}>
                    <td>{account.id}</td>
                    <td>{account.username}</td>
                    <td>{account.email}</td>
                    <td>{account.role}</td>
                    <td>{account.createdAt}</td>
                    <td>{account.updatedAt}</td>
                    <td>
                        <button className="deleteBtn" onClick={() => {this.deleteAccount(account)}}>Ban</button>
                    </td>
                </tr>
            )
        })
    }
    
    render() { 
        return (  
            <div>
                <div>
                    <h3 className="masterlist-header">Master List</h3>
                    <hr />
                    <Table>
                        <thead>
                            <tr className="table-headers">
                                <th>Id</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Created Time-Stamp</th>
                                <th>Updated Time-Stamp</th>
                                <th>Ban User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.accountMapper()}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}
 
export default UserBans;