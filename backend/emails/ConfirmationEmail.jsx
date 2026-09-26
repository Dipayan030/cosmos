import { Html, Head, Body, Container, Text, Heading, Tailwind, Row, Column, Link, Button } from "@react-email/components";
import React from "react";

export default function ConfirmationEmail({ userFirstname, destination, fullName, bookingId, departureStation, date }) {
    return(
        <Html>
            <Head />
            <Tailwind>
                <Body className='bg-black text-white font-sans'>
                    <Container className='py-6 px-6'>
                    <Text className='text-center text-xs'>COSMOS</Text>
                    <Heading as='h3' className='font-semibold text-center text-lg'>Booking Confirmed</Heading>
                    <Text className='my-8 mt-12 text-zinc-300'>
                        Dear {userFirstname}, <br /><br />
                        Your voyage to {destination} is confirmed. We are honored to guide your journey aboard our Quantum-class starship. 
                        <br /><br />
                        Your ticket,
                    </Text>
                    <Container className="h-81.25 w-63.25 bg-[url(https://res.cloudinary.com/ithcqaje/image/upload/v1790362049/ticket-vector.svg)] bg-no-repeat bg-contain bg-center">
                        <Container className="w-52 h-44 mb-10 text-black font-mono">
                            <Row>
                                <Column className="text-[8px] text-zinc-500 font-normal text-left">From</Column>
                                <Column className="text-[8px] text-zinc-500 font-normal text-right">To</Column>
                            </Row>
                            <Row>
                                <Column className="text-left font-medium">EARTH</Column>
                                <Column className="text-right font-medium">{destination}</Column>
                            </Row>
                            <Text className="text-xs mt-8">
                                Name : {fullName} <br />
                                Booking Id : {bookingId} <br />
                                Departure Station : {departureStation} <br />
                                Date : {date}
                            </Text>
                        </Container>
                        <Container className="w-52 h-14 bg-[url(https://res.cloudinary.com/ithcqaje/image/upload/v1790363208/barcode.gif)] bg-contain bg-no-repeat bg-center "></Container>
                    </Container>
                    <Text className='mt-18 text-xs'>Warm regards,<br />The COSMOS Team</Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}