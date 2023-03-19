import React from "react";
import { AuthContext } from "../context/AuthContext";

const WelcomeCard = () => {
  const { currentUser } = useContext(AuthContext);
  return <div>Welcome {currentUser.displayName}</div>;
};

export default WelcomeCard;

