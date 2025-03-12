import { useState, useEffect } from "react";
import { menuUrl } from "./Constants";

const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch(menuUrl + resId);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const json = await response.json();
                console.log("Fetched Data:", json);
                setResInfo(json.data);
            } catch (error) {
                console.error("Error fetching the menu:", error);
            }
        };

        fetchMenu();
    }, [resId]); 

    

    return resInfo; 
};

export default useRestaurantMenu;
