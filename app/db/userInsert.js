import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import api from './api';


class userInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            phone: '',
            email: '',
            password: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputEmail = async event => {
        const email = event.target.validity.valid
            ? event.target.value
            : this.state.email

        this.setState({ email })
    }

    handleChangeInputPassword = async event => {
        const password = event.target.value
        this.setState({ password })
    }
    
    handleIncludeUser = async () => {
        //const { name, email, password } = this.state;
        //const arrayTime = time.split('/')
        const payload = this.state;
        //const payload = this.state;
        await api.insertUser(payload).then(res => {
            //window.alert(`Movie inserted successfully`)
            this.setState({
                name: '',
                email: '',
                password: '',
            });
        })
    }
}


export default userInsert;