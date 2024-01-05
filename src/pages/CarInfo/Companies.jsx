import React from "react"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

export default function Companies() {
    const [manufacturer, SetManufacturer] = useState([])
    // const [page, setPage] = useState({
    //     pageNumber: ""
    // })

    // function handleChange(event) {
    //     event.preventDefault()
    //     setPage({ [event.target.name]: event.target.value })
    //     console.log(page)
    // }

    useEffect(() => {
        fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json&page=1`)
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
            .catch(error =>
                console.log("Fetch error: ", error))
    }, [])

    const uniqueManufacturers = [...new Map(manufacturer?.map(item =>
        [item["Mfr_CommonName"], item])).values()]

    uniqueManufacturers?.sort((a, b) => {
        if (a.Mfr_CommonName?.toLowerCase() < b.Mfr_CommonName?.toLowerCase()) return -1
        if (a.Mfr_CommonName?.toLowerCase() > b.Mfr_CommonName?.toLowerCase()) return 1
        return 0
    })

    const manufacturerInfo = uniqueManufacturers.map(item => {
        return (
            <>
                {
                    item.Mfr_CommonName &&
                    <div key={item.Mfr_ID}>
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
        <div className="flex flex-col items-center gap-8 pb-10" >
            {/* <form>
                <input className=""
                    type="number"
                    placeholder="Enter page number"
                    onChange={handleChange}
                    name="pageNumber"
                    value={page.pageNumber}
                >
                </input>
            </form> */}
            <h1 className="text-2xl text-center font-bold">Choose a company:</h1>
            <nav className="grid md:grid-cols-3 gap-y-2 gap-x-6">
                {manufacturerInfo}
            </nav>
        </div>
    )
}