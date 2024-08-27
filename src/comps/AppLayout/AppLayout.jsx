import { Outlet } from "react-router-dom"
import Map from "../Map/Map";
import { useHotels } from "../HotelsContext/HotelsProvider";

const AppLayout = () => {

    const { data: hotels } = useHotels()
    return (
        <div className="appLayout">
            <div className="sidebar"><Outlet /></div>
            <Map markerLocations={hotels} />
        </div>
    );
}

export default AppLayout;