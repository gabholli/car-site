import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center gap-8 px-2">
            <h1 className="text-center text-4xl">Find out about your favorite car</h1>
            <Link className="bg-gray-500 px-4 py-2 rounded text-xl" to="companies">Find your car</Link>
        </div>
    )
}