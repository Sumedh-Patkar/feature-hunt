import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  useDisclosure,
  Box,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  AxiosProvider,
  Request,
  Get,
  Delete,
  Head,
  Post,
  Put,
  Patch,
  withAxios,
} from "react-axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();

  const {
    isOpen: isOpenSignup,
    onOpen: onOpenSignup,
    onClose: onCloseSignup,
  } = useDisclosure();

  function handleClick() {
    navigate("/dashboard");
  }
  const LoginModal = () => {
    return (
      <Modal
        isOpen={isLoginOpen}
        onClose={onLoginClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4} id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="username" />
            </FormControl>
            <FormControl mb={4} id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
              <FormHelperText>(We'll never share your email)</FormHelperText>
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onLoginClose}>
              Login
            </Button>
            <Button onClick={onLoginClose} variant="ghost">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const SignupModal = () => {
    return (
      <Modal
        isOpen={isOpenSignup}
        onClose={onCloseSignup}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Signup</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4} id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="username" />
            </FormControl>
            <FormControl mb={4} id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
              <FormHelperText>(We'll never share your email)</FormHelperText>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3}>
              Signup
            </Button>
            <Button onClick={onCloseSignup} variant="ghost">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  //   const handleSignup = async () => {
  //     try {
  //       const response = await axios.post("http://localhost:5000/signup", {
  //         name,
  //         email,
  //         password,
  //       });

  //       // Handle the response as needed
  //       console.log(response.data);
  //       localStorage.setItem("name", response.data.name);
  //       localStorage.setItem("email", response.data.email);
  //       onCloseSignupse();
  //       navigate("/dashboard");
  //       // Redirect or perform other actions based on the response
  //     } catch (error) {
  //       // Handle errors, e.g., display an error message to the user
  //       console.error("Signup error:", error);
  //     }
  //   };

  return (
    <>
      <Box
        backgroundImage="url('/background.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        height="100vh"
        width="100vw"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Heading color="green.200" as="h1" size="2xl" mb={8}>
            Welcome to Feature Hunt
          </Heading>
          <Text color="white" fontSize="lg" mb={4}>
            Collect, analyze, and organize feedback and feature requests in your
            product's feedback board to make better product decisions.
          </Text>
          <Text color="white" fontSize="lg" mb={8}>
            Feature Hunt is a platform that allows you to do just that. Users
            can share, vote, and discuss feature requests, and product owners
            can organize them to make better product decisions.
          </Text>
          <Button colorScheme="green" size="md" onClick={onLoginOpen}>
            Login
          </Button>
          <Button ml="6" colorScheme="green" size="md" onClick={onOpenSignup}>
            Signup
          </Button>
        </Box>
      </Box>
      <SignupModal />
      <LoginModal />
    </>
  );
};

export default HomePage;
