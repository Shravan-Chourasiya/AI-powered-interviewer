import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
} from "@react-email/components";

interface VerificationEmailProps {
  verifycode: string;
  username: string;
}

const VerificationEmail = ({ verifycode, username }: VerificationEmailProps) => (
  <Html>
    <Head>
      <title>Ai Interviewer | Verification Code</title>
    </Head>
    <Preview>Your verification code for Ai Interviewer</Preview>
    <Body style={{ backgroundColor: "#f4f4f7", fontFamily: "Arial, sans-serif" }}>
      <Container style={{ maxWidth: 600, margin: "40px auto", background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #eee", padding: 32 }}>
        <Section>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>
            {username ? `Hello, ${username}!` : "Hello!"}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 24 }}>
            Thank you for signing up for <b>Ai Interviewer</b>.<br />
            Please use the following verification code to complete your registration:
          </Text>
          <Section style={{ textAlign: "center", margin: "32px 0" }}>
            <Text style={{
              display: "inline-block",
              fontSize: 32,
              fontWeight: "bold",
              letterSpacing: 8,
              background: "#f0f4ff",
              padding: "16px 32px",
              borderRadius: 8,
              color: "#2d4be5",
              border: "1px solid #e0e7ff"
            }}>
              {verifycode}
            </Text>
          </Section>
          <Text style={{ fontSize: 14, color: "#888" }}>
            If you did not request this, you can safely ignore this email.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default VerificationEmail;