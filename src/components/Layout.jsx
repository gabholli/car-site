import React from "react"
import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <div classname="flex flex-col justify-center items-center">
            <Outlet />
        </div>
    )
}