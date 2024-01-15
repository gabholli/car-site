import React from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function Models() {
    const [models, setModels] = useState([])
    const { name } = useParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [activePage, setActivePage] = useState(1)

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
            })
            .catch(error => {
                console.log("Fetch error: ", error)
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
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

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = companyModels.slice(indexOfFirstItem, indexOfLastItem)
    const pageNumbers = []

    function paginate(pageNumber) {
        return setCurrentPage(pageNumber)
    }

    for (let i = 1; i <= Math.ceil(companyModels.length / itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    function handlePageClick(number) {
        setActivePage(number)
        paginate(number)
    }

    const tenItemList = pageNumbers.map(number => {
        return (
            <li
                className="hover:underline text-xl bg-black size-8 flex
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

    const modelNumber = models?.map(item => item.Model_ID)

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
                <h1 className=" text-3xl mb-8 text-center mt-8">There was an error loading this page</h1>
                <Link to="/" className="bg-black px-4 py-2 rounded text-xl hover:underline">
                    Return to home
                </Link>
            </div>
        )
    }

    return (
        <>  {
            modelNumber[0] ?
                (
                    <div className="flex flex-col gap-y-12 justify-center max-w-2xl">
                        <h1 className="text-xl font-bold text-center">
                            Models Manufactured by {name}:
                        </h1>
                        <div className="md:flex flex-wrap justify-center items-center text-center
                        gap-x-12 px-6 max-w-7xl min-h-64">
                            {currentItems}
                        </div>
                        <div>
                            <nav className="flex flex-col gap-y-12">
                                <h1 className="font-bold text-xl text-center">Pages:</h1>
                                <ul className="list-none flex flex-wrap justify-center gap-x-8 md:gap-x-6 
                            gap-y-12 cursor-pointer">
                                    {
                                        tenItemList
                                    }
                                </ul>
                            </nav>
                        </div>
                    </div >
                )
                : <h1 className="font-bold text-xl mb-8 text-center mt-8">No models available</h1>
        }
        </>
    )

}