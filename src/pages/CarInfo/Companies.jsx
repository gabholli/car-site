import React from "react"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

export default function Companies() {
    const [manufacturer, SetManufacturer] = useState([])
    const [page, setPage] = useState("")
    const [loading, setLoading] = useState(false)

    function handleSubmit(event) {
        event.preventDefault()
        setPage(event.target.pageNumber.value)
    }

    // function handleChange(event) {
    //     event.preventDefault()
    //     setPage({ [event.target.name]: event.target.value })
    //     console.log(page)
    // }

    useEffect(() => {
        setLoading(true)
        fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json&page=${page}`)
            .then(response => {
                if (!response.ok) {
                    throw Error("Data not available")
                }
                return response.json()
            })
            .then(data => {
                console.log(data.Results)
                SetManufacturer(data.Results)
                setLoading(false)
            })
            .catch(error =>
                console.log("Fetch error: ", error))
    }, [page])

    const uniqueManufacturers = [...new Map(manufacturer?.map(item =>
        [item["Mfr_CommonName"], item])).values()]

    uniqueManufacturers?.sort((a, b) => {
        if (a.Mfr_CommonName?.toLowerCase() < b.Mfr_CommonName?.toLowerCase()) return -1
        if (a.Mfr_CommonName?.toLowerCase() > b.Mfr_CommonName?.toLowerCase()) return 1
        return 0
    })

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-full">
                <h1 className="font-bold text-xl mb-8 text-center mt-8">Loading...</h1>
            </div>
        )
    }

    const manufacturerInfo = uniqueManufacturers.map(item => {
        return (
            <>
                {
                    item.Mfr_CommonName &&
                    <div key={item.Mfr_ID} className="text-center">
                        <NavLink
                            className="hover:underline font-medium"
                            to={`${item.Mfr_CommonName}`}>
                            {item.Mfr_CommonName}
                        </NavLink>
                    </div>
                }
            </>
        )
    })

    return (
        <div className="flex flex-col items-center gap-8 px-8 pb-10">
            <div className="flex justify-center items-center gap-6 mt-10">
                <form className="flex gap-8" onSubmit={handleSubmit}>
                    <input className="px-1 py-2 text-center bg-gray-700"
                        type="number"
                        // placeholder="Enter page number"
                        // onChange={handleChange}
                        name="pageNumber"
                        // value={page.pageNumber}
                        defaultValue="1"
                        min="1"
                        max="3"
                    >
                    </input>
                    <button className="font-medium hover:underline text-2xl
                    bg-gray-700 px-4 py-2 rounded">
                        Go to page
                    </button>
                </form>
            </div>
            <h1 className="text-2xl text-center font-bold my-2">Choose a company:</h1>
            <nav className="grid md:grid-cols-3 gap-y-6 md:gap-y-2 gap-x-6 justify-items-center">
                {manufacturerInfo}
            </nav>
        </div>
    )
}