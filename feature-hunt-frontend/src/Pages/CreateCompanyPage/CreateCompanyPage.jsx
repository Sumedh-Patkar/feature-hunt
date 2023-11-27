import React, { useState } from "react";
import {
  Textarea,
  Button,
  SimpleGrid,
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/NavBar";
import { FeedCard } from "../../components/FeedCard/FeedCard";

export const CreateCompanyPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Company created:", { name, description, keywords });
  };

  const backgroundColor = useColorModeValue("green.50", "green.800");
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
        borderColor={`green.500`}
        borderRadius="md"
      >
        <Heading mb={6} textAlign="center" color="green.500">
          Create Company
        </Heading>
        <FormControl mb={4}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter company name"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>What does the company do?</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a brief description"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Keywords</FormLabel>
          <Input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Enter keywords (comma-separated)"
          />
        </FormControl>
        <Button colorScheme="green" onClick={handleSubmit}>
          Create
        </Button>
      </Box>
    </>
  );
};
