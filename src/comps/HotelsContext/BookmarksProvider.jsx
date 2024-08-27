import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const BookmarksContext = createContext();
const BASE_URL = "http://localhost:5000";

const INITIAL_STATE = {
  isLoading: false,
  bookmarks: [],
  currentBookmark: null,
  error: null,
};
function bookmarksReducer(state, action) {
  switch (action.type) {
    case "isLoading":
      return { ...state, isLoading: true };
    case "bookmarks/loaded":
      return { ...state, bookmarks: action.payload, isLoading: false };
    case "bookmark/loaded":
      return { ...state, currentBookmark: action.payload, isLoading: false };
    case "bookmarks/created":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookmark: action.payload,
      };
    case "bookmarks/deleted":
      return {
        ...state,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
        isLoading: false,
        currentBookmark: null,
      };
    case "rejectedBookmark":
      return { ...state, currentBookmark: null, isLoading: false };
    case "rejectedBookmarks":
      return { ...state, bookmarks: [], isLoading: false };
    default:
      throw new Error("unknown action");
  }
}

const BookmarksProvider = ({ children }) => {
  // const [currentBookmark, setCurrentBookmark] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [bookmarks, setBookmarks] = useState([]);

  const [{ isLoading, currentBookmark, bookmarks }, dispatch] = useReducer(
    bookmarksReducer,
    INITIAL_STATE
  );

  useEffect(() => {
    async function fetchBookmarkList() {
      try {
        dispatch({ type: "isLoading" });
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (err) {
        if (axios.isCancel()) {
          toast.error(err?.message);
          dispatch({ type: "rejectedBookmarks" });
        }
      }
    }
    fetchBookmarkList();
  }, []);

  async function getBookmark(id) {
    if(Number(id) === currentBookmark?.id) return;
    try {
      dispatch({ type: "isLoading" });
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (err) {
      if (axios.isCancel()) {
        dispatch({ type: "rejectedBookmark" });
        toast.error(err?.message);
      }
    }
  }
  async function deleteBookmark(id) {
    try {
      dispatch({ type: "isLoading" });
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmarks/deleted", payload: id });
    } catch (err) {
      if (axios.isCancel()) {
        dispatch({ type: "rejectedBookmarks" });
        toast.error(err?.message);
      }
    }
  }
  async function createBookmark(newBookmark) {
    try {
      dispatch({ type: "isLoading" });
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      dispatch({ type: "bookmarks/created", payload: data });
    } catch (err) {
      if (axios.isCancel()) {
        dispatch({ type: "rejectedBookmark" });
        toast.error(err?.message);
      }
    }
  }

  return (
    <BookmarksContext.Provider
      value={{
        data: bookmarks,
        isLoading,
        getBookmark,
        createBookmark,
        deleteBookmark,
        currentBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};

export default BookmarksProvider;

export function useBookmarks() {
  return useContext(BookmarksContext);
}
