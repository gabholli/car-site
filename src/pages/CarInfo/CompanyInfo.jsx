import React from "react"
import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"

export default function CompanyDetail() {

    const { companyData } = useOutletContext()

    // function titleCase(word) {
    //     return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
    // }

    const manufacturerData = companyData?.map(item => {
        return (
            <div className="flex flex-col gap-4" key={item.Mfr_ID}>
                <h1 className="font-bold">Address: </h1>
                <p>{item.Address}</p>
                <h1 className="font-bold">City: </h1>
                <p>{item.City}</p>
                <h1 className="font-bold">Country: </h1>
                <p>{item.Country}</p>
            </div>
        )
    })



    return (
        <section className="m-auto">
            {manufacturerData}
        </section>
    )
}