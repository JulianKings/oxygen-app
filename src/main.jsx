import React from 'react';
import ReactDOM from 'react-dom/client';
import ContentComponent from './content';
import {Provider} from "react-redux";
import store from './scripts/redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ContentComponent />
    </Provider>
  </React.StrictMode>,
)
