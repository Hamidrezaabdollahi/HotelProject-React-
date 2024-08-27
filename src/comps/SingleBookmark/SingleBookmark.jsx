import { useNavigate, useParams } from "react-router-dom";
import Loader from './../Loader/Loader';
import { useEffect } from "react";
import { useBookmarks } from "../HotelsContext/BookmarksProvider";
import ReactCountryFlag from "react-country-flag";

const SingleBookmark = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { getBookmark, isLoading, currentBookmark: data } = useBookmarks()
    useEffect(() => {
        getBookmark(id)
    }, [id])

    if (isLoading || !data) return <Loader />


    return (<div>
        <button onClick={()=> navigate(-1)} className="btn btn--back">&larr; Back</button>
        <div className="bookmarkItem">
            <ReactCountryFlag svg countryCode={data.countryCode} /> &nbsp; <strong>{data.cityName}</strong> &nbsp; <span>{data.country}</span>
        </div>
    </div>)
}

export default SingleBookmark;