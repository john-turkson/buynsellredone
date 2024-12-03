"use client";

import { useState } from "react";

export default function ShippingDropdown({ onCountryChange }) {
    const [selectedCountry, setSelectedCountry] = useState("CA");

    const handleChange = (e) => {
        const country = e.target.value;
        setSelectedCountry(country);
        // Call the parent function to pass the selected country
        onCountryChange(country);
    };

    return (
        <select
            className="pe-9 block w-24 border-gray-200 rounded-lg text-sm focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            defaultValue=""
            onChange={handleChange}
        >
            <option value="" disabled hidden>
                Select
            </option>
            <option value="CA">CA</option>
            <option value="US">US</option>
            <option value="GB">GB</option>
        </select>

    );
}
