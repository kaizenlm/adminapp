import React, { useEffect, useState } from 'react';


const MainMenu = () => {
    return (
        <div className="flex flex-col justify-center h-screen bg-inherit px-6 py-12 ">
            <div className="flex flex-col sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Smart Menu"
                    src="src\assets\Logo_V1.svg"
                    className="mx-auto h-25 w-auto"
                />
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-10 rounded">
                    Button
                </button>
            </div>

        </div>
    )

}

export default MainMenu