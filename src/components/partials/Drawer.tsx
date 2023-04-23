'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
// import Link from 'next/link'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useSession, signOut, signIn } from 'next-auth/react';


import { AiFillSetting } from 'react-icons/ai';
import { BsCalendarWeekFill, BsPersonFill, BsListCheck, BsChevronDown, BsBookmarkStarFill } from 'react-icons/bs';
import { ImHome, ImSearch, ImBook } from 'react-icons/im';
import { RiCompassDiscoverFill, RiDashboardFill } from 'react-icons/ri';
import { BiLogOut, BiLogIn } from 'react-icons/bi';
import { FaTv } from 'react-icons/fa';

import Loading from '@/components/partials/Loading'

const Menu = {
    Top: [
        {
            title: "Home",
            type: "link",
            to: "/home",
            icon: <ImHome />
        },
        {
            title: "Discover",
            type: "link",
            to: "/discover",
            icon: <RiCompassDiscoverFill />
        },
        {
            title: "Schedule",
            type: "link",
            to: "/schedule",
            icon: <BsCalendarWeekFill />
        },

        {
            title: "Profile",
            type: "link",
            to: "/user",
            icon: <BsPersonFill />,
            spacing: true
        },
        {
            title: "Lists",
            type: "link",
            to: "/user",
            icon: <BsListCheck />,
            submenu: true,
            submenuItems: [
                {
                    title: "Anime",
                    type: "link",
                    to: "/home",
                    icon: <FaTv />,
                },
                {
                    title: "Manga",
                    type: "link",
                    to: "/home",
                    icon: <ImBook />,
                },
                {
                    title: "Favorites",
                    type: "link",
                    to: "/home",
                    icon: <BsBookmarkStarFill />,
                },
            ]
        },
    ],
    Bottom: [
        {
            title: "Log In",
            type: "link",
            to: "/auth",
            icon: <BiLogIn />
        },
    ]
};

const handleClick = (e: any) => {
    e.preventDefault()
}

export default function DrawerComponent(props: any) {
    const open = props.open;
    const setOpen = props.setOpen;
    const submenuOpen = props.submenuOpen;
    const setSubmenuOpen = props.setSubmenuOpen;
    const { data: sessionData, status: sessionStatus } = useSession();

    console.log("drawer", sessionData, sessionStatus)

    return (
        <div id="drawer" className='flex z-10 fixed h-screen'>
            <div style={{
                gridTemplateRows: "min-content min-content auto max-content"
            }} className={`grid bg-base-300 gap-y-5 h-screen pt-8 ${open ? 'w-56' : 'w-20'
                } duration-300 relative`}>
                <TitleComponent
                    title="MoeList"
                    setOpen={setOpen}
                    open={open}
                />

                <div className="px-5">
                    <SearchComponent
                        open={open}
                    />
                </div>


                <div style={{
                    alignContent: "space-between"
                }} className="grid space-between h-auto">
                    <ul className='px-5 pt-2 flex flex-col h-max'>
                        {
                            Menu.Top.map((menu: any, index: any) => {
                                return <MenuItemComponent
                                    key={Math.random().toString(36).substring(2)}
                                    menu={menu}
                                    open={open}
                                    setOpen={setOpen}
                                    submenuOpen={submenuOpen}
                                    setSubmenuOpen={setSubmenuOpen}
                                />
                            })
                        }
                    </ul>
                </div>
                <div className='flex flex-col h-max bg-base-500'>
                    <UserAuthComponent open={open} sessionData={sessionData} sessionStatus={sessionStatus} />
                </div>
            </div>
        </div>
    );
}

function UserAuthComponent({ open, sessionData, sessionStatus }: any) {
    if (sessionStatus === 'loading' || sessionStatus == 'undefined') {
        return <>
            <div className={`grid h-14 items-center`}>
                <Loading />
            </div>
        </>
    }
    return <>
        <div style={{
            gridTemplateColumns: open ? "auto min-content" : "auto",
        }} className={`grid h-14 items-center gap-x-2 cursor-pointer px-3`}>
            {
                sessionStatus == "authenticated" ?
                    <>
                        <Link style={{
                            gridTemplateColumns: open ? "max-content auto" : "auto",
                            justifyItems: open ? "start" : "center",
                        }} className={`grid items-center w-full hover:bg-base-100 p-1 duration-300 rounded-md gap-x-2 cursor-pointer`} to={`/user/${sessionData.user?.name}`} onClick={handleClick} >
                            <img src={sessionData.user?.image || ""} className="block h-9 w-9 rounded-full float-left cursor-pointer"></img>
                            <label className={`text-gray-300 text-sm cursor-pointer ${!open && "hidden"}`}>{sessionData.user?.name}</label>
                        </Link>

                        <div className={`flex items-center rounded-md cursor-pointer ${!open && "hidden"}`} >
                            <Link className={`items-center hover:bg-base-100 duration-300 rounded-md p-2`} to={`/settings`} onClick={handleClick} >
                                <span className="text-xl block float-left cursor-pointer">
                                    <AiFillSetting />
                                </span>
                            </Link>

                            <Link className={`items-center hover:bg-base-100 duration-300 rounded-md p-2`} to={`/auth/signout`} onClick={handleClick} >
                                <span className="text-xl block float-left cursor-pointer">
                                    <BiLogOut />
                                </span>
                            </Link>
                        </div>

                    </> : <>
                        <Link className={`flex items-center hover:bg-base-100 duration-300 rounded-md px-2 gap-x-2 cursor-pointer`} to={`/auth/signin`} onClick={handleClick} >
                            <span className="text-xl grid content-center h-8 w-8 block float-left cursor-pointer">
                                <BiLogIn />
                            </span>
                            <label className={`cursor-pointer ${!open && "hidden"}`}>Sign In</label>
                        </Link>
                    </>
            }
        </div>
    </>
}

function TitleComponent(props: any) {
    return <div style={{
        justifyContent: "space-between",
        alignItems: "center",
        gridTemplateColumns: "min-content min-content"
    }} className="grid px-5 h-8">
        <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!props.open && "scale-8"} ${!props.open && "hidden"}`}>
            {props.title}
        </h1>
        <CollapseComponent open={props.open} setOpen={props.setOpen} />
    </div>
}

function CollapseComponent(props: any) {
    return <label className="px-2 swap swap-rotate">
        <input type="checkbox" onClick={() => props.setOpen(!props.open)} />
        <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
        <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
    </label>
}

function SearchComponent(props: any) {
    return <div style={{
        gridTemplateColumns: props.open ? "min-content auto" : "min-content",
        height: 40 + "px"
    }} className={`grid items-center gap-x-4 rounded-md bg-base-100 py-2 px-2 ${!props.open && "w-min"}`}>
        <ImSearch className={`text-white text-xl block float-left cursor-pointer`} />
        <input type={"search"} placeholder='Search' style={{ width: 83 + "%" }} className={`text-base bg-transparent text-white focus:outline-none ${!props.open && "hidden"}`}></input>
    </div>
}

function MenuItemComponent(props: any) {
    return <>
        <li style={{
            justifyContent: "space-between",
        }} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-base-100 duration-300 rounded-md ${props.menu.spacing ? "mt-9" : "mt-2"}`}>
            <Link className={`flex items-center gap-x-4 cursor-pointer`} to={props.menu.to ? props.menu.to : "#"} onClick={handleClick} >
                <span className="text-xl block float-left cursor-pointer">
                    {props.menu.icon ? props.menu.icon : <RiDashboardFill />}
                </span>
                <label className={`${!props.open && "hidden"} cursor-pointer`}>{props.menu.title}</label>
            </Link>

            {props.menu.submenu && props.open && (
                <BsChevronDown className={`${props.submenuOpen && "rotate-180"} cursor-pointer`} onClick={() => props.setSubmenuOpen(!props.submenuOpen)} />
            )}
        </li>

        {props.menu.submenu && props.submenuOpen && props.open && (
            <ul className='px-5'>
                {props.menu.submenuItems.map((submenuItem: any, index: any) => {
                    return <MenuItemComponent menu={submenuItem} open={props.open} setOpen={props.setOpen} submenuOpen={props.submenuOpen} setSubmenuOpen={props.setSubmenuOpen} />
                })}
            </ul>
        )}
    </>
}