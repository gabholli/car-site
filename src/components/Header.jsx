import React from "react"
import { Link, NavLink } from "react-router-dom"

export default function Header() {
    return (
        <header className="bg-orange-100 h-20 flex justify-center items-center
            text-xl mb-10">
            <div className="flex gap-10 hover:underline">
                <Link to="/">Car Info Site</Link>
            </div>
        </header>
    )
}