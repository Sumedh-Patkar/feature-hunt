import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

export const CreateProductPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [companyNames, setCompanyNames] = useState([]);
  const [company, setCompany] = useState('');

  useEffect(() => {
    const getCompanyNames = async () => {
      const names = await fetchCompanyNames();
      setCompanyNames(names);
    };

    getCompanyNames();
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  const handleSubmit = async () => {
    // Handle form submission logic here
    // Handle form submission logic here
    try {
      console.log("Creating product:");
      console.log(name)
      console.log(description)
      console.log(tags)
      console.log(company)
      try {
        const response = await fetch("http://127.0.0.1:5000/addproduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers as needed
          },
          body: JSON.stringify({
            name,
            description,
            tags,
            company
          }),
        });
        if (!response.ok) {
          // Handle server error
          const errorData = await response.json();
          console.error("Server responded with error status:", response.status);
          console.error("Error data:", errorData);
          return;
        }
        // Do something with the response
        const responseData = await response.json();
        console.log("Creation successful:", responseData);
        console.log("Product created:", { name, description, tags, company });
        // Handle the response as needed
        console.log(response.data);
        // onLoginClose();
        navigate("/feed");
      } catch (error) {
        console.error("Error during fetch:", error.message);
      }
      // Redirect or perform other actions based on the response
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error("Creation error:", error);
    }
  };

  const backgroundColor = useColorModeValue("green.50", "green.800");
  const buttonColorScheme = "green";

  const fetchCompanyNames = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/getcompanies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers as needed
        },
      });
      if (!response.ok) {
        // Handle server error
        const errorData = await response.json();
        console.error("Server responded with error status:", response.status);
        console.error("Error data:", errorData);
        return;
      }
      // Do something with the response
      const responseData = await response.json();
      console.log("Got Companies list successfully:");
      console.log(responseData)
      let companiesList = responseData.map((i) => {
        return i['name']
      });

      return companiesList;
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }
  }

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
            {companyNames.map((companyName) => (
              <option key={companyName} value={companyName}>
                {companyName}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button colorScheme={buttonColorScheme} onClick={handleSubmit}>
          Create
        </Button>
      </Box>
    </>
  );
};
