import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export const SidebarData = [
    {
        title:"Dashboard",
        path:"/",
        icon:<HomeFilledIcon/>
    },
    {
        title:"Users",
        path:"/users",
        icon:<PersonIcon/>
    },
    {
        title:"Notification",
        path:"/notification",
        icon:<NotificationsIcon/>,
    },
    {
        title:"CMS",
        path:"/cms",
        icon:<ManageAccountsIcon/>,
        others:[
            {
                title:"About Us",
                path:"/cms/about",
                icon:<ManageAccountsIcon/>
            },
            {
                title:"Contact Us",
                path:"/cms/contact",
                icon:<ManageAccountsIcon/>
            }
        ]
    }
]