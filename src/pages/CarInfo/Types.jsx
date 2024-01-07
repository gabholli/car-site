import React from "react"
import { useEffect, useState } from "react"
import { useOutletContext, useParams } from "react-router-dom"

export default function Types() {

    const [types, setTypes] = useState([])
    const { name } = useParams()
    const [loading, setLoading] = useState(false)

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
                setLoading(false)
            })
            .catch(error =>
                console.log("Fetch error: ", error))
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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-full">
                <h1 className="font-bold text-xl mb-8 text-center mt-8">Loading...</h1>
            </div>
        )
    }

    return (
        <>
            {
                typeNumber[0] ?
                    <div className="flex flex-col gap-y-12">
                        <h1 className="text-xl font-bold text-center">
                            Types of Cars Manufactured by {name}:
                        </h1>
                        <div className="md:flex flex-wrap justify-center items-center text-center
                            gap-12 max-w-lg">
                            {companyTypes}
                        </div>
                    </div >
                    : <h1 className="font-bold text-xl mb-8 text-center mt-8">No types available</h1>
            }
        </>
    )

}