import { Link, useLocation, useParams } from "react-router-dom";

import ReviewsSection from "../components/Product/ReviewsSection";
import Slider from "react-slick";
import Spin from "react-cssfx-loading/lib/Spin";
import StarRatings from "../components/StarRatings";
import { getProductDetail } from "../services/api/product";
import useSWR from "swr";
import { useState } from "react";
import { useStore } from "../store";

export default function Product() {
  const { id } = useParams();
  const location = useLocation();
  const {
    data: product,
    error,
    mutate,
  } = useSWR(location.pathname, () => getProductDetail(id));
  const addCartItem = useStore((state) => state.addCartItem);

  const [quantity, setQuantity] = useState(1);

  if (!product || error)
    return (
      <div className="min-h-screen flex justify-center items-center bg-bg">
        <Spin color="#2874F0" width="40px" height="40px" />
      </div>
    );

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col items-stretch px-[6vw]">
        <div className="flex gap-2 items-center text-sm my-4 flex-wrap">
          <Link
            className="hover:text-primary transition whitespace-nowrap"
            to="/"
          >
            Home
          </Link>
          <i className="fa fa-chevron-right text-xs"></i>
          <Link
            className="hover:text-primary transition whitespace-nowrap"
            to={`/search?category=${product.category._id}`}
          >
            {product.category.name}
          </Link>
          <i className="fa fa-chevron-right text-xs"></i>
          <span className="hover:text-primary transition cursor-pointer whitespace-nowrap">
            {product.name}
          </span>
        </div>

        <div className="flex items-start bg-white p-4">
          <div className="w-[35%]">
            <Slider
              infinite
              speed={500}
              autoplay
              autoplaySpeed={4000}
              slidesToShow={1}
              slidesToScroll={1}
            >
              {product.images.map((image) => (
                <img key={image} src={image} alt="" />
              ))}
            </Slider>
          </div>
          <div className="w-[65%] pl-6 flex flex-col items-stretch gap-3">
            <h1 className="text-2xl font-medium">{product.name}</h1>
            <div className="flex gap-3 items-center">
              <div className="flex items-center gap-1">
                <p
                  className={`text-lg ${
                    product.ratings > 0 ? "text-orange" : ""
                  }`}
                >
                  {product.ratings}
                </p>
                <p>
                  <StarRatings value={product.ratings} max={5} />
                </p>
              </div>

              <div className="h-6 w-[2px] bg-gray-300"></div>

              <div className="flex items-center gap-1">
                <p className="text-lg">{product.ratingsCount}</p>
                <p className="text-gray-500">Ratings</p>
              </div>

              <div className="h-6 w-[2px] bg-gray-300"></div>

              <div className="flex items-center gap-1">
                <p className="text-lg">20</p>
                <p className="text-gray-500">Sold</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <p className="text-2xl line-through text-gray-400">
                ${product.price}
              </p>
              <h1 className="text-5xl my-3 text-primary">
                ${Math.round((product.price - product.discount) * 10) / 10}
              </h1>
            </div>

            <div className="flex items-center">
              <div className="w-24">Quantity</div>
              <div className="flex items-stretch">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="outline-none border border-gray-300 hover:border-primary hover:text-primary transition px-3 h-8"
                >
                  -
                </button>

                <input
                  className="h-8 w-10 outline-none text-center border border-gray-300"
                  type="text"
                  value={quantity}
                  readOnly
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="outline-none border border-gray-300 hover:border-primary hover:text-primary transition px-3 h-8"
                >
                  +
                </button>
              </div>
            </div>

            <p className="text-gray-500">
              {product.stock} item{product.stock === 0 ? "" : "s"} left in stock
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => addCartItem(product._id, quantity)}
                className="px-4 py-3 bg-[#e2edff] text-primary flex items-center gap-2 hover:bg-[#d5e5ff] transition"
              >
                <i className="fas fa-cart-plus"></i>
                <span>Add to cart</span>
              </button>
              <button className="px-4 py-3 bg-primary text-white flex items-center gap-2 hover:bg-secondary transition">
                <i className="fas fa-money-check-alt"></i>
                <span>Buy now</span>
              </button>
            </div>
          </div>
        </div>

        <ReviewsSection product={product} refetchProduct={mutate} />
      </div>
    </>
  );
}
