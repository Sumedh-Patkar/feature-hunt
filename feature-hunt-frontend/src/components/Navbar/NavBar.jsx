import React from 'react';
import { Box, Flex, Text, Link } from '@chakra-ui/react';

const Navbar = () => {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding="1.5rem"
            bg="green.600"
            color="white"
        >
            <Flex align="center" mr={5}>
                <img src="/logo.png" alt="Logo" style={{ width: '50px', height: 'auto' }} />
            </Flex>

            <Box
                display={{ base: 'block', md: 'none' }}
                onClick={() => console.log('Toggle menu')}
            >
                {/* Add your toggle button/icon here */}
                <Text fontSize="xl">☰</Text>
            </Box>

            <Box
                display={{ base: 'none', md: 'flex' }}
                width={{ base: 'full', md: 'auto' }}
                alignItems="center"
                flexGrow={1}
            >
                <Link href="/" p={2}>
                    Home
                </Link>
                <Link href="/product_feed" p={2}>
                    Feed
                </Link>
                <Link href="/add_company" p={2}>
                    Create Company
                </Link>
                <Link href="/add_product" p={2}>
                    Create Product
                </Link>
                <Link href="/logout" p={2}>
                    Logout
                </Link>
            </Box>
        </Flex>
    );
};

export default Navbar;
