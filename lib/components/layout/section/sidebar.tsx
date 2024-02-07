import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { RouteType, Routes } from "./routes";
import { BiLogOutCircle } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import { usePathname } from "next/navigation";
import useModal from "@/lib/hooks/useModal";
import Link from "next/link";
import LogoutModal from "../../modules/auth/LogoutModal";
import Image from "next/image";
import logo from '../../../../public/logo.svg'

const SidebarLayout = () => {
  const path = usePathname();
  const { Modal, setShowModal } = useModal();

  return (
    <div className="left-0 top-0 fixed overflow-y-hidden index-30  bg-primary text-white">
      <Sidebar
        customBreakPoint="1024px"
        className="h-screen overflow-y-hidden scroll-pro pb-4 fs-700 fw-500 px-4"
        backgroundColor=""
      >
        <div className="flex justify-center py-2 lg:py-2 lg:pb-8 items-center">
          <Link href="/" className="flex justify-center gap-x-1">
            <Image src={logo} alt="logo" width={150} height={20}/>
          </Link>
        </div>
        <Menu
          className="overflow-y-auto relative scroll-pro h-[84vh]"
          transitionDuration={600}
          menuItemStyles={{
            button: ({ level, active }) => {
              if (level === 0)
                return {
                  color: active ? "black" : "#b5b3b3",
                  marginTop: "4px",
                  height: "auto",
                  padding: "3px 15px 3px 0px !important ",
                  textAlign: "left",
                  fontWeight: active ? "600" : "500",
                  borderLeft: active ? "5px solid #090979" : "",
                  background: active ? "#e3f9ff" : "",
                  "&:hover": {
                    color: "black",
                    background: "#e3f9ff",
                    borderLeft: "5px solid #090979",
                    fontWeight: "500",
                  },
                };
            },
          }}
        >
          {Routes.map((item) => {
            return (
              <>
                {!!item.submenu.length ? (
                  <SubMenu label={item.name} icon={item.icon} key={item.name}>
                    {item.submenu.map((item: RouteType, i) => (
                      <MenuItem
                        component={<Link href={item.route} />}
                        active={path === item.route && true}
                        key={i}
                      >
                        <p className="fs-400">{item.name}</p>
                      </MenuItem>
                    ))}
                  </SubMenu>
                ) : (
                  <MenuItem
                    component={<Link href={item.route} />}
                    icon={item.icon}
                    active={path === item.route && true}
                    key={item.name}
                  >
                    <p className="fs-400">{item.name}</p>
                  </MenuItem>
                )}
              </>
            );
          })}
          <MenuItem
            component={<Link href={"/settings"} />}
            icon={<BsGear className="text-xl" />}
            className="mt-12"
          >
            <p className="fs-400">Settings</p>
          </MenuItem>
          <MenuItem
            icon={<BiLogOutCircle className="text-xl" />}
            onClick={() => setShowModal(true)}
            className=""
          >
            <p className="fs-400">Logout</p>
          </MenuItem>
        </Menu>
      </Sidebar>
      <Modal title="" size="xs">
        <LogoutModal CloseModal={() => setShowModal(false)} />
      </Modal>
    </div>
  );
};

export default SidebarLayout;
