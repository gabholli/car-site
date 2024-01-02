import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="h-full flex flex-col justify-center items-center gap-4">
            <h1 className="text-center">Click here to find out about your favorite car</h1>
            <Link className="bg-gray-500 px-4 py-2 rounded" to="bands">Find your car</Link>
        </div>
    )
}