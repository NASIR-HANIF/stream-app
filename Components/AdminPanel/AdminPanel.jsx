"use client";
import Link from "next/link";
import {
    IconButton,
    Button
} from "../../Tailwind/page";
import Logo from "../Logo/Logo";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { usePathname } from "next/navigation";

const AdminPanel = ({ children }) => {
    const [sidebar, setSidebar] = useState(null);
    const [section, setSection] = useState(null);
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();
    const pathname = usePathname();


    useEffect(() => {
        if (open) {
            return (
                setSidebar("w-0 sm:w-2/12"),
                setSection("w-full sm:w-10/12")
            )
        } else {
            return (
                setSidebar("absolute sm:static top-0 left-0 w-8/12 min-h-screen sm:w-0"),
                setSection("w-full")
            )
        }
    }, [open])

    const menus = [
        {
            label: "Movies",
            href: "/admin-panel/movies"
        },
        {
            label: "Media Jobs",
            href: "/admin-panel/jobs"
        },
        {
            label: "Plans",
            href: "/admin-panel/plans"
        }
    ]

    const Menu = ({ item }) => {
        const m = (
            <>
                <div>
                    <Button theme="t-primary">
                        <Link
                            className="text-black"
                            href={item.href}>
                            {item.label}
                        </Link>
                    </Button>
                </div>
            </>
        );
        return m
    }

    const design = (
        <>
            <div className="min-h-screen flex">
                <div className={`bg-white shadow-lg overflow-x-hidden ${sidebar}`}>
                    {
                        menus.map((item, index) => {
                            return <Menu key={index} item={item} />
                        })
                    }
                </div>
                <div className={`bg-slate-800 ${section}`}>
                    <nav className="flex px-5 py-3 bg-gray-100 justify-between items-center">
                        <Logo className="text-black" />

                        <div className="flex gap-4 items-center">
                            <IconButton
                                size="sm"
                                theme="t-secondary"
                                onClick={() => setOpen(!open)}
                            >format_align_right</IconButton>
                            {
                                pathname === "/admin-panel/movies"
                                    ?
                                    <IconButton
                                        onClick={() => dispatch({
                                            type: "OPEN_DIALOG"
                                        })}
                                        size="sm"
                                        theme="secondary"
                                    >add</IconButton>
                                    : null
                            }
                        </div>
                    </nav>
                    <div className="p-5 ">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
    return design
}

export default AdminPanel