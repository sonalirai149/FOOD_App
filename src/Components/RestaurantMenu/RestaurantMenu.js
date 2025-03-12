import React,{useState} from 'react';
import Shimer from '../Shimer/shimer';
import './RestaurantMenu.css'; 
import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../../utils/useRestaurantMenu';
 import RestaurantCategory from '../RestaurantCategory/ RestaurantCategory';





const RestaurantMenu = () => {
    const { resId } = useParams();
    const resInfo = useRestaurantMenu(resId);
    const [isOpenInd, setIsOpenInd] = useState(null);

    console.log("Full Response:", resInfo); // Debugging

    if (!resInfo) {
        return <Shimer />;
    }

    // Extract basic restaurant details
    const { name, cuisines, costForTwoMessage } = resInfo?.cards?.[2]?.card?.card?.info || {};

    // Filtering Item Categories properly
    const categories = resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
        (c) => c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];

    console.log("Filtered Categories:", categories); // Debugging

    return (
        <div className="restaurant-menu-container">
            <div className="restaurant-info">
                <h2 className="restaurant-name">{name}</h2>
                <p className="restaurant-cost">{costForTwoMessage} - {cuisines?.join(", ")}</p>
            </div>

            {/* ✅ Categories Accordion */}
            <div className="categories-container">
                {categories.map((category,index) => (
                    <RestaurantCategory key={category.card.card.categoryId} data={category.card.card} isOpen={index===isOpenInd? true : false}
                    setIsOpenInd={() => setIsOpenInd(index===isOpenInd ? null:index)}/>
                ))}
            </div>
        </div>
    );
};

export default RestaurantMenu;
