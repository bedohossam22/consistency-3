import sendEmail from "./sendEmail.js";
import dotenv from "dotenv";
dotenv.config();


const test = async () => {
  await sendEmail(
    "bedohossamnecro@gmail.com", // your personal email for testing
    "Test Email from Marriage_App",
    "Hello! This is a test email from your backend."
  );

  console.log("Email sent (or error printed in console).");
};

test();