import React from "react"
import { useEffect, useState } from "react"
import { NavLink, useParams, Outlet } from "react-router-dom"

export default function CompanyDetail() {
    const { id } = useParams()

    useEffect(() => {
        fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/${id}?format=json`)
            .then(response => {
                if (!response.ok) {
                    throw Error("Data not available")
                }
                return response.json()
            })
            .then(data => {
                console.log(data)
            })
            .catch(error =>
                console.log("Fetch error: ", error))
    }, [])


    return (
        <div className="flex flex-col items-center p-4">
            <nav className="flex gap-8">
                <NavLink
                    to="."
                    end
                >
                    Details
                </NavLink>
            </nav>
            <Outlet />
        </div>
    )
}