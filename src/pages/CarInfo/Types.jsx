import React from "react"
import { useEffect, useState } from "react"
import { useOutletContext, useParams } from "react-router-dom"

export default function Types() {

    const [types, setTypes] = useState([])
    const { name } = useParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/${name}?format=json`)
            .then(response => {
                if (!response.ok) {
                    throw Error("Data not available")
                }
                return response.json()
            })
            .then(data => {
                console.log(data)
                setTypes(data.Results)
            })
            .catch(error => {
                console.log("Fetch error: ", error)
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [name])

    const uniqueTypes = [...new Map(types?.map(item =>
        [item["VehicleTypeName"], item])).values()]

    uniqueTypes?.sort((a, b) => {
        if (a.VehicleTypeName?.toLowerCase() < b.VehicleTypeName?.toLowerCase()) return -1
        if (a.VehicleTypeName?.toLowerCase() > b.VehicleTypeName?.toLowerCase()) return 1
        return 0
    })

    const companyTypes = uniqueTypes?.map(item => {
        return (
            <>
                {
                    item.VehicleTypeName !== "Incomplete Vehicle" &&
                    <div key={item.VehicleTypeId}>
                        <p className="text-lg">{item.VehicleTypeName}</p>
                    </div>
                }
            </>
        )
    })

    const typeNumber = types?.map(item => item.VehicleTypeId)

    // if (loading) {
    //     return (
    //         <h1 className="font-bold text-xl mb-8 text-center mt-8">Loading...</h1>
    //     )
    // }

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path
                    fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                    <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite"
                        type="rotate" values="0 12 12;360 12 12" /></path></svg>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl mb-8 text-center mt-8">There was an error loading this page</h1>
                <Link to="/" className="bg-black px-4 py-2 rounded text-xl hover:underline">
                    Return to home
                </Link>
            </div>
        )
    }

    return (
        <>
            {
                typeNumber[0] ?
                    <div className="flex flex-col gap-y-12">
                        <h1 className="text-xl font-bold text-center">
                            Types of Vehicles Manufactured by {name}:
                        </h1>
                        <div className="md:flex flex-wrap justify-center items-center text-center
                            gap-12 max-w-lg">
                            {companyTypes}
                        </div>
                    </div>
                    : <h1 className="font-bold text-xl mb-8 text-center mt-8">No types available</h1>
            }
        </>
    )

}