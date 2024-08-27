import { useRef, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import {
  HiCalendar,
  HiLogin,
  HiLogout,
  HiMinus,
  HiPlus,
  HiSearch,
} from "react-icons/hi";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
  NavLink,
  Link,
} from "react-router-dom";
import { useAuth } from "../HotelsContext/AuthProvider";

const Header = () => {
  const [searchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [openOption, setOpenOption] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [openDate, setOpenDate] = useState(false);

  const handleOption = (type, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [type]: operation === "inc" ? options[type] + 1 : options[type] - 1,
      };
    });
  };
  const navigate = useNavigate();

  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      options: JSON.stringify(options),
      destination,
    });
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  return (
    <div className="header">
      <div className="headerSearch">
        <div className="bookmark">
          <Link to="/bookmarks">Bookmarks</Link>
        </div>
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            type="text"
            placeholder="Where to go?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div
            className="dateDropDown"
            onClick={() => setOpenDate((is) => !is)}
          >
            {`${format(date.startDate, "yyyy/MM/dd")} - ${format(
              date.endDate,
              "yyyy/MM/dd"
            )}`}
          </div>
          {openDate && (
            <DateRange
              ranges={[date]}
              className="date"
              onChange={(item) => setDate(item.selection)}
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div
            id="optionDropDown"
            onClick={() => setOpenOption((input) => !input)}
          >
            ({options.children}) children &bull; ({options.adult}) adult &bull;
            ({options.room}) room
          </div>
          {openOption && (
            <GuestOptionList
              options={options}
              handleOption={handleOption}
              setOpenOption={setOpenOption}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div className="headerSearchBtn">
            <HiSearch className="headerIcon" onClick={handleSearch}></HiSearch>
          </div>
        </div>
        <div>
          <button className="login">
            <User />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

function GuestOptionList({ options, handleOption, setOpenOption }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, () => setOpenOption(false), "optionDropDown");
  return (
    <div className="guestOptions" ref={optionsRef}>
      <OptionItem
        handleOption={handleOption}
        type="adult"
        minLimit={1}
        options={options}
      />
      <OptionItem
        handleOption={handleOption}
        type="children"
        minLimit={0}
        options={options}
      />
      <OptionItem
        handleOption={handleOption}
        type="room"
        minLimit={1}
        options={options}
      />
    </div>
  );
}

function OptionItem({ options, type, minLimit, handleOption }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          onClick={() => handleOption(type, "dec")}
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          onClick={() => handleOption(type, "inc")}
          className="optionCounterBtn"
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}

function User() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate("/");
  }
  return isAuthenticated ? (
    <div onClick={handleLogout}>
      {user.name}{" "}
      <span>
        <HiLogout />
      </span>{" "}
    </div>
  ) : (
    <NavLink to={"/login"}>
      Login{" "}
      <span>
        <HiLogin />
      </span>{" "}
    </NavLink>
  );
}