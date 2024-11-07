"use client";

import { Box, Button, Fieldset, Input, Stack, Heading } from "@chakra-ui/react";
import { Field } from "@/components/chakra-ui/field";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/chakra-ui/native-select";

export default function SignIn() {
  return (
    <div className="flex items-start justify-center min-h-screen py-8 my-8">
      <Fieldset.Root size="lg" maxW="lg">
        <Stack>
          <Heading
            textAlign={"center"}
            fontSize={"3xl"}
            fontWeight={"bold"}
            py={8}
          >
            Sign in to your account
          </Heading>

          <Box rounded={"lg"} p={8}>

            <Fieldset.Content>
              <Field label="Email Address">
                <Input
                  name="email"
                  type="email"
                  placeholder="me@example.com"
                  className="border border-gray-300 px-2"
                />
              </Field>

              <Field label="Password">
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter your Password"
                />
              </Field>
              
            </Fieldset.Content>

          </Box>
        </Stack>
      </Fieldset.Root>
    </div>
  );
}
