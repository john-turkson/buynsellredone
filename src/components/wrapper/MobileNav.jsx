import React from 'react'
import Link from 'next/link'
import {Box, Stack, Link as ChakraLink } from "@chakra-ui/react";

export default function MobileNav() {
  return (
    <Box pb={4} display={{ md: "none" }}>
            <Stack as="ul" spacing={4}>
                <Link href="/" passHref>
                    <ChakraLink>Home</ChakraLink>
                </Link>
                <Link href="/about" passHref>
                    <ChakraLink>About</ChakraLink>
                </Link>
                <Link href="/contact" passHref>
                    <ChakraLink>Contact</ChakraLink>
                </Link>
            </Stack>
        </Box>
  )
}
