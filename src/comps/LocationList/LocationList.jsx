import useFetch from "../../hooks/useFetch";

const LocationList = () => {
    const { isLoading, data } = useFetch("http://localhost:5000/hotels", "")
    if (isLoading) {
        return <div>Please wait...</div>
    }
    return (
        <div className="nearbyLocation">
            <h2>LocationList</h2>
            <div className="locationList">
                {
                    data.map((item) => {
                        return <div key={item.id} className="locationItem">
                            <img src={item.medium_url} alt={item.name} />
                            <div className="locationItemDesc">
                                <p className="smartLocation">{item.smart_location}</p>
                                <p className="name">{item.name}</p>
                                <div className="price">
                                    €&nbsp; {item.price}&nbsp; <span>night</span>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default LocationList;