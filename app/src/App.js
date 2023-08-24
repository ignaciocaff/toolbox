import Home from "./pages/Home/Home";
import logo from "./resources/logo.png";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="text-center">
        <header className="h-24 text-white  bg-black opacity-75 text-xl md:text-2xl lg:text-3xl">
          <div className="flex justify-around">
            <div className="mt-4">
              <img src={logo} alt="logo" />
            </div>
            <div className="mt-2">
              <p className="mt-4">CHALLENGE</p>
            </div>
          </div>
        </header>
        <Home />
      </div>
    </Provider>
  );
}

export default App;
