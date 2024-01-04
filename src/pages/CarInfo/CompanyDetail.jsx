import React from "react"
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"

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
        <NavLink
            to="."
            end
        >
            Details
        </NavLink>)
}