import { Link } from "react-router-dom"

import Loader from './../Loader/Loader';
import { useHotels } from "../HotelsContext/HotelsProvider";

const Hotels = () => {
    const {isLoading, data, currentHotel} =  useHotels()

    if (isLoading) <Loader />
    return (
        <div className="searchList">
            <h2>Search Results ({data.length})</h2>
            {
                data.map((item) => {
                    return <Link key={item.id} to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
                        <div className={`searchItem ${currentHotel?.id === item.id? "current-hotel": ""}`}>
                            <img src={item.thumbnail_url} alt={item.name} />
                            <div className="searchItemDesc">
                                <p className="smartLocation">{item.smart_location}</p>
                                <p className="name">{item.name}</p>
                                <div className="price">
                                    €&nbsp; {item.price}&nbsp; <span>night</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                })
            }
        </div>
    );
}

export default Hotels;