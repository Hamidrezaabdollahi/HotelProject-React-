import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "../../comps/HotelsContext/BookmarksProvider";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

const AddNewBookmark = () => {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeo, setIsLoadingGeo] = useState(false);
  const { createBookmark } = useBookmarks();

  useEffect(() => {
    if (!lat || !lng) return;
    async function fetchLocationData() {
      try {
        setIsLoadingGeo(true);
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode) throw new Error("Click on a valid location");
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");
        setCountryCode(data.countryCode || "");
      } catch (error) {
        toast(error.message, {
          icon: "❗️",
        });
        setCityName("");    
        setCountry("");
        setCountryCode("");
      } finally {
        setIsLoadingGeo(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };
    await createBookmark(newBookmark);
    navigate("/bookmarks");
  };

  if (isLoadingGeo) return <Loader />;
  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>New Bookmark</h2>
      <form className="form" onSubmit={submitHandler}>
        <div className="formControl">
          <label htmlFor="CityName">CityName</label>
          <input
            value={cityName}
            onChange={(e) => {
              setCityName(e.target.value);
            }}
            type="text"
            name="CityName"
            id="CityName"
          />
        </div>
        <div className="formControl">
          <label htmlFor="Country">Country</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            name="Country"
            id="Country"
          />
          {countryCode ? (
            <ReactCountryFlag svg className="flag" countryCode={countryCode} />
          ) : null}
        </div>
        <div className="buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="btn btn--back"
          >
            &larr; &nbsp; Back
          </button>
          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewBookmark;
