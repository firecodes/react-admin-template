import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { store, rootPersistorStore } from '@/redux/index.ts'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import '@/styles/index.less'

// mock本地数据模拟
import '../mock/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={rootPersistorStore}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
