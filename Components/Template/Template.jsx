
import { Footer, IconButton, Navbar } from "../../Tailwind/page";
import Logo from "../Logo/Logo";
import { useSession } from "next-auth/react";

const Template = ({ children }) => {
    
const {data,status} = useSession();

    const menus = {
        brand: <Logo />,
        link: [
            {
                label: "HOME",
                href: "/"
            },
            {
                label: "MOVIES",
                href: "/movies"
            },
            {
                label: "VIDEOS",
                href: "/videos"
            },
            {
                label: "BLOG",
                href: "/blog"
            },
            {
                label: "PLANS",
                href: "/plans"
            },
            {
                label: "CONTACT",
                href: "/contact"
            }
        ]
    }

    const befourLogin = [
        {
            label : "register",
            href : "/register",
            icon : "person"
        },
        {
            label : "login",
            href : "/login",
            icon : "login"
        }
    ]
    const afterLogin = [
        {
            label : data && data.user.name,
            href : data && data.user.role === "ADMIN" ? "/admin-panel/plans" : "/profile",
            icon : "person"
        },
        {
            label : "Logout",
            href : "/api/auth/signout",
            icon : "login",
            logout : true
        }
    ]

    const toolbars = [
        {
            label: <IconButton 
                theme="primary"
                className="bg-inherit"
                size="sm"
            >search</IconButton>
        },
        {
            label: <IconButton
                dropdown
                dropdownMenu={
                    status === "authenticated" 
                    ? 
                    afterLogin
                    :
                    befourLogin
                }
                theme="error"
                size="sm"
            >
                {
                    status === "authenticated" 
                    ?  <img src={
                     data.user.image ? data.user.image
                     : "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png"
                    }
                    className="rounded-full"
                    alt="profile" />
                    : "person"
                }
            </IconButton>
        },
    ]

    // markup
    const design = (
        <>
            <Navbar
                theme="dark"
                menu={menus}
                toolbar={toolbars}
                variant="three"

            />

            <div>
                {children}
            </div>

            <Footer />

        </>
    );
    return design
}

export default Template