import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router';
import Home from './Pages/Home'
import AnimeInfo from './assets/component/AnimeInfo';
import Layout from './Pages/Layout';
import Streaming from './assets/component/Streaming';

function App() {

  const router = createBrowserRouter([

    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path:'details/:id',
         element:<AnimeInfo />
          
        },
        {
           path: "/anime/:id/episode/:episodeNumber",
            element: <Streaming />
        }
      ]
    },
   


  ])

  return (
    <>
        <RouterProvider router={router} />
        
    </>
  )
}

export default App
