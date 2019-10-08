import React from "react";

//Redux
import store from "./redux/reducers";
import { Provider } from "react-redux";

//Components
import LoginForm from "./components/LoginForm";

export default function App() {
  return (
    <Provider store={store}>
      <LoginForm />
    </Provider>
  );
}
