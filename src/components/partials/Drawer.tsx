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
    console.log(e)
}

export default function DrawerComponent(props: any) {
    const open = props.open;
    const setOpen = props.setOpen;
    const submenuOpen = props.submenuOpen;
    const setSubmenuOpen = props.setSubmenuOpen;
    const { data: sessionData, status: sessionStatus } = useSession()

    return (
        <div id="drawer" className='flex fixed h-screen'>
            <div style={{
                gridTemplateRows: "min-content min-content auto max-content"
            }} className={`grid bg-base-300 h-screen p-5 pt-8 ${open ? 'w-56' : 'w-20'
                } duration-300 relative`}>
                <TitleComponent
                    title="MoeList"
                    setOpen={setOpen}
                    open={open}
                />

                <SearchComponent
                    open={open}
                />

                <div style={{
                    alignContent: "space-between"
                }} className="grid space-between h-auto">
                    <ul className='pt-2 flex flex-col h-max'>
                        {
                            Menu.Top.map((menu: any, index: any) => {
                                return <MenuItemComponent
                                    key={Math.random().toString(36).substring(2)}
                                    menu={menu}
                                    click={handleClick}
                                    open={open}
                                    setOpen={setOpen}
                                    submenuOpen={submenuOpen}
                                    setSubmenuOpen={setSubmenuOpen}
                                />
                            })
                        }
                    </ul>
                    <ul className='flex flex-col h-max'>
                        {
                            sessionStatus === "authenticated" ?
                                <UserAuthComponent session={sessionData} /> :
                                <UserAuthComponent />
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

function UserAuthComponent(props: any) {
    return <>
        <li style={{
            gridTemplateColumns: "auto min-content min-content",
        }} className={`text-gray-300 text-base grid items-center gap-x-2 cursor-pointer p-2 hover:bg-base-100 duration-300 rounded-md mt-2`}>
            {
                props.session ?
                    <>
                        <Link className={`flex items-center gap-x-2 cursor-pointer`} to={`/user/${props.session.data.user.name}`} onClick={handleClick} >
                            <img src={props.session.data.user.image} className="block h-8 w-8 rounded-full float-left cursor-pointer"></img>
                            <label className={`cursor-pointer`}>{props.session.data.user.name}</label>
                        </Link>

                        <Link className={`flex items-center cursor-pointer`} to={`/settings`} onClick={handleClick} >
                            <span className="text-xl block float-left cursor-pointer">
                                <AiFillSetting />
                            </span>
                        </Link>

                        <Link className={`flex items-center cursor-pointer`} to={`/auth/signout`} onClick={handleClick} >
                            <span className="text-xl block float-left cursor-pointer">
                                <BiLogOut />
                            </span>
                        </Link>
                    </> : <>
                        <Link className={`flex items-center gap-x-2 cursor-pointer`} to={`/auth/signin`} onClick={handleClick} >
                            <span className="text-xl grid content-center h-8 w-8 block float-left cursor-pointer">
                                <BiLogIn />
                            </span>
                            <label className={`cursor-pointer`}>Sign In</label>
                        </Link>
                    </>
            }

        </li>
    </>
}

function TitleComponent(props: any) {
    return <div style={{
        justifyContent: "space-between",
        alignItems: "center",
        gridTemplateColumns: "min-content min-content"
    }} className="grid h-8">
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
    }} className={`grid items-center gap-x-4 rounded-md bg-base-100 mt-6 py-2 px-2 ${!props.open && "w-min"}`}>
        <ImSearch className={`text-white text-xl block float-left cursor-pointer`} />
        <input type={"search"} placeholder='Search' style={{ width: 83 + "%" }} className={`text-base bg-transparent text-white focus:outline-none ${!props.open && "hidden"}`}></input>
    </div>
}

function MenuItemComponent(props: any) {
    return <>
        <li style={{
            justifyContent: "space-between",
        }} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-base-100 duration-300 rounded-md ${props.menu.spacing ? "mt-9" : "mt-2"}`}>
            <Link className={`${!props.open && "hidden"} flex items-center gap-x-4 cursor-pointer`} to={props.menu.to ? props.menu.to : "#"} onClick={props.handleClick} >
                <span className="text-xl block float-left cursor-pointer">
                    {props.menu.icon ? props.menu.icon : <RiDashboardFill />}
                </span>
                <label className={`cursor-pointer`}>{props.menu.title}</label>
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

function UserComponent() {
    return <label></label>
}