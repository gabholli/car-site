import React, { useState } from "react"
import { useOutletContext, useParams } from "react-router-dom"

export default function CompanyDetail() {

    const { name } = useParams()
    const { companyData } = useOutletContext()

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [activePage, setActivePage] = useState(1)


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
                            <div
                                className=""
                                key={item.Mfr_ID}>
                                <h1 className="text-center font-semibold text-lg underline mb-2">
                                    Location {index + 1}:
                                </h1>
                                <div className="flex flex-col max-[767px]:text-center px-2 md:p-0 gap-y-2 md:w-48 min-h-80">
                                    {item.Address && <h2 className="font-bold text-lg">Address: </h2>}
                                    {item.Address && <p className="">{item.Address}</p>}
                                    {item.City && <h2 className="font-bold text-lg">City: </h2>}
                                    {item.City && <p className="">{item.City}</p>}
                                    {item.StateProvince && <h2 className="font-bold text-lg">State/Province: </h2>}
                                    {item.StateProvince && <p className="">{item.StateProvince}</p>}
                                    {item.PostalCode && <h2 className="font-bold text-lg">Postal Code: </h2>}
                                    {item.PostalCode && <p className="">{item.PostalCode}</p>}
                                    {item.Country && <h2 className="font-bold text-lg">Country: </h2>}
                                    {item.Country && <p className="mb-12">{item.Country}</p>}

                                </div>
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

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = manufacturerData.slice(indexOfFirstItem, indexOfLastItem)
    const pageNumbers = []

    function paginate(pageNumber) {
        return setCurrentPage(pageNumber)
    }

    for (let i = 1; i <= Math.ceil(manufacturerData.length / itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    function handlePageClick(number) {
        setActivePage(number)
        paginate(number)
    }

    const tenItemList = pageNumbers.map(number => {
        return (
            <li
                className="hover:underline text-xl bg-orange-200 size-8 flex
                    justify-center items-center"
                key={number}
            >
                <a
                    onClick={() => {
                        handlePageClick(number)
                        paginate(number)
                    }}
                >
                    {number}
                </a>
            </li>
        )
    })

    const locationId = companyData?.map(item => item.Mfr_ID)

    return (
        <>
            {
                locationId[0] ?
                    (
                        <div className="flex flex-col gap-y-12">
                            <section className="flex flex-col gap-y-12">
                                <h1 className="font-bold text-xl text-center">
                                    {name} Locations:</h1>
                                <div className="md:flex flex-wrap justify-center gap-x-6">
                                    {currentItems}
                                </div>
                            </section>
                            <div>
                                <nav className="flex flex-col gap-y-12">
                                    <h1 className="font-bold text-xl text-center">Pages:</h1>
                                    <ul className="list-none flex flex-wrap justify-center gap-x-8 md:gap-x-6 
                                    gap-y-4 cursor-pointer">
                                        {
                                            tenItemList
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>

                    )
                    : <h1 className="font-bold text-xl mb-8 text-center mt-8">No locations available</h1>
            }
        </>
    )
}