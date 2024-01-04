import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center gap-8 px-2">
            <h1 className="text-center text-4xl">Find information about car manufacturer</h1>
            <Link className="bg-orange-200 px-4 py-2 rounded text-xl" to="companies">Find your manufacturer</Link>
        </div>
    )
}