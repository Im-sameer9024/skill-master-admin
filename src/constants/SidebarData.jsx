import { 
    FaHome, 
    FaUser, 
    FaBell, 
    FaCog, 
    FaFileAlt, 
    FaInfoCircle, 
    FaFileContract, 
    FaShieldAlt, 
    FaQuestionCircle, 
    FaBlog 
} from 'react-icons/fa';
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaMusic } from "react-icons/fa6";

export const SidebarData = [
    {
        title: "Dashboard",
        path: "/",
        icon: <FaHome />
    },
    {
        title: "Users",
        path: "/users",
        icon: <FaUser />
    },
    {
        title: "Plans",
        path: "/plans",
        icon: <FaFileAlt />
    },
    {
        title: "Notification",
        path: "/notification",
        icon: <FaBell />,
    },
    {
        title: "CMS",
        path: "/cms/about",
        icon: <FaCog />,
        others: [
            {
                title: "About Us",
                path: "/cms/about",
                icon: <FaInfoCircle />
            },
            {
                title: "Terms & Conditions",
                path: "/cms/terms-conditions",
                icon: <FaFileContract />
            },
            {
                title: "Privacy Policy",
                path: "/cms/privacy-policy",
                icon: <FaShieldAlt />
            },
            {
                title: "FAQ",
                path: "/cms/faq",
                icon: <FaQuestionCircle />
            }
        ]
    },
    {
        title: "Blogs",
        path: "/blogs",
        icon: <FaBlog />,
    },
    // {
    //     title:"Category",
    //     path:"/categories",
    //     icon:<BiSolidCategoryAlt />
    // }
    {
        title: "Listening",
        path: "/listening",
        icon: <FaMusic />
    }
]