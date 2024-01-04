import { useDispatch, useSelector } from "react-redux";
// import { HeroSection } from "../../Components/HeroSection/HeroSection.jsx";
import { Layout } from "../../Components/Layout/Layout.jsx";
import { Testimonials } from "../../Components/Testimonials/Testimonials.jsx";
import { ProductCard } from "../../Components/ProductCard/ProductCard.jsx";
import { Track } from "../../Components/Track/Track.jsx";
import { HeroSection } from "../../Components/HeroSection/HeroSection.jsx";
import { Link } from "react-router-dom";

export const Home = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart);

  return (
    <Layout>
      <HeroSection />
      <ProductCard />
      <div className=" flex justify-center -mt-10 mb-10">
        <Link to="/allproducts">
          <button className="bg-gray-300 px-5 py-2 rounded-xl">See more</button>
        </Link>
      </div>
      <Track />
      <Testimonials />
    </Layout>
  );
};
