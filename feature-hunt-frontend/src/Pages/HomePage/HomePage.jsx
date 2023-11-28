import React, { useRef } from "react";
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

const HomePage = () => {
  const navigate = useNavigate();
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const emailRefLogin = useRef("");
  const passwordRefLogin = useRef("");

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
            <FormControl mb={4} id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input ref={emailRefLogin} type="email" />
              <FormHelperText>(We'll never share your email)</FormHelperText>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input ref={passwordRefLogin} type="password" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleLogin}>
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
              <Input ref={nameRef} type="username" />
            </FormControl>
            <FormControl mb={4} id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input ref={emailRef} type="email" />
              <FormHelperText>(We'll never share your email)</FormHelperText>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input ref={passwordRef} type="password" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSignup} colorScheme="green" mr={3}>
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

  const handleSignup = async () => {
    try {
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      try {
        const response = await fetch("http://127.0.0.1:5000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers as needed
          },
          body: JSON.stringify({
            name,
            email,
            password,
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
        console.log("Signup successful:", responseData);
        // Handle the response as needed
        console.log(response.data);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        onCloseSignup();
        navigate("/feed");
      } catch (error) {
        console.error("Error during fetch:", error.message);
      }

      // Redirect or perform other actions based on the response
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error("Signup error:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const email = emailRefLogin.current.value;
      const password = passwordRefLogin.current.value;
      try {
        const response = await fetch("http://127.0.0.1:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers as needed
          },
          body: JSON.stringify({
            email,
            password,
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
        console.log("Login successful:", responseData);
        // Handle the response as needed
        console.log(response.data);
        localStorage.setItem("email", email);
        onLoginClose();
        navigate("/feed");
      } catch (error) {
        console.error("Error during fetch:", error.message);
      }
      // Redirect or perform other actions based on the response
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error("Login error:", error);
    }
  };

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
