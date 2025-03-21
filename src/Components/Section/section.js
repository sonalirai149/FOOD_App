import React, { useContext, useEffect, useState } from "react";
import "./Section.css";
import Rescard ,{RescardwithLabel} from "../Rescard/Rescard";
import Shimer from "../Shimer/shimer.js";
import { Link } from "react-router-dom";
import useOnlinestatus from "../../utils/useOnlinestatus.js";
import UserContext from "../../utils//UserContext.js";

const Section = () => {
  const [resList, setResList] = useState([]);
  const [searchText, setSearchText] = useState("");
  //const [username, setUsername] = useState("");
  const [filterResList, setFilterResList] = useState([]);
  const [loading, setLoading] = useState(true);

  const withLabel= RescardwithLabel(Rescard);
  const {loggedInUser,setUserName}=useContext(UserContext);
  //console.log("user","sinfjm");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9084151&lng=77.6956443&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const json = await response.json();
      const restaurantData = json?.data?.cards
        .flatMap((card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants || [])
        .slice(0, 20);

      setResList(restaurantData);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setFilterResList([...resList]);
  }, [resList]);

  const onlineStatus = useOnlinestatus();
  if (!onlineStatus) {
    return (
      <div className="error-container">
        <h1>Oops! Something went wrong!!!</h1>
        <h2>Check Your Internet Connection!!!</h2>
      </div>
    );
  }

  return (
    <div className="body">
      <div className="container">
        <div className="search-filter-container">
          <div className="search-bar">
            <input
              type="text"
              value={searchText}
              className="search-box"
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search restaurant"
            />
            
            <button
              className="search-btn"
              onClick={() => {
                const trimmedSearchText = searchText.trim();
                if (!trimmedSearchText) {
                  setFilterResList([...resList]);
                  return;
                }
                const filteredData = resList.filter((res) =>
                  res.info?.name.toLowerCase().includes(trimmedSearchText.toLowerCase())
                );
                setFilterResList(filteredData);
              }}
            >
              Search
            </button>
            <div className="flex gap-2">
  {/* <input type="text" className="p-2 border rounded-lg focus:ring w-9 h-12/9" placeholder="Search restaurant" />
  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Search</button> */}
</div>
            {/* <input
              type="text"
              value={loggedInUser.name}
              className="extra-input"
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter username"
            /> */}
          </div>

          <div className="filter-buttons">
            <button
              className="filter-btn"
              onClick={() => {
                const filteredData = resList.filter((res) => res.info?.avgRating > 4.4);
                setFilterResList(filteredData);
              }}
            >
              Top Rated Restaurant
            </button>
            {filterResList.length < resList.length && (
              <button className="reset-btn" onClick={() => setFilterResList([...resList])}>
                Reset Filters
              </button>
            )}
          </div>
        </div>

        <div className="restaurant-list">
          {filterResList.length > 0 ? (
            filterResList.map((item) => (
              <Link to={`/restaurants/${item.info.id}`} key={item.info.id}>
               {item.info.Promoted ? (<withLabel resdata={item}></withLabel>):(<Rescard resdata={item} />)}
              </Link>
            ))
          ) : (
            <div className="no-results">No restaurants found.</div>
          )}
        </div>

        {loading && <Shimer />}
      </div>
    </div>
  );
};

export default Section;
