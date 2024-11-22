'use client';

import React, { useEffect, useState } from 'react';
import ListingItem from './components/ListingItem';
import { useCart } from '@/context/CartContext';

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // Sample listings for testing
    const sampleListings = [
      {
        _id: '1',
        name: 'Fan',
        price: 10,
        description: 'Basic fan.',
      },
      {
        _id: '2',
        name: 'Lamp',
        price: 15,
        description: 'Bright desk lamp.',
      },
      {
        _id: '3',
        name: 'Chair',
        price: 25,
        description: 'Comfortable office chair.',
      },
      {
        _id: '4',
        name: 'Table',
        price: 50,
        description: 'Wooden dining table.',
      },
      {
        _id: '5',
        name: 'Bookshelf',
        price: 35,
        description: 'Tall bookshelf for storage.',
      },
    ];

    setListings(sampleListings);
  }, []);

  return (
    <div className="listings-container">
      <h1 className="text-3xl font-bold mb-4">Listings</h1>
      {listings.length === 0 ? (
        <p>No listings available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map((listing) => (
            <ListingItem key={listing._id} listing={listing} addToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingsPage;
