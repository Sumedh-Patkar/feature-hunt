import React, { useEffect, useState } from "react";
import { Flex, SimpleGrid, Box, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/NavBar";
import { FeedCard } from "../../components/FeedCard/FeedCard";

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  function handleClick() {
    navigate("/dashboard");
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://127.0.0.1:5000/feed", {
          method: "GET",
        });
        if (!response.ok) {
          // Handle server error
          const errorData = await response.json();
          console.error("Server responded with error status:", response.status);
          console.error("Error data:", errorData);
          return;
        }

        const responseData = await response.json();
        console.log(responseData);
        setProducts(responseData.products);
      } catch (error) {
        console.error("Error during fetch:", error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar />

      <Box>
        <Box mt="2rem" ml="2rem">
          <Heading color="green" mb="1rem" size="2xl">
            Feed
          </Heading>
          <Text fontSize="1.2rem">Here are the latest Products!</Text>
        </Box>
      </Box>
      <Box p="2rem">
        <SimpleGrid columns={[2, null, 4]} spacing="20px">
          {products.map((product) => (
            <FeedCard
              id={product._id}
              name={product.name}
              description={product.description}
              image={product.image}
            />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};
