import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import debounce from 'lodash/debounce'; // Import lodash debounce

function SelectDuration({ onUserSelect }) {

    // Debounced function to handle duration selection
    const handleSelect = debounce((value) => {
        onUserSelect('duration', value);  // Pass the duration to the parent via onUserSelect
    }, 300);  // 300ms debounce delay

    return (
        <div className="mt-5">
            <h2 className="font-bold text-xl text-primary">Select Duration</h2>
            <p className="text-gray-500">Select the duration of your video</p>
            <Select
                onValueChange={(value) => handleSelect(value)}  // Debounced handler
            >
                <SelectTrigger className="w-full mt-2 p-6 text-lg">
                    <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="30 seconds">30-60 seconds</SelectItem>
                    <SelectItem value="60 seconds">60-90 seconds</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

export default SelectDuration;
