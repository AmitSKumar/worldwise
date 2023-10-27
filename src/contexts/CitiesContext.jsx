import { createContext, useContext, useEffect, useReducer } from "react";
//1 declare the context
const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";
const intialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("no action matched");
  }
}
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispach] = useReducer(
    reducer,
    intialState
  );
  // const [cities,setCities]=useState([])
  // const [isLoading ,setIsLoading] = useState(0)
  // const [currentCity ,setCurrentCity] = useState({})
  useEffect(function () {
    async function fetchCities() {
      try {
        dispach({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispach({ type: "cities/loaded", payload: data });
      } catch {
        alert("e");
        dispach({
          type: "rejected",
          payload: "thers was error loading data...",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    try {
      dispach({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispach({ type: "city/loaded", payload: data });
    } catch {
      alert("e");
      dispach({
        type: "rejected",
        payload: "thers was error getting city data...",
      });
    }
  }
  async function createCity(newCity) {
    try {
      dispach({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispach({ type: "city/created", payload: data });
    } catch {
      alert("e");
      dispach({
        type: "rejected",
        payload: "thers was error getting cities data...",
      });
    }
  }
  async function deleteCity(id) {
    try {
      dispach({ type: "loading" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispach({ type: "city/deleted", payload: id });
    } catch {
      alert("e");
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    return Error("citiescontext was used outside cities provider");
  return context;
}
export { CitiesProvider, useCities };
