import { BrowserRouter, Routes,Route } from "react-router-dom"
import Product from "./Pages/product"
import Pricing from "./Pages/Pricing"
import HomePage from "./Pages/HomePage"
import PageNotFound from "./Pages/PageNotFound"
import AppLayout from  "./Pages/AppLayout"
import Login from "./Pages/Login"
function App() {
  return (
    <div>
     <BrowserRouter >
     <Routes>
     <Route index element={<HomePage/>} />
      <Route path="product" element={<Product/>} />
      <Route path="pricing" element={<Pricing/>} />
      <Route path="login" element={<Login/>} />
      <Route path="app" element={<AppLayout/>} >
        {/* index route will shown when no other route matches */}
        <Route index element={<p>List</p>} />
        <Route  path="cities" element={<p>List of Cities</p>}/>
        <Route  path="countries" element={<p>List of countries</p>}/>
        <Route  path="form" element={<p>Form</p>}/>
      </Route>
      <Route path="*" element={<PageNotFound/>} />
     </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App
