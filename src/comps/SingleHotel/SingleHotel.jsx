import { useParams } from "react-router-dom";
import Loader from './../Loader/Loader';
import { useHotels } from "../HotelsContext/HotelsProvider";
import { useEffect } from "react";

const SingleHotel = () => {
    const { id } = useParams()
    const { GetHotel, isLoadingCurrentHotel, currentHotel: data } = useHotels()
    useEffect(() => {
        GetHotel(id)
    }, [id])

    if (isLoadingCurrentHotel || !data) return <Loader />


    return (<div className="room">
        <div className="roomDetail">
            <img src={data.xl_picture_url} alt={data.name} />
            <h2>{data.name}</h2>
            <div>
                {data.number_of_reviews} reviews &bull;
                {data.smart_location}
            </div>
        </div>
    </div>)
}

export default SingleHotel;