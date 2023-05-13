import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import Home from "./pages/Home/Home"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { store } from "./app/store"
import "./index.scss"
import Paths from "./paths"

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Home />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
