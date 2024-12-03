'use client'

import ItemToggle from "./ItemToggle";
import ProductCard from "./ProductCard";
import React, { useState } from 'react';


export default function ProductsList({ products, userId, usersMap }) {

    const [hideMyListings, setHideMyListings] = useState(false); // State for filtering

    // Handle the toggle change from the child
    const handleToggleChange = (value) => {
        setHideMyListings(value);
    };

    // Filter listings based on the toggle state
    const filteredListings = hideMyListings
        ? products.filter((product) => product.user !== userId) // Exclude user's listings
        : products;

    // Function to find the user by product.user value
    const findUserForProduct = (productUserId) => {
        // Loop through usersMap to find the user with the matching id
        for (let key in usersMap) {
            if (usersMap[key].id === productUserId) {
                return usersMap[key]; // Return the user object
            }
        }
        return null; 
    };

    return (
        <div className="max-w-[85rem] mx-auto px-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold mb-6 pt-6">BuynSell Catalogue</h1>
                <ItemToggle onToggleChange={handleToggleChange} />
            </div>
            <div className="flex flex-wrap justify-between gap-4 pt-6 pb-12">
                {filteredListings.length > 0 ? (
                    filteredListings.map((product) => {

                         // Find the user for the current product
                        const user = findUserForProduct(product.user);                        

                        return (
                            <ProductCard
                                product={product}
                                key={product._id}
                                userDetails={user} 
                            />
                        );
                    })
                ) : (
                    <p>No listings available</p>
                )}
            </div>
        </div>
    );
}
