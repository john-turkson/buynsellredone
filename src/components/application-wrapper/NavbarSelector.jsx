'use client'

import React from 'react'
import { useAuthStore } from '@/lib/stores/useAuthStore'
import ProfileNavbar from './ProfileNavbar'
import Navbar from './Navbar'

export default function NavbarSelector() {

    const { isAuthenticated } = useAuthStore();

  return (
    isAuthenticated? <ProfileNavbar /> : <Navbar />
  )
}
