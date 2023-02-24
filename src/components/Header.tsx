import {
    Box,
    Flex,
    Container,
    Heading,
} from '@chakra-ui/react';

export const Header = ({ title }:any) => {    
    return (
        <Box px={4} bgColor="#173268" color={"white"} borderEndEndRadius={10} borderBottomLeftRadius={10} boxShadow={"xl"}>
            <Container maxW="container.lg">
                <Flex as="header" py="4" justifyContent="space-between" alignItems="center">
                    <Heading as='h1' fontSize="xl">
                        {title}
                    </Heading>
                </Flex>
            </Container>
        </Box>
    );
}