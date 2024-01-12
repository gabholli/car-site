import React from "react"
import { useEffect, useState } from "react"
import { NavLink, useParams, Outlet, Link } from "react-router-dom"

export default function CompanyDetail() {
    const { name } = useParams()
    const [companyData, setCompanyData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/${name}?format=json`)
            .then(response => {
                if (!response.ok) {
                    throw Error("Data not available")
                }
                return response.json()
            })
            .then(data => {
                console.log(data)
                setCompanyData(data.Results)
            })
            .catch(error => {
                console.log("Fetch error: ", error)
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [name])

    // const manufacturerData = companyData?.map(item => {
    //     return (
    //         <div>
    //             <h1>{titleCase("address")}</h1>
    //             <h1>City</h1>
    //             <h1>Country: </h1>
    //         </div>
    //     )
    // })

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <h1 className="font-bold text-xl mb-8 text-center mt-8">Loading...</h1>
            </div>
        )
    }
    console.log(error)
    if (error) {
        return (
            <div className="flex flex-col justify-center items-center">
                <h1 className="font-bold text-3xl mb-8 text-center mt-8">There was an error loading this page</h1>
                <Link to="/" className="bg-black px-4 py-2 rounded text-xl hover:underline">
                    Return to home
                </Link>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center my-8 p-4 gap-y-12">
            <Link
                className="font-extrabold hover:underline text-2xl text-center"
                to=".."
                relative="path"
            >&larr; Back to company list</Link>
            <nav className="flex flex-col md:flex-row gap-8 text-center">
                <NavLink
                    className="font-medium hover:underline text-2xl
                    bg-black px-4 py-2 rounded"
                    to="."
                    end
                >
                    Details
                </NavLink>

                <NavLink
                    className="font-medium hover:underline text-2xl
                    bg-black px-4 py-2 rounded"
                    to="models"
                >
                    Models
                </NavLink>

                <NavLink
                    className="font-medium hover:underline text-2xl
                    bg-black px-4 py-2 rounded"
                    to="types"
                >
                    Types
                </NavLink>
            </nav>
            <Outlet context={{ companyData }} />
        </div>
    )
}