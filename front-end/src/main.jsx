import { createRoot } from 'react-dom/client'
import './index.css'
import './style/quilljs.css'
import App from './App.jsx'
import { StrictMode } from 'react'
import { Provider } from "react-redux";
import store from './Redux/store.js';
createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  //{/* </StrictMode> */}
);
