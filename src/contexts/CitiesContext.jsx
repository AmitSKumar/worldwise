import { createContext, useEffect, useState } from "react";
//1 declare the context
const CitiesContext = createContext()
const BASE_URL ="http://localhost:8000"
function CitiesProvider({children}){

    
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
    return <CitiesContext.Provider
    value={{
        cities,
        isLoading
    }}>
        {children}
    </CitiesContext.Provider>
}

export {CitiesProvider}