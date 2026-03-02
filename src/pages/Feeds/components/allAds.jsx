import { motion } from 'framer-motion';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import ProductDisplay from '../../../components/productDisplay';
import PropTypes from 'prop-types';


const AllAds = ({ gridOrFlex, adsCategory, all, other_images }) => {
  if (!all) return null;
  return (
    <section>
      {gridOrFlex && adsCategory === "All" && (
        <section className="filter mx-auto w-full my-4">
          <Splide
            options={{
              type: "slide",
              perPage: 3,
              perMove: 1,
              gap: "10px",
              interval: 3000,
              speed: 2000,
              pagination: false,
              snap: true,
              drag: "free",
              breakpoints: {
                1200: {
                  perPage: 2,
                },
                640: {
                  perPage: 1,
                },
                300: {
                  perPage: 1,
                },
              },
            }}
            className=""
          >
            {all?.map((item, index) => (
              <SplideSlide key={`slide-${item.id || ''}-${index}`}>
                <ProductDisplay
                  flex={true}
                  item={item}
                  other_images={other_images}
                  index={index}
                />
              </SplideSlide>
            ))}
          </Splide>
        </section>
      )}
      <motion.div>
        {!gridOrFlex && adsCategory === "All" && (
          <section className="mb-2 grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-2 md:gap-2 md:gap-y-4">
            {all?.map((item, index) => (
              <ProductDisplay
                key={`product-${item.productName || ''}-${index}`}
                item={item}
                other_images={other_images}
                index={index}
              />
            ))}
          </section>
        )}
      </motion.div>

      {adsCategory !== "All" && (
        <>
          {all?.filter(
            (item) => item.categories === adsCategory
          ).length > 0 ? (
            <div className="flex items-center gap-2 my-5">
              <h1 className="font-medium md:font-bold text-lg lg:text-2xl text-indigo-600">
                {adsCategory === "Fashion" && "Stay Fashion Forward: Dive into the Latest Fashion Trends!"}
                {adsCategory === "Electronics" && "Discover Cutting-Edge Electronics for Your Modern Lifestyle!"}
                {adsCategory === "Home" && "Transform Your Space: Explore Our Premium Home Collection!"}
                {adsCategory === "Fragrances" && "Capture Hearts with Signature Scents: Dive into Luxury Fragrances!"}
                {adsCategory === "Laptops" && "Unleash Your Productivity: Explore the Latest Laptop Innovations!"}
              </h1>
            </div>
          ) : (
            <div className="min-h-[50vh] flex items-center justify-center gap-2 my-5">
              <h1 className={`font-medium md:font-bold text-lg lg:text-2xl text-gray-800 dark:text-gray-200`}>
                No products in {adsCategory} category
              </h1>
            </div>
          )}
          <section className="mb-2 relative grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-2 md:gap-2 min-h-full">
            {all
              .filter((item) => item.categories === adsCategory)
              .map((item, index) => (
                <ProductDisplay
                  key={`filtered-${item.id || ''}-${index}`}
                  item={item}
                  other_images={other_images}
                  index={index}
                />
              ))}
          </section>
        </>
      )}
    </section>
  );
};

AllAds.propTypes = {
    adsCategory: PropTypes.any,
    all: PropTypes.any,
    other_images: PropTypes.any,
    gridOrFlex: PropTypes.any,
    isLoading: PropTypes.bool,
    index: PropTypes.any,
}

export default AllAds;