import { BrowserRouter, Routes,Route, Navigate } from "react-router-dom"
import Product from "./Pages/product"
import Pricing from "./Pages/Pricing"
import HomePage from "./Pages/HomePage"
import PageNotFound from "./Pages/PageNotFound"
import AppLayout from  "./Pages/AppLayout"
import Login from "./Pages/Login"
import CityList from "./components/CityList"
import { useEffect, useState } from "react"
import CountryList from "./components/CountryList"
import City from './components/City'
import Form from './components/Form'
const BASE_URL ="http://localhost:8000"
function App() {
  const [cities,setCities]=useState([])
  const [isLoading ,setIsLoading] = useState(0)

  useEffect(function(){
    async function fetchCities(){
     try  {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities`)
      const data = await res.json();
      setCities(data)
    } 
    catch {
      alert('e')
    }finally{
      setIsLoading(false)
    }
  }
  fetchCities()
  },[])
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
        <Route index element={<Navigate replace to="cities"/>} />
        <Route  path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}/>
        <Route  path="cities/:id" element={<City />}/>
        <Route  path="countries" element={<CountryList cities={cities}  />}/>
        <Route  path="form" element={<Form />}/>
      </Route>
      <Route path="*" element={<PageNotFound/>} />
     </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App
