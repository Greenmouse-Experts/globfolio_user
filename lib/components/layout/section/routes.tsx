import {
  MdOutlineDashboard,
} from 'react-icons/md';
import { HiOutlineUsers } from "react-icons/hi2";
import { RiUserSettingsLine } from 'react-icons/ri';
import { IoNotificationsCircleOutline } from "react-icons/io5";
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
    name: 'Analyst Picks',
    icon: <HiOutlineUsers className="text-xl" />,
    route: '/picks',
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