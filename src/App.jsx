import "./App.css";
import Header from "./comps/Header/Header";
import { Toaster } from "react-hot-toast";
import LocationList from "./comps/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./comps/AppLayout/AppLayout";
import Hotels from "./comps/Hotels/Hotels";
import HotelsProvider from "./comps/HotelsContext/HotelsProvider";
import SingleHotel from "./comps/SingleHotel/SingleHotel";
import BookmarksProvider from "./comps/HotelsContext/BookmarksProvider";
import BookmarkLayout from "./comps/Bookmark/BookmarkLayout";
import Bookmarks from "./comps/Bookmarks/Bookmarks";
import SingleBookmark from "./comps/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./comps/AddNewBookmark/AddNewBookmark";
import Login from "./comps/Login/Login";
import AuthProvider from "./comps/HotelsContext/AuthProvider";
import ProtectedRoute from "./comps/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BookmarksProvider>
        <HotelsProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/login" element={<Login />} />

            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route
              path="/bookmarks"
              element={
                <ProtectedRoute>
                  <BookmarkLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Bookmarks />} />
              <Route path=":id" element={<SingleBookmark />} />
              <Route path="add" element={<AddNewBookmark />} />
            </Route>
          </Routes>
        </HotelsProvider>
      </BookmarksProvider>
    </AuthProvider>
  );
}

export default App;
