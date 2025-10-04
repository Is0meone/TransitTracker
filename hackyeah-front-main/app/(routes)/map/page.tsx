'use client'

import dynamic from 'next/dynamic'

import { FaMagnifyingGlass } from "react-icons/fa6"
import { LuTrainFront } from "react-icons/lu"

const MapWithNoSSR = dynamic(() => import("@/app/components/Map"), {
  ssr: false
})

const MapPage = () => {
    return(
        <div className="min-w-screen min-h-screen relative text-black">
            <div className="min-h-screen min-w-screen z-0 absolute top-0 left-0">
                <MapWithNoSSR/>
            </div>
            <div className='absolute top-5 left-5 rounded-2xl w-96 bg-white/20 backdrop-blur-lg rounded-xl border border-white border-opacity-30 p-4 px-6 z-50 shadow'>
                <h1 className="flex flex-row items-center gap-2 mb-2">
                    <div className="gradient rounded-xl p-2 text-white">
                        <LuTrainFront/>
                    </div>
                    <div className="text-xl font-bold text-gray-800">
                        TransitTracker
                    </div>
                </h1>
                <div>
                    <input placeholder='skąd' type="text" className="text-sm rounded-2xl w-full border border-gray-50 py-1 px-2"/>
                </div>
                <div>
                    <input placeholder='dokąd' type="text" className="text-sm rounded-2xl w-full border border-gray-50 py-1 px-2"/>
                </div>
            </div>
        </div>
    )
}

export default MapPage