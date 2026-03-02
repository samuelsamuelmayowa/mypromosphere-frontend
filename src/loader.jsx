import "./index.css";
import img from "./assets/icons/icon2.svg"

const Loader = () => {
  return (
    <div className="z-[999999999999999999999999999999] min-h-screen grid place-content-center">
    <div className="relative">
      <img className="relative animate-spin" src={img} alt="" />
    </div>
  </div>
  )
}

export default Loader;