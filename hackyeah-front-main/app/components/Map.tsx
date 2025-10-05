'use client'

import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.js"
import "leaflet/dist/leaflet.css"
import {ReactElement, useLayoutEffect, useState} from "react"
import Spinner from "@/app/components/Spinner"

const MAP_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
const MAP_ATTRIBUTION = '&copy; Transit, <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

type Props = {
    children?: ReactElement | string
}

const Map = ({children}: Props) => {
    const [unmountMap, setUnmountMap] = useState(false);

    useLayoutEffect(() => {
        setUnmountMap(false);
        return () => {
            setUnmountMap(true);
        };
    }, [])

    return(
        <div className={"min-w-screen min-h-screen relative top-0 left-0"}>
            {
                !unmountMap ?
                    <MapContainer center={[50.0589, 19.9379]} zoom={16} zoomControl={false} scrollWheelZoom={true} className="min-h-screen min-w-screen">
                        <TileLayer
                            url={MAP_URL}
                            attribution={MAP_ATTRIBUTION}
                        />
                        {children}
                    </MapContainer> :
                    <div className={"flex items-center justify-center"}>
                        <Spinner/>
                    </div>
            }
        </div>
    )
}

export default Map