import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center gap-8 px-2">
            <h1 className="text-center text-4xl">Find information about car manufacturers</h1>
            <Link
                className="bg-black px-4 py-2 rounded text-xl hover:underline"
                to="companies">
                Find your manufacturer
            </Link>
        </div>
    )
}