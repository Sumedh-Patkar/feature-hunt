import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Badge,
  Stack,
  Divider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Center,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar/NavBar";

export const ProductPage = () => {
  // Placeholder data
  const initialFeatureState = {
    name: "",
    description: "",
    tags: "",
  };

  const [productData, setProductData] = useState({
    createdBy: "Company ABC",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor felis ut est placerat, id luctus nisi convallis.",
    tags: "Tag1 Tag2 Tag3",
    imageUrl:
      "https://mspoweruser.com/wp-content/uploads/2023/04/meta-instagram-icon-set-editorial-metaverse-concept-free-vector.jpg", // Replace with the actual image URL
    features: [
      {
        name: "Feature 1",
        description: "Description for Feature 1",
        tags: "",
      },
      {
        name: "Feature 2",
        description: "Description for Feature 2",
        tags: "",
      },
    ],
  });

  const [isFeaturesModalOpen, setIsFeaturesModalOpen] = useState(false);
  const [newFeature, setNewFeature] = useState({ ...initialFeatureState });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        let windowUrl = window.location.href.split("/");
        let productId = windowUrl[windowUrl.length - 1];
        console.log("product ID = ");
        console.log(productId);
        const response = await fetch(
          "http://127.0.0.1:5000/getProduct/" + productId,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Add any other headers as needed
            },
          },
        );
        if (!response.ok) {
          // Handle server error
          const errorData = await response.json();
          console.error("Server responded with error status:", response.status);
          console.error("Error data:", errorData);
          return;
        }
        // Do something with the response
        const responseData = await response.json();
        console.log("Got Product Details successfully:");
        console.log(responseData);
        setProductData(responseData);
      } catch (error) {
        console.error("Error during fetch:", error.message);
      }
    };

    fetchProductDetails();
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  const openFeaturesModal = () => {
    setIsFeaturesModalOpen(true);
  };

  const closeFeaturesModal = () => {
    setIsFeaturesModalOpen(false);
    setNewFeature({ ...initialFeatureState });
  };

  const handleAddFeature = async () => {
    // Validate the form fields
    console.log("handling feature addition");
    console.log(newFeature);
    // Display an error message or take appropriate action
    console.log(newFeature.name);
    console.log(newFeature.description);

    try {
      let windowUrl = window.location.href.split("/");
      let productId = windowUrl[windowUrl.length - 1];
      console.log("product ID = ");
      console.log(productId);
      const response = await fetch(
        "http://127.0.0.1:5000/suggestfeature/" + productId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers as needed
          },
          body: JSON.stringify({
            name: newFeature.name,
            description: newFeature.description,
          }),
        },
      );
      if (!response.ok) {
        // Handle server error
        const errorData = await response.json();
        console.error("Server responded with error status:", response.status);
        console.error("Error data:", errorData);
        return;
      }
      // Do something with the response
      const responseData = await response.json();
      console.log("Feature suggestion successful:", responseData);

      setProductData((prevProductData) => ({
        ...prevProductData,
        features: [...prevProductData.features, newFeature],
      }));

      setIsFeaturesModalOpen(false);
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }

    // Close the modal
    // closeFeaturesModal();
  };

  const backgroundColor = useColorModeValue("green.100", "green.800");
  const badgeColorScheme = "green";

  return (
    <>
      <Navbar />
      <Heading mt={4} textAlign="center" color={`${badgeColorScheme}.500`}>
        Product Details
      </Heading>
      <Box
        p={8}
        maxW="800px"
        mx="auto"
        mt={16}
        border="1px"
        borderColor={`green.500`}
        backgroundColor={backgroundColor}
        borderRadius="md"
      >
        <Heading
          fontSize={26}
          mb={4}
          textAlign="center"
          color={`${badgeColorScheme}.500`}
        >
          Instagram
        </Heading>
        <Center textAlign="center">
          <Image
            src={productData.image_link}
            alt="Product Image"
            mb={4}
            maxH={150}
            borderRadius="md"
          />
        </Center>
        <Box mb={4}>
          <Text fontWeight="bold">Created By (Company):</Text>
          <Text>{productData.company_name}</Text>
        </Box>
        <Box mb={4}>
          <Text fontWeight="bold">Description:</Text>
          <Text>{productData.description}</Text>
        </Box>
        <Box mb={4}>
          <Text fontWeight="bold">Tags:</Text>
          <Badge colorScheme={badgeColorScheme} mr={2}>
            {productData.tags}
          </Badge>
        </Box>
        <Divider my={4} />
        <Heading fontSize={24} mb={4} color={`${badgeColorScheme}.500`}>
          Features
        </Heading>
        <Stack spacing={4}>
          {productData.features.map((feature, index) => (
            <Box
              key={index}
              p={4}
              borderWidth="1px"
              borderColor="green.300"
              borderRadius="md"
            >
              <Text fontWeight="bold">Name:</Text>
              <Text>{feature.name}</Text>
              <Text fontWeight="bold">Description:</Text>
              <Text>{feature.description}</Text>
            </Box>
          ))}
        </Stack>
        <Button
          mt={4}
          colorScheme={badgeColorScheme}
          onClick={openFeaturesModal}
        >
          Add Feature
        </Button>

        {/* Features Modal */}
        <Modal isOpen={isFeaturesModalOpen} onClose={closeFeaturesModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Feature</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={newFeature.name}
                  onChange={(e) =>
                    setNewFeature({ ...newFeature, name: e.target.value })
                  }
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={newFeature.description}
                  onChange={(e) =>
                    setNewFeature({
                      ...newFeature,
                      description: e.target.value,
                    })
                  }
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme={badgeColorScheme} onClick={handleAddFeature}>
                Add Feature
              </Button>
              <Button colorScheme="gray" ml={2} onClick={closeFeaturesModal}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};
