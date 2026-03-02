import { Link, useSearchParams } from "react-router-dom";
import icon2 from "../assets/icons/icon2.svg";
import { HotLinks } from "../json/hotLinks";
import { IoSendOutline } from "react-icons/io5";
import { useStateContext } from "../contexts/ContextProvider";

export default function Footer() {
  const { token, LogOut } = useStateContext()
  const categoriesLinks = HotLinks
  const [, setSearchParams] = useSearchParams();
  return (
    <footer className="bg-black px-4 bigLg:px-20">
      <div className="flex md:gap-10 gap-5 flex-col bigLg:flex-row py-14 md:py-24">
        <div className="flex-1 bigLg:flex-[2]">
          <form action="" className=" flex flex-col">
            <img src={icon2} className="md:w-14 w-10 mb-2" alt="" />
            <h1 className=" text-white text-base lg:text-2xl font-bold leading-normal">
              Subscribe to our newsletter
            </h1>
            <p className=" text-white text-base my-4 jost">
              Subscribe now to our newsletter to be updated on our latest deals and offers!!!
            </p>
            <div className=" flex items-center border-white border-2 p-2">
              <input type="email" placeholder="Enter your email" className="bg-transparent py-4 text-slate-100 placeholder:text-white placeholder:text-base focus:border-purple duration-300 focus:outline-none w-full" />
              <button type="submit" className="bg-transparent py-2 px-2 lg:py-4 lg:px-4 rounded-sm text-white" >
                <IoSendOutline size={20} />
              </button>
            </div>
          </form>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <h2 className="font-semibold md:font-bold text-lg md:text-xl text-white jost">Support</h2>
          <ul className="text-smallText text-sm leading-8">
            <li>Our Company address</li>
            <li><a href="mailto:mypromosphere@gmail.com">mypromosphere@gmail.com</a></li>
            <li><a href="tel:+2348160587687">+234-816-058-7687</a></li>
            <li><a href="tel:+2349120701811">+234-912-070-1811</a></li>
          </ul>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <h2 className="font-semibold md:font-bold text-lg md:text-xl text-white jost">Account</h2>
          <ul className="text-smallText text-sm leading-8">
            <li>My Account</li>
            <li className="cursor-pointer">{token ? <span onClick={LogOut}>LogOut</span> : <div><Link to={"/login"}>Login</Link> / <Link to={"/signup"}>Register</Link></div>} </li>
            <li><Link to='/wishlist'>WishList</Link></li>
            <li>Shop</li>
            <li><Link to="/learning">Learning</Link></li>
          </ul>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <h2 className="font-semibold md:font-bold text-lg md:text-xl text-white jost">Quick Link</h2>
          <ul className="text-smallText text-sm leading-8">
            <li><Link to="/PrivacyPolicy">Terms and use</Link></li>
            <li><Link to="/termsAndCondition">Terms and use</Link></li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <h2 className="font-semibold md:font-bold text-lg md:text-xl text-white jost">
            Categories
          </h2>
          <ul className="text-smallText text-sm leading-8">
            {categoriesLinks.map(({ id, text, url }) => {
              return (
                <li key={id} className="cursor-pointer">
                  <div onClick={() => { setSearchParams({ adsCategory: text }); window.scrollTo(0, 0) }} className="capitalize">
                    {text}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <hr />
      <div className=" text-white md:text-center py-4">
        Copyright @{new Date().getFullYear()} {" "}
        <span className=" tracking-[-1.8px]">MyPromoSphere</span>
      </div>
    </footer>
  );
}

