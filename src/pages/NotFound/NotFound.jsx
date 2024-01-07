import React from "react"
import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center
            gap-8 px-2">
            <h1 className="text-center text-3xl">
                Sorry, the page you were looking for was not found
            </h1>
            <Link to="/" className="bg-black px-4 py-2 rounded text-xl hover:underline">
                Return to home
            </Link>
        </div>
    )
}
