import { BrowserRouter, Routes,Route } from "react-router-dom"
import Product from "./Pages/product"
import Pricing from "./Pages/Pricing"
import HomePage from "./Pages/HomePage"
import PageNotFound from "./Pages/PageNotFound"
function App() {
  return (
    <div>
     <BrowserRouter >
     <Routes>
     <Route path="/" element={<HomePage/>} />
      <Route path="product" element={<Product/>} />
      <Route path="pricing" element={<Pricing/>} />
      <Route path="*" element={<PageNotFound/>} />
     </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App
