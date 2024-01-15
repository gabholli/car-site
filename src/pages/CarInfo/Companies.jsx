import React from "react"
import { useEffect, useState } from "react"
import { NavLink, Link } from "react-router-dom"

export default function Companies() {
    const [manufacturer, SetManufacturer] = useState([])
    const [page, setPage] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

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
            })
            .catch(error => {
                console.log("Fetch error: ", error)
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [page])

    const uniqueManufacturers = [...new Map(manufacturer?.map(item =>
        [item["Mfr_CommonName"], item])).values()]

    uniqueManufacturers?.sort((a, b) => {
        if (a.Mfr_CommonName?.toLowerCase() < b.Mfr_CommonName?.toLowerCase()) return -1
        if (a.Mfr_CommonName?.toLowerCase() > b.Mfr_CommonName?.toLowerCase()) return 1
        return 0
    })

    // if (loading) {
    //     return (
    //         <div className="flex justify-center items-center">
    //             <h1 className="font-bold text-xl mb-8 text-center mt-8">Loading...</h1>
    //         </div>
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
                <h1 className=" text-3xl mb-8 text-center mt-8">There was an error loading this page...</h1>
                <Link to="/" className="bg-black px-4 py-2 rounded text-xl hover:underline">
                    Return to home
                </Link>
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
                            className="hover:underline text-lg"
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
                    <input className="px-1 py-2 text-center bg-black"
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
                    bg-black px-4 py-2 rounded">
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