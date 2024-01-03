import React from "react"
import { Outlet, NavLink } from "react-router-dom"

export default function DashboardLayout() {
    return (
        <div className="flex flex-col">
            <nav className="flex justify-center gap-10">
                <NavLink
                    to="."
                    end
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="models"
                >
                    Models
                </NavLink>
            </nav>
            <Outlet />
        </div>
    )
}