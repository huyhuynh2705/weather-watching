import React, { Suspense } from 'react'
import { render } from 'react-dom'
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter } from 'react-router-dom'
import '@translations'
import { I18nProvider, AuthProvider, SocketProvider } from '@contexts'
import { Loading } from '@components'
import App from './App'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const rootElement = document.getElementById('root')
render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <CookiesProvider>
        <I18nProvider>
          <SocketProvider>
            <AuthProvider>
              <Suspense fallback={<Loading />}>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </Suspense>
            </AuthProvider>
          </SocketProvider>
        </I18nProvider>
      </CookiesProvider>
    {/* </React.StrictMode> */}
  </Provider>,
  rootElement
)
