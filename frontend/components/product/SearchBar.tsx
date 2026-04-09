"use client"

import { Search } from "lucide-react";
import { useEffect, useState } from "react";


interface Props {
    onSearch: (query: string) => void;
}

export default function SearchBar({onSearch}:Props){
    const [searchTerm, setSearchTerm] = useState("");

    // Debounce search input
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            onSearch(searchTerm.trim())
        }, 500);

        return ()=> clearTimeout(timeout);
    },[searchTerm,onSearch]);

    return(
         <div className="flex items-center bg-white rounded-lg px-3 py-2 shadow w-full max-w-md mb-4">
      <Search className="text-gray-400 mr-2" size={20} />
      <input
        type="text"
        placeholder="Search products..."
        className="w-full outline-none text-gray-700"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    );
}