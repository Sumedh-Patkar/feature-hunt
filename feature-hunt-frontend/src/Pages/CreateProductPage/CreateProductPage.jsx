import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar/NavBar";

export const CreateProductPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Product created:", { name, description, tags, company });
  };

  const backgroundColor = useColorModeValue("green.50", "green.800");
  const buttonColorScheme = "green";

  return (
    <>
      <Navbar />
      <Box
        p={8}
        maxW="500px"
        mx="auto"
        mt={16}
        backgroundColor={backgroundColor}
        border="1px"
        borderColor={`${buttonColorScheme}.500`}
        borderRadius="md"
      >
        <Heading mb={6} textAlign="center" color={`${buttonColorScheme}.500`}>
          Create Product
        </Heading>
        <FormControl mb={4}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a brief description"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Tags</FormLabel>
          <Input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags (comma-separated)"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Company</FormLabel>
          <Select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Select company"
          >
            {/* Option values can be dynamically populated based on your data */}
            <option value="company1">Company 1</option>
            <option value="company2">Company 2</option>
            <option value="company3">Company 3</option>
          </Select>
        </FormControl>
        <Button colorScheme={buttonColorScheme} onClick={handleSubmit}>
          Create
        </Button>
      </Box>
    </>
  );
};
