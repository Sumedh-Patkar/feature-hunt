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

export const FeedCard = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/product/1");
  };
  return (
    <Card
      onClick={handleNavigate}
      bgColor="gray.100"
      variant="outline"
      maxW="sm"
    >
      <CardBody>
        <Image
          src="https://mspoweruser.com/wp-content/uploads/2023/04/meta-instagram-icon-set-editorial-metaverse-concept-free-vector.jpg"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">Instagram</Heading>
          <Text>
            Instagram is an American photo and video sharing social networking
            service owned by Meta Platforms.
          </Text>
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
