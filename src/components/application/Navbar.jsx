"use client";

import React from "react";
import Link from "next/link";
import { Box, Flex, Text } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <>
      <Box>
        <Flex bg="white, gray.200" color="gray.600, white" py={2} px={4}>
          <Link href='/Home'><Text textStyle="xl" fontWeight='bold' >BuynSell</Text></Link>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
