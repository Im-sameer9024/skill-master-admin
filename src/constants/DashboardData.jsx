
import PersonIcon from '@mui/icons-material/Person';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import GradingIcon from '@mui/icons-material/Grading';
import NoteAddIcon from '@mui/icons-material/NoteAdd';


 // card style of dashboard
  export const getCardStyles = (index) => {
    const colorSchemes = [
      {
        bg: "bg-blue-200",
        iconBg: "bg-blue-200",
        text: "text-content "
      },
      {
        bg: "bg-green-200", 
        iconBg: "bg-green-200",
        text: "text-content"
      },
      {
        bg: "bg-purple-200",
        iconBg: "bg-purple-200",
        text: "text-content"
      },
    //   {
    //     bg: "bg-orange-200",
    //     iconBg: "bg-orange-200",
    //     text: "text-content"
    //   }
    ];
    
    return colorSchemes[index];
  };

export const dashboardHederData = [
    {
        title: "Total Users",
        icon: <PersonIcon />,
        value: "100"

    },
    {
        title: "Total Orders",
        icon: <AddShoppingCartIcon />,
        value: "100"
        
    },
    {
        title: "Total Reviews",
        icon: <GradingIcon />,
        value: "100"
        
    },
    // {
    //     title: "Total Plans",
    //     icon: <NoteAddIcon />,
    //     value: "100"
        
    // }
]