import React, { Component } from 'react'
import AuthContext from '../shared/auth/auth-context'

export default class LmsPage extends Component {
    render() {
        return (
            <div>
                hello
            </div>
        )
    }
}

LmsPage.contextType=AuthContext;
