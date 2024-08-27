import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { toast } from "react-hot-toast";

const HotelContext = createContext();

const HotelsProvider = ({ children }) => {
    const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] = useState(false)
    const BASE_URL = "http://localhost:5000/hotels"
    const [searchParams] = useSearchParams();
    const [currentHotel, setCurrentHotel] = useState(null)
    const destination = searchParams.get("destination");
    const room = JSON.parse(searchParams.get("options"))?.room;
    const { isLoading, data } = useFetch(BASE_URL,
        `q=${destination || ""}&accommodates_gte=${room || 1}`)

    async function GetHotel(id) {
        try {
            setIsLoadingCurrentHotel(true);
            const { data } = await axios.get(`${BASE_URL}/${id}`);
            setCurrentHotel(data);
        } catch (err) {
            if (axios.isCancel()) {
                setCurrentHotel([]);
                toast.error(err?.message);
            }
        } finally {
            setIsLoadingCurrentHotel(false);
        }
    }


    return (
        <HotelContext.Provider value={{ isLoading, data, GetHotel, isLoadingCurrentHotel, currentHotel }} >
            {children}
        </HotelContext.Provider>
    );
}

export default HotelsProvider;

export function useHotels() {
    return useContext(HotelContext)
}