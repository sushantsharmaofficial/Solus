import React, { useContext } from "react";
import image1 from "../../assests/image1.png";
import Image2 from "../../assests/Image2.png";
import Image3 from "../../assests/Image3.png";
import { MyContext } from "../../Context/Data/MyContext";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const context = useContext(MyContext);
  const { mode } = context;

  const ImageList = [
    {
      id: 1,
      img: image1,
      title: "Upto 50% off on all Men,s wear",
      description:
        "Revamp your wardrobe with style! Enjoy unbeatable deals of up to 50% off on our entire Men's Wear collection. Discover the latest trends, impeccable craftsmanship, and unmatched comfort—all at incredible prices. Don't miss out on this exclusive opportunity to elevate your fashion game without breaking the bank. Shop now and redefine your look with our premium Men's Wear at irresistible discounts",
    },
    {
      id: 1,
      img: Image2,
      title: "30% off on all Women's Wear",
      description:
        "Elevate your style with our exclusive offer! Enjoy a fabulous 30% off on our entire Women's Wear collection. Unleash your inner fashionista with trendy designs, luxurious fabrics, and chic ensembles—all at an incredible discount. Whether you're updating your work wardrobe or adding flair to your casual look, now is the perfect time to indulge in affordable luxury. Seize the opportunity to enhance your style and embrace the season's latest trends. Shop now and discover the perfect blend of fashion and savings!",
    },
    {
      id: 1,
      img: Image3,
      title: "70% off on all Products Sale",
      description:
        "Unbelievable Savings Await! Dive into our extraordinary 70% off Products Sale and experience a shopping spree like never before. From fashion to electronics, home goods, and more—everything you desire is now within reach at incredible discounts. Embrace the joy of savings and treat yourself to a wide array of top-quality products. Don't miss this limited-time opportunity to snag your favorites at jaw-dropping prices. Hurry, shop now, and redefine the art of smart shopping!",
    },
  ];

  const Hero = () => {
    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 800,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      cssEase: "ease-in-out",
      pauseOnHover: false,
      pauseOnFocus: true,
    };
    return settings;
  };
  const settings = Hero();
  return (
    <div
      style={{
        backgroundColor: mode === "dark" ? "#010b19" : "",
        color: mode === "dark" ? "white" : "",
      }}
      className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center"
    >
      {/* pattern */}
      <div className="h-[700px] w-[700px] bg-[#DB2777] bg-opacity-30 absolute -top-1/2 right-0 rounded-3xl rotate-45"></div>
      {/* herosection */}
      <div className="container  pb-8 sm:pb-0 mx-auto">
        <Slider className=" flex flex-wrap mx-5 sm:mx-2" {...settings}>
          {ImageList.map((item, index) => {
            return (
              <div key={index} className=" ">
                {/* image section */}
                <div className=" flex relative z-10">
                  <img
                    className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] object-contain mx-auto"
                    src={item.img}
                    alt="image!"
                  />
                </div>
                {/* text content section */}
                <div className="w-full  flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center   relative z-10">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-5">
                    {item.title}
                  </h1>
                  <p className="text-sm mb-5">{item.description}</p>
                  <Link to="/allproducts">
                    <div>
                      <button className="bg-[#DB2777] hover:scale-105 duration-200 text-white py-2 px-4 mb-5 rounded-full">
                        Order Now
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};
