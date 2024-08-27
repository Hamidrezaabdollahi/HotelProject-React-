import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "../HotelsContext/BookmarksProvider";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";

const Bookmarks = () => {
  const { data, currentBookmark, deleteBookmark} = useBookmarks();
  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };
  return (
    <div>
      <h2>Bookmark list</h2>
      <div className="bookmarkList">
        {data.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem ${
                  item.id === currentBookmark?.id ? "current-bookmark" : ""
                }`}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} /> &nbsp;{" "}
                  <strong>{item.cityName}</strong> &nbsp;{" "}
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  {<HiTrash className="trash" />}
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Bookmarks;
