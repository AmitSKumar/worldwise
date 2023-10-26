import { createContext, useContext, useEffect, useState } from "react";
//1 declare the context
const CitiesContext = createContext()
const BASE_URL ="http://localhost:8000"
function CitiesProvider({children}){

    
    const [cities,setCities]=useState([])
    const [isLoading ,setIsLoading] = useState(0)
    const [currentCity ,setCurrentCity] = useState({})
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

    async function getCity(id){
        try  {
         setIsLoading(true)
         const res = await fetch(`${BASE_URL}/cities/${id}`)
         const data = await res.json();
         setCurrentCity(data)
       } 
       catch {
         alert('e')
       }finally{
         setIsLoading(false)
       }
    }
    async function createCity(newCity){
      try  {
       setIsLoading(true)
       const res = await fetch(`${BASE_URL}/cities`,{
        method:'POST',
        body:JSON.stringify(newCity),
        headers:{
          "Content-Type":"application/json"
        }

       })
       const data = await res.json();
       setCities((cities)=> [...cities,data])
     } 
     catch {
       alert('e')
     }finally{
       setIsLoading(false)
     }
  }
    return <CitiesContext.Provider
    value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity
    }}>
        {children}
    </CitiesContext.Provider>
}
function useCities(){
  const context =useContext(CitiesContext)
  if(context===undefined) return Error("citiescontext was used outside cities provider")
  return context;
}
export {CitiesProvider,useCities,}