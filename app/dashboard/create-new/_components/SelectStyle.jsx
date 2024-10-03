import React, { useState } from 'react';
import Image from 'next/image';
import debounce from 'lodash/debounce'; // Import lodash debounce

function SelectStyle({ onUserSelect }) { // Destructure onUserSelect from props

    const styleOptions = [
        {
            name: "Realistic",
            image: "/realistic.png"
        },
        {
            name: "GTA",
            image: "/gta.png"
        },
        {
            name: "Surrealism",
            image: "/surrealism.png"
        },
        {
            name: "Renaissance",
            image: "/renaissance.png"
        },
        {
            name: "Ink",
            image: "/ink.png"
        }
    ];

    const [selectedOption, setSelectedOption] = useState(null);

    // Debounced function to handle style selection
    const handleSelect = debounce((name) => {
        setSelectedOption(name);
        if (onUserSelect) {
            onUserSelect('imageStyle', name); // Pass image style to parent via onUserSelect
        }
    }, 300); // 300ms debounce delay

    return (
        <div className='mt-5'>
            <h2 className='font-bold text-xl text-primary'>Select Style</h2>
            <p className='text-gray-500'>Select your video style</p>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
                {styleOptions.map((item, index) => (
                    <div 
                        key={index} 
                        className={`relative hover:scale-105 
                        transition-all cursor-pointer
                        ${selectedOption === item.name ? 'border-4 border-cyan-500 rounded-xl' : ''}
                        `}
                        onClick={() => handleSelect(item.name)} // Debounced handleSelect on click
                    >
                        <Image 
                            src={item.image} 
                            width={100} 
                            height={100} 
                            className='h-96 object-cover rounded-lg w-full' 
                        />
                        <h2 className='absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg'>
                            {item.name}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SelectStyle;
