import React from "react"
import { useEffect, useState } from "react"
import { useOutletContext, useParams } from "react-router-dom"

export default function Models() {
    const [models, setModels] = useState([])
    const { name } = useParams()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${name}?format=json`)
            .then(response => {
                if (!response.ok) {
                    throw Error("Data not available")
                }
                return response.json()
            })
            .then(data => {
                console.log(data)
                setModels(data.Results)
                setLoading(false)
            })
            .catch(error =>
                console.log("Fetch error: ", error))
    }, [name])

    const uniqueModels = [...new Map(models?.map(item =>
        [item["Model_Name"], item])).values()]

    uniqueModels?.sort((a, b) => {
        if (a.Model_Name?.toLowerCase() < b.Model_Name?.toLowerCase()) return -1
        if (a.Model_Name?.toLowerCase() > b.Model_Name?.toLowerCase()) return 1
        return 0
    })

    const companyModels = uniqueModels?.map(item => {
        return (
            <div key={item.Model_ID}>
                <p className="text-lg">{item.Model_Name}</p>
            </div>
        )
    })

    const modelNumber = models?.map(item => item.Model_ID)

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <h1 className="font-bold text-xl mb-8 text-center mt-8">Loading...</h1>
            </div>
        )
    }

    return (
        <>  {
            modelNumber[0] ?
                (<div className="flex flex-col gap-4">
                    <h1 className="text-xl font-bold text-center my-4">Models for {name}:</h1>
                    <div className="md:flex flex-wrap justify-center items-center text-center
                    mb-6 px-6 gap-8 max-w-7xl">
                        {companyModels}
                    </div>
                </div >)
                : <h1 className="font-bold text-xl mb-8 text-center mt-8">No models available</h1>
        }
        </>
    )

}