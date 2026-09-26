import { Html, Head, Body, Container, Text, Heading, Tailwind, Row, Column, Link, Button } from '@react-email/components';
import React from 'react';

export function WelcomeEmail({ userFirstname }) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className='bg-black text-white font-sans'>
            <Container className='py-6 px-6'>
                <Text className='text-center text-xs'>COSMOS</Text>
                <Heading as='h3' className='font-semibold text-center text-lg'>Your Journey Beyond Begins Here</Heading>
                <Text className='my-8 mt-12 text-zinc-300'>
                    Dear {userFirstname}, <br /><br />
                    Welcome to COSMOS. You have taken your first step toward an extraordinary voyage across the stars. 
                    Whether your destination is the Moon, Mars, Europa, or Titan, our Quantum-class starships are built 
                    to deliver world-class luxury and uncompromising safety.
                </Text>
                <Heading as='h3' className='font-medium text-start text-base my-6 mt-12'>How to start your first journey with us?</Heading>
                <Row className='my-4'>
                    <Column className='font-mono text-zinc-500 text-xs align-bottom '>01</Column>
                    <Column className='text-zinc-300'>Choose a destination and book</Column>
                </Row>
                <Row className='my-4'>
                    <Column className='font-mono text-zinc-500 text-xs align-bottom '>02</Column>
                    <Column className='text-zinc-300'>Choose a destination and book</Column>
                </Row>
                <Row className='my-4'>
                    <Column className='font-mono text-zinc-500 text-xs align-bottom '>03</Column>
                    <Column className='text-zinc-300'>Choose a destination and book</Column>
                </Row>
                <Container className='max-w-75 h-52 bg-[url(https://res.cloudinary.com/ithcqaje/image/upload/v1790269995/hero.png)] bg-contain bg-center bg-no-repeat'></Container>
                <Text className='text-center mt-20'>
                    <Button href='https://cosmos-tqs9.onrender.com/destinations' className='bg-white px-8 py-2 text-xs text-black'>Explore</Button>
                </Text>
                <Text className='mt-18 text-xs'>Warm regards,<br />The COSMOS Team</Text>
            </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default WelcomeEmail;