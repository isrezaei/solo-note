import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import BuildTasks from "./pages/buildTasks";
import TaskDetails from "./pages/taskDetails";
import {RecoilRoot} from "recoil";
import EditTasks from "./pages/editTasks";
import NoteLayout from "./pages/NoteLayout";





const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>
    },
    {
        path: '/buildTasks',
        element: <BuildTasks/>
    },
    {
        path : '/detailsTasks/:id',
        element : <NoteLayout/>,
        children : [
            {
                element : <TaskDetails/>,
                index : true
            },
            {
                path : 'EditTask',
                element : <EditTasks/>
            }
        ]
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
