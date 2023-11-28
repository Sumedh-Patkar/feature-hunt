import React from "react";
import { Flex, SimpleGrid, Box, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/NavBar";
import { FeedCard } from "../../components/FeedCard/FeedCard";

export const DashboardPage = () => {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/dashboard");
  }
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
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </SimpleGrid>
      </Box>
    </>
  );
};
