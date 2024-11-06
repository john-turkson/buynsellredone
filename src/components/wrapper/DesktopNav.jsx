import Link from "next/link";
import { Flex, Link as ChakraLink, Button, Stack, Box, Text } from "@chakra-ui/react";

export default function DesktopNav() {
  return (
    <Stack spacing={6}>
        <Box py={2} justifyContent={'space-between'} alignItems={'center'}>
           <Link href='/listings'>
                <Text fontWeight={'semibold'} color={'gray.600'}>
                    View Listings
                </Text>
           </Link>
        </Box>
    </Stack>
  );
}
