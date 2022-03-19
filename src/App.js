import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { hot } from "react-hot-loader/root";
import { Posts } from "./pages/Posts";
import { Profile } from "./pages/Profile";
import { loginAsUser, registerUser, testMe } from "./api";

const App = () => {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <AuthButton />

          <ul>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/posts">
              <Posts />
            </Route>
            <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
};

const fakeAuth = {
  isLoggedIn: false,
  logIn(cb) {
    fakeAuth.isLoggedIn = true;
    setTimeout(cb, 100);
  },
  logOut(cb) {
    fakeAuth.isLoggedIn = false;
    setTimeout(cb, 100);
  },
};

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const logIn = (userObject, cb) => {
    return fakeAuth.logIn(() => {
      setUser(userObject.user.username);
      loginAsUser(userObject);
      cb();
    });
  };

  const logOut = (cb) => {
    return fakeAuth.logOut(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    logIn,
    logOut,
  };
};

export const AuthButton = () => {
  let history = useHistory();
  let auth = useAuth();

  return auth.user ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          auth.logOut(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
};

export const PrivateRoute = ({ children, ...rest }) => {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export const LoginPage = () => {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userObject = {
    user: {
      username: username,
      password: password,
    },
  };

  let { from } = location.state || { from: { pathname: "/" } };
  let login = async () => {
    await auth.logIn(userObject, () => {
      history.replace(from);
    });
  };

  let register = () => {
    registerUser(userObject);
  };

  const handleUserChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <form>
        <label>
          Username:
          <input
            type="text"
            placeholder="Enter username..."
            required
            onChange={handleUserChange}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            placeholder="Enter password..."
            required
            onChange={handlePasswordChange}
          />
        </label>
      </form>
      <button onClick={login}>Log in</button>
      <button onClick={register}>Register</button>
    </div>
  );
};

export const Login = () => {
  const [name, setName] = useState("");
  const [secret, setSecret] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${name}`);
  };

  return (
    <form>
      <label>
        Enter username:
        <input
          type="text"
          value={name}
          placeholder="Username..."
          required
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Enter password:
        <input
          type="password"
          value={secret}
          placeholder="Secret..."
          required
          onChange={(e) => setSecret(e.target.value)}
        />
      </label>
      <button type="submit" onClick={handleSubmit}>
        Log In
      </button>
    </form>
  );
};

export default hot(App);
