import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import BuildTasks from "./pages/buildTasks";
import {RecoilRoot} from "recoil";





const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>
    },
    {
        path: '/buildTasks',
        element: <BuildTasks/>
    }
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
      <RecoilRoot>
          <ChakraProvider>
              <RouterProvider router={router} />
          </ChakraProvider>
      </RecoilRoot>
  </>
)
