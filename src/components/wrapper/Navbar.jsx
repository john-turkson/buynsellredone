"use client";

import {
  Box,
  Flex,
  Button,
  Text,
  useDisclosure,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { HiBars3 } from "react-icons/hi2";
import { HiX } from "react-icons/hi";
import DesktopNav from "./DesktopNav";
import Link from "next/link";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg="white"
        color="gray.600"
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"gray.200"}
        align={"center"}
        h={16}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <HiX w={5} h={5} /> : <HiBars3 w={3} h={3} />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        
        <Flex flex={{ base: 1 }} align="center" justify={{ base: "center", md: "start" }}>
          <Link href='/'>
            <Text textStyle={"lg"} fontWeight="bold" color={"gray.800"}>
              BuynSell
            </Text>
          </Link>
          
          {/* Move DesktopNav here for alignment with the logo */}
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Link href="/sign-in">
            <Button
              fontSize={"md"}
              fontWeight={'semibold'}
              p={2}
              variant={"link"}
            >
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"md"}
              fontWeight={"semibold"}
              p={2}
              color={"white"}
              bg={"pink.400"}
              _hover={{
                bg: "pink.300",
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Stack>
      </Flex>
      
    </Box>
  );
}
