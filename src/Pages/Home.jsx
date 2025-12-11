import AboutUs from "../Components/HomeComponents/AboutUs/AboutUs";
import Newsletter from "../Components/HomeComponents/Newsletter/Newsletter";
import PopularProduct from "../Components/HomeComponents/PopularProduct/PopularProduct";

import "../Styles/Home.sass"

export default function Home() {
    return (
        <div className="home">
            <PopularProduct />
            <AboutUs />
            <Newsletter />    
        </div>
    )
}