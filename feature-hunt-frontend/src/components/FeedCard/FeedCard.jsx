import React from "react";
import {
  Center,
  Box,
  Heading,
  Text,
  Button,
  Card,
  Divider,
  CardBody,
  Stack,
  Image,
  CardFooter,
  ButtonGroup,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

export const FeedCard = ({ id, name, description, image }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/product/${id}`);
  };
  return (
    <Card
      onClick={handleNavigate}
      bgColor="gray.100"
      variant="outline"
      maxW="sm"
    >
      <CardBody>
        <Center>
          <Image
            src={image}
            maxH={100}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
        </Center>
        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>
          <Text>{description}</Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing="2">
          <Flex>
            <Button variant="ghost" colorScheme="green">
              <AiOutlineLike />
            </Button>
            <Center ml="2">2</Center>
          </Flex>
          <Spacer />
          <Button variant="ghost" colorScheme="green">
            <AiOutlineDislike />
          </Button>
          <Center ml="2">5</Center>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
