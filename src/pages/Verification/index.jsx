import React, { useContext, useEffect, useState } from 'react';
import { Box, Heading, Button } from "@chakra-ui/react";
import Countdown from '#/components/Countdown';
import { GlobalContext } from '#/contexts/GlobalContext';
import { post } from '#/axios';
import { useNavigate } from 'react-router-dom';

const Verification = () => {
  const navigate = useNavigate()
  const { logIn, accessToken: act, user: currentUser } = useContext(GlobalContext);
  console.log("Current user", currentUser)

  const [showTimer, setShowTimer] = useState(false);
  const [verificationDisabled, setVerificationDisabled] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const checkEmailVerificationStatus = async () => {
    try {
      const user = {
        email: currentUser.email
      };

      const resp = await post("/auth/emailVerification", user);
      const status = resp.data.emailVerified
      setTimeout(checkEmailVerificationStatus, 5000)
      setEmailVerified(status)
      console.log("Status : ", status)
    } catch (error) {
      console.error("Error checking verified email status: ", error);
    }
  };
  checkEmailVerificationStatus()
  useEffect(() => {
    if (emailVerified) {
      if (emailVerified) {
        console.log("accessToken : ", act)
        logIn(act)
        return navigate("/")
      }
    }
  }, [emailVerified, navigate, logIn]);

  const handleVerification = () => {
    setShowTimer(true);
    setVerificationDisabled(true);
  };

  const handleTimerComplete = () => {
    setShowTimer(false);
    setVerificationDisabled(false);
  };

  return (
    <Box height="100%" display="flex">
      <Box
        width={{ base: "100%", sm: "450px", xl: "700px" }}
        margin="auto"
        padding="50px"
        border="1px solid #0000003b"
        borderRadius="15px"
        boxShadow="0 1px 0.5px #0000003b"
      >
        <Box margin="10px" textAlign="center">
          {
            !emailVerified ?
              <Heading>Please verify your email address</Heading>
              :
              <Heading>Your email is verified !</Heading>
          }
        </Box>
        <Box marginTop="10px">
          <Box textAlign="center">
            {!emailVerified &&
              <Button onClick={handleVerification} disabled={verificationDisabled || showTimer} marginTop={10}>
                Send email link verification
              </Button>}
          </Box>
        </Box>
        {showTimer && <Countdown onComplete={handleTimerComplete} />}
      </Box>
    </Box>
  );
};

export default Verification;