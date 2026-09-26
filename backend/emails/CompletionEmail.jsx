import { Html, Head, Body, Container, Text, Heading, Tailwind, Row, Column, Link, Button } from '@react-email/components';
import React from 'react';

export default function CompletionEmail({ userFirstname, destination }) {
    return(
        <Html>
            <Head />
            <Tailwind>
                <Body className='bg-black text-white font-sans'>
                    <Container className='py-6 px-6'>
                    <Text className='text-center text-xs'>COSMOS</Text>
                    <Heading as='h3' className='font-semibold text-center text-lg'>Journey Completed</Heading>
                    <Text className='my-8 mt-12 text-zinc-300'>
                        Dear {userFirstname}, <br /><br />
                        You have successfully completed your journey to {destination}. Thank you for choosing COSMOS. We are waiting for your next journey.
                    </Text>
                    <Text className='mt-18 text-xs'>Warm regards,<br />The COSMOS Team</Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}