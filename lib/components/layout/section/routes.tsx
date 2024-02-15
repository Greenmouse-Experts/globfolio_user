import {
  MdOutlineDashboard, MdOutlineSubscriptions,
} from 'react-icons/md';
import { HiOutlineUsers } from "react-icons/hi2";
import { RiUserSettingsLine } from 'react-icons/ri';
import { IoNewspaperOutline, IoNotificationsCircleOutline } from "react-icons/io5";
import { FiHeart } from 'react-icons/fi';
export interface RouteType {
  name:string;
  icon: any;
  route:string;
  submenu: {
    name:string;
    icon: any;
    route:string;
  }[]
}
export const Routes = [
  {
    name: 'Dashboard',
    icon: <MdOutlineDashboard className="text-xl" />,
    route: '/dashboard',
    submenu: [],
  },
  {
    name: 'Subscriptions',
    icon: <MdOutlineSubscriptions className="text-xl" />,
    route: '/subscription',
    submenu: [],
  },
  {
    name: 'Analyst Picks',
    icon: <IoNewspaperOutline className="text-xl" />,
    route: '/picks',
    submenu: [],
  },
  {
    name: 'Favorite Picks',
    icon: <FiHeart className="text-xl" />,
    route: '/picks/favorite',
    submenu: [],
  },
  {
    name: 'Chat Room',
    icon: <RiUserSettingsLine className="text-xl" />,
    route: '/chat',
    submenu: [],
  },
  {
    name: 'Notifications',
    icon: <IoNotificationsCircleOutline className="text-xl" />,
    route: '/notify',
    submenu: [],
  },
]