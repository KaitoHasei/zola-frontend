import { Box, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
export default function RegisterSuccess() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(15);
  //More effiecient way to handle countdown, Tks to @KaitoHasei for the suggestion :))))
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("rendered ");
      if (countdown === 0) {
        navigate("/login");
      } else {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }
    }, 1000);

    return () => {
      console.log("unmounting");
      clearTimeout(timer);
    };
  }, [countdown, navigate]);

  return (
    <Box
      position="relative"
      display="flex"
      width="100%"
      height="100vh"
      flexDirection="row"
      padding="5rem"
    >
      <Box
        width="50%"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading
          as="h1"
          size="3xl"
          mb="4"
          textTransform="uppercase"
          color="teal"
        >
          Account Created Successfully
        </Heading>
        <Heading as="h3" size="lg" mb="4" display="flex" flexDirection="row">
          Redirecting to login page in&nbsp;
          <Box color="teal"> {countdown} </Box>
          &nbsp;seconds
        </Heading>
        <Text mb="4">Please check your email to verify your account</Text>
        <Text mb="4">
          If you are not redirected, click <Link to="/login">here</Link>
        </Text>
      </Box>
      <Box
        width="50%"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <img
          src={require("../../../assets/images/RegisterSuccess.svg").default}
          alt="Register Success"
        />
      </Box>
      <img
        style={{
          top: 0,
          left: 0,
          position: "absolute",
          zIndex: -1,
          width: "30%",
          height: "auto",
        }}
        src={require("../../../assets/images/successEle2.svg").default}
        alt="top left"
      />
      <img
        style={{
          bottom: 0,
          left: 0,
          position: "absolute",
          zIndex: -1,
          width: "30%",
          height: "auto",
        }}
        src={require("../../../assets/images/successEle.svg").default}
        alt="bottom left"
      />
    </Box>
  );
}

//Another way to handle countdown
// const countdownTimer = () => {
//   setTimeout(() => {
//     if (countdown === 0) {
//       navigate("/login");
//     } else {
//       setCountdown((prevCountdown) => prevCountdown - 1);
//     }
//   }, 1000);
// };

// React.useEffect(() => {
//   console.log("rerendered");
//   countdownTimer();
// }, [countdown, navigate]);

//The old way to handle countdown, it cost more rerender and performance issue.

// useEffect(() => {
//   const timer = setInterval(() => {
//     console.log("Countdown rerendered ");
//     setCountdown((prevCountdown) => prevCountdown - 1);
//   }, 1000);

//   return () => {
//     console.log("unmounting");
//     clearInterval(timer);
//   };
// }, []);

// useEffect(() => {
//   console.log("Countdown navigate ");
//   if (countdown === 0) {
//     navigate("/login");
//   }
// }, [countdown, navigate]);
