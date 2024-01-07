import React from "react"
import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"

export default function CompanyDetail() {

    const { companyData } = useOutletContext()

    // function titleCase(word) {
    //     return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
    // }

    function allNull(address, city, country) {
        return address === null && city === null && country === null
    }

    const manufacturerData = companyData
        .sort((a, b) => {
            if (a.Country?.toLowerCase() < b.Country?.toLowerCase()) return -1
            if (a.Country?.toLowerCase() > b.Country?.toLowerCase()) return 1
            return 0
        })
        .map((item, index) => {
            return (
                <>
                    {!allNull(item.Address, item.City, item.Country) ?
                        (
                            <div className="flex flex-col gap-y-2 w-48" key={item.Mfr_ID}>
                                <h1 className="text-center font-semibold text-lg underline mb-2">
                                    Location {index + 1}:
                                </h1>
                                {item.Address && <h2 className="font-bold text-lg">Address: </h2>}
                                {item.Address && <p className="">{item.Address}</p>}
                                {item.City && <h2 className="font-bold text-lg">City: </h2>}
                                {item.City && <p className="">{item.City}</p>}
                                {item.Country && <h2 className="font-bold text-lg">Country: </h2>}
                                {item.Country && <p className="mb-4">{item.Country}</p>}
                            </div>
                        )
                        :
                        <div className="flex flex-col gap-y-2 w-48" key={item.Mfr_ID}>
                            <h1 className="text-center font-semibold text-lg underline mb-2">
                                Location {index + 1}:
                            </h1>
                            <h2 className="text-center text-lg">No data currently</h2>
                        </div>
                    }
                </>
            )
        })


    const locationName = companyData?.map(item => item.Mfr_CommonName)

    return (
        <>
            {
                locationName[0] ?
                    (
                        <section className="m-auto">
                            <h1 className="font-bold text-xl mb-8 mt-5 text-center">{locationName[0]} Locations:</h1>
                            <div className="md:flex flex-wrap justify-center gap-8">
                                {manufacturerData}
                            </div>
                        </section>
                    )
                    : <h1 className="font-bold text-xl mb-8 text-center mt-8">No locations available</h1>
            }
        </>
    )
}