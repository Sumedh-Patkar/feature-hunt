import React from 'react';
import { Center, Box, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar/NavBar';

export const DashboardPage = () => {
    const navigate = useNavigate();
    function handleClick() {
        navigate("/dashboard");
    }
    return (
        <>
            <Navbar />

        </>
    );
};
