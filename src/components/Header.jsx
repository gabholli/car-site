import React from "react"
import { Link, NavLink } from "react-router-dom"

export default function Header() {
    return (
        <header className="bg-black h-20 flex justify-center items-center">
            <div className="flex gap-10">
                <Link to="/">Car Info Site</Link>
            </div>
        </header>
    )
}