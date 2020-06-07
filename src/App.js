import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import * as sessionOperations from './redux/operations';
import * as sessionSelectors from './redux/selectors';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    this.props.refreshCurrentUser();
    // console.log(this.props.nickname);
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/dashboard" component={DashboardPage} />
          <Redirect to="/" />
        </Switch>
        {/* <Header />
      <Card/>
      <CardChallenge/>
      <CompletedChallenge/>
      <CompletedModal/> */}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  nickname: sessionSelectors.getUser(state),
});

const mapDispatchToProps = {
  refreshCurrentUser: sessionOperations.postUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// function App() {
//   return (
//     <div>
//       <Switch>
//         <Route exact path="/" component={LoginPage} />
//         <Route exact path="/dashboard" component={DashboardPage} />
//         <Redirect to="/" />
//       </Switch>
//     </div>
//   );
// }

// export default App;
