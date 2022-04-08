import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import {li , Navbar  } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import grantt from "./components/Diagram/Gantt";
import calendar2 from "./components/CalendarTree/calendar2";
import {connect} from "react-redux";
import {logout} from "./redux/actions/auth";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {

    const { currentUser, showAdminBoard } = this.state;

    return (
        <div>
          <Navbar bg="light" expand="lg">
            <Link to={"/"} className="navbar-brand">
              Домой
            </Link>
            <div className="navbar-nav mr-auto">
              {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/calendar"} className="nav-link">
                      Календарь
                    </Link>
                  </li>
              )}
            </div>
            <div className="navbar-nav mr-auto">
              {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/diagram"} className="nav-link">
                      Диаграмма
                    </Link>
                  </li>
              )}
            </div>

            {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      Выйти
                    </a>
                  </li>
                </div>
            ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Войти
                    </Link>
                  </li>
                </div>
            )}
          </Navbar>

          <div className = "Conteineros">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/secretregister" component={Register} />
              <Route path="/calendar" component={calendar2} />
              <Route path="/diagram" component={grantt} />

            </Switch>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user
  };
}

export default connect(mapStateToProps)(App);
