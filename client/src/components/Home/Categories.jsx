import { getCategories } from "../../services/homePageAPI";
import { resizeImage } from "../../services/image";
import { useQuery } from "react-query";

export default function Categories() {
  const { isLoading, data: categories } = useQuery(
    "home-categories",
    getCategories
  );

  return (
    <div className="mx-[4vw]">
      <h1 className="text-2xl mb-3">Categories</h1>
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        }}
      >
        {isLoading ? (
          <>
            {[...new Array(12)].map((_, index) => (
              <div
                key={index}
                className="relative h-0"
                style={{ paddingBottom: "100%" }}
              >
                <div className="absolute w-full h-full rounded bg-gray-300 animate-pulse"></div>
              </div>
            ))}
          </>
        ) : (
          <>
            {categories.map((item) => (
              <div
                key={item._id}
                className="relative h-0"
                style={{ paddingBottom: "100%" }}
              >
                <div className="absolute w-full h-full rounded shadow hover:shadow-md transition cursor-pointer flex flex-col justify-between items-center px-2 py-4">
                  <img
                    className="w-2/5 h-2/5 object-contain"
                    src={resizeImage(item.image, 100, 100)}
                    alt=""
                  />
                  <p className="text-center text-sm min-h-[40px]">
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
