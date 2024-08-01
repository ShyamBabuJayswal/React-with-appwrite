import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthLayout, Login } from './components/index.js';
import Home from './pages/Home.jsx';



const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[{
        path:'/',
        element: <Home />},
        {
          path:'/login',
          element:(
        <AuthLayout authentication ={false} >
            <Login />
          </AuthLayout>
          )
        }
    ]

    
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Provider store={store}>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
    </Provider>
  </React.StrictMode>,
)
