import React from "react"
import { useEffect, useState } from "react"
import { NavLink, useParams, Outlet, Link } from "react-router-dom"

export default function CompanyDetail() {
    const { name } = useParams()
    const [companyData, setCompanyData] = useState([])
    const [loading, setLoading] = useState(false)

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
                setLoading(false)
            })
            .catch(error =>
                console.log("Fetch error: ", error))
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
        return <h1 className="font-bold text-xl mb-8 text-center mt-8">Loading...</h1>
    }

    return (
        <div className="flex flex-col items-center p-4 gap-4">
            <Link
                className="font-extrabold hover:underline text-2xl mt-4 mb-6"
                to=".."
                relative="path"
            >&larr; Back to company list</Link>
            <nav className="flex gap-8">
                <NavLink
                    className="font-medium hover:underline text-2xl
                    bg-orange-200 px-4 py-2 rounded "
                    to="."
                    end
                >
                    Details
                </NavLink>

                <NavLink
                    className="font-medium hover:underline text-2xl
                    bg-orange-200 px-4 py-2 rounded "
                    to="models"
                >
                    Models
                </NavLink>
            </nav>
            <Outlet context={{ companyData }} />
        </div>
    )
}