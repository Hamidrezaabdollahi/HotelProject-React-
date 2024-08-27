import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookmarks } from "../HotelsContext/BookmarksProvider";

const BookmarkLayout = () => {
    const {data} =useBookmarks()
    return (
        <div className="appLayout">
            <div className="sidebar">
                <Outlet />
            </div>
            <Map markerLocations={data} />
        </div>
    );
}

export default BookmarkLayout;