import { Footer, IconButton, Navbar } from "../../Tailwind/page";
import Logo from "../Logo/Logo";

const Template = ({children})=>{
// const
const menus = {
    brand : <Logo />,
    link : [
        {
            label : "HOME",
            href : "/"
        },
        {
            label : "MOVIES",
            href : "/movies"
        },
        {
            label : "VIDEOS",
            href : "/videos"
        },
        {
            label : "BLOG",
            href : "/blog"
        },
        {
            label : "CONTACT",
            href : "/contact"
        }
    ]
}

const toolbars = [
    {
        label : <IconButton className="bg-inherit" size="sm">search</IconButton>
    },
    {
        label : <IconButton theme="error" size="sm">person</IconButton>
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