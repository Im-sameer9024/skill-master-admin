import Logo from "../../../assets/logo.png";
import SidebarLinks from "./SidebarLinks";
const Sidebar = () => {
  return (
    <div className=" bg-lightSky h-screen w-1/8">
      {/*----------- logo ------------ */}
      <div className="w-22  mx-auto mt-5">
        <img src={Logo} alt="logo" className="w-full h-full object-cover" />
      </div>

      {/*------------------ all links ---------------------- */}
      <div className=" flex flex-col px-2 gap-2 mt-6">
        <SidebarLinks />
      </div>
    </div>
  );
};

export default Sidebar;
