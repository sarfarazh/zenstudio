"use client";
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';

function SelectTopic({ onUserSelect }) {
  const options = ['Custom Prompt', 'Scary Story', 'Historical Facts', 'Motivational', 'Fun Facts'];
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <div>
      <h2 className='font-bold text-xl text-primary'>Select Topic</h2>
      <p className='text-gray-500'>What is the topic of your video?</p>

      {/* Topic Selection */}
      <Select
        onValueChange={(value) => {
          setSelectedOption(value);
          if (value !== "Custom Prompt") {
            onUserSelect('topic', value);  // Predefined prompt
          }
        }}
      >
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Select Content Type" />
        </SelectTrigger>
        <SelectContent>
          {options.map((item, index) => (
            <SelectItem key={index} value={item}>{item}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Custom Prompt Input */}
      {selectedOption === "Custom Prompt" && (
        <Textarea
          className="mt-3"
          placeholder="Write your own prompt for the video"
          maxLength={200} // Limit to 200 characters for example
          onChange={(e) => onUserSelect('topic', e.target.value)}  // Pass the custom prompt
        />
      )}
    </div>
  );
}

export default SelectTopic;
