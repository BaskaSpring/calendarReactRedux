import React, {Component} from "react";
import "../resourses/css/login.css";
import {input, button, form} from "react-bootstrap";

import BootLogo from "../resourses/img/bootstrap-logo.svg";
import {connect} from "react-redux";

import { login } from "../redux/actions/auth";
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        debugger
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();
        this.setState({
            message: "",
            loading: true
        });
        const {dispatch, history} = this.props;
        dispatch(login(this.state.username, this.state.password))
            .then(() => {
                history.push("/");
                window.location.reload();
            })
            .catch(() => {
                this.setState({
                    loading: false
                });
            });
    }

    render() {
        const { isLoggedIn, message } = this.props;
        if (isLoggedIn) {
            return <Redirect to="/" />;
        }
        return (
            <div className="text-center">
                <main className="form-signin">
                    <form onSubmit={this.handleLogin}
                          ref={c => {
                              this.form = c;
                          }}>
                        <img className="mb-4" src={BootLogo} alt="" width="72" height="57"></img>
                        <h1 className="h3 mb-3 fw-normal">Авторизация</h1>
                        <input type="text"
                               className="form-control"
                               name="username"
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               placeholder="Введите логин"
                               required autoFocus>
                        </input>
                        <input type="password"
                               name="password"
                               className="form-control"
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               placeholder="Введите пароль"
                               required>
                        </input>
                        <button className="w-100 btn btn-lg btn-primary" disabled={this.state.loading}>
                            {this.state.loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Войти</span>
                        </button>
                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <p className="mt-5 mb-3 text-muted">&copy; 2017-2021</p>
                    </form>
                </main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
        isLoggedIn,
        message
    };
}

export default connect(mapStateToProps)(Login);



