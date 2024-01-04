import React from "react"
import { useEffect, useState } from "react"
import { NavLink, useParams, Outlet, Link } from "react-router-dom"

export default function CompanyDetail() {
    const { id } = useParams()
    const [companyData, setCompanyData] = useState([])

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
                setCompanyData(data.Results)
            })
            .catch(error =>
                console.log("Fetch error: ", error))
    }, [id])

    // const manufacturerData = companyData?.map(item => {
    //     return (
    //         <div>
    //             <h1>{titleCase("address")}</h1>
    //             <h1>City</h1>
    //             <h1>Country: </h1>
    //         </div>
    //     )
    // })
    console.log(companyData)

    return (
        <div className="flex flex-col items-center p-4 gap-8">
            <Link
                className="font-extrabold hover:underline"
                to=".."
                relative="path"
            >&larr; Back to company list</Link>
            <nav className="flex gap-8">
                <NavLink
                    className="font-medium hover:underline"
                    to="."
                    end
                >
                    Details
                </NavLink>
            </nav>
            <Outlet context={{ companyData }} />
        </div>
    )
}