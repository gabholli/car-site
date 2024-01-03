import React from "react"
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"

export default function Dashboard() {
    return (
        <div>
            <Outlet />
            <h1>Cars here</h1>
        </div>
    )
}