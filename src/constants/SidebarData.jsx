import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ArticleIcon from '@mui/icons-material/Article';
import InfoIcon from '@mui/icons-material/Info';
import GavelIcon from '@mui/icons-material/Gavel';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';

export const SidebarData = [
    {
        title: "Dashboard",
        path: "/",
        icon: <HomeFilledIcon />
    },
    {
        title: "Users",
        path: "/users",
        icon: <PersonIcon />
    },
    {
        title: "Plans",
        path: "/plans",
        icon: <NoteAddIcon />
    },
    {
        title: "Notification",
        path: "/notification",
        icon: <NotificationsIcon />,
    },
    {
        title: "CMS",
        path: "/cms",
        icon: <SettingsIcon />,
        others: [
            {
                title: "About Us",
                path: "/cms/about",
                icon: <InfoIcon />
            },
            {
                title: "Terms & Conditions",
                path: "/cms/terms-conditions",
                icon: <GavelIcon />
            },
            {
                title: "Privacy Policy",
                path: "/cms/privacy-policy",
                icon: <PrivacyTipIcon />
            },
            {
                title: "FAQ",
                path: "/cms/faq",
                icon: <HelpOutlineIcon />
            }
        ]
    },
    {
        title: "Blogs",
        path: "/blogs",
        icon: <DynamicFeedIcon />,
    },
]