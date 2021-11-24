import "../styles/globals.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import bs from 'bootstrap/dist/js/bootstrap.bundle.min'
import "../styles/bootstrap.min.css";
import Head from "next/head";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
