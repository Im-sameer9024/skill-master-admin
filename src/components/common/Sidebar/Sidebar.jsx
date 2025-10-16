import Logo from "../../../assets/logo.png";
import SidebarLinks from "./SidebarLinks";
const Sidebar = () => {
  return (
    <div className=" bg-lightSky h-screen w-2/12">
      {/*----------- logo ------------ */}
      <div className="w-22  mx-auto mt-5">
        <img src={Logo} alt="logo" className="w-full h-full object-cover" />
      </div>

      {/*------------------ all links ---------------------- */}
      <div className=" flex flex-col px-4  gap-2 mt-6 font-fontHeading">
        <SidebarLinks />
      </div>
    </div>
  );
};

export default Sidebar;
