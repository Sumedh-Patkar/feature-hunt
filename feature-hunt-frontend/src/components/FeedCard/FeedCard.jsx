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

export const FeedCard = ({
  id,
  name,
  description,
  image,
  likes_count,
  dislikes_count,
}) => {
  const [like, setLike] = React.useState(likes_count);
  const [dislike, setDislike] = React.useState(dislikes_count);
  const [isLiked, setIsLiked] = React.useState(false);
  const [isDisliked, setIsDisliked] = React.useState(false);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/product/${id}`);
  };

  const handleReaction = (reaction) => async () => {
    if (reaction === "like") {
      if (!isDisliked) {
        if (isLiked) {
          setIsLiked(false);
          await ReactionAPI("unlike");
        } else {
          setIsLiked(true);
          await ReactionAPI("like");
        }
      } 
      else {
        setIsDisliked(false);
        setIsLiked(true);
        await ReactionAPI("unlike");
        await ReactionAPI("like");
        
    
    // else if (reaction === "dislike" && !isLiked) {
    //   if (isDisliked) {
    //     setIsDisliked(false);
    //     await ReactionAPI("unlike");
    //   } else {
    //     setIsDisliked(true);
    //     await ReactionAPI("dislike");
    //   }
    // }
  };

  async function ReactionAPI(reaction) {
    try {
      const response = await fetch(`http://127.0.0.1:5000/${reaction}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers as needed
        },
        body: JSON.stringify({
          product_id: id,
          email: localStorage.getItem("email"),
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
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }
  }

  return (
    <Card bgColor="gray.100" variant="outline" maxW="sm">
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
            <Button
              onClick={handleReaction("like")}
              variant="ghost"
              colorScheme="green"
            >
              <AiOutlineLike />
            </Button>
            <Center ml="2">{like}</Center>
          </Flex>
          <Spacer />
          <Button variant="ghost" colorScheme="green">
            <AiOutlineDislike />
          </Button>
          <Center ml="2">{dislike}</Center>
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Button onClick={handleNavigate} colorScheme="green">
            View{" "}
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
