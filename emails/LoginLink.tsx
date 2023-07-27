import { Body } from "@react-email/body";
import { Button } from "@react-email/button";
import { Container } from "@react-email/container";
import { Font } from "@react-email/font";
import { Head } from "@react-email/head";
import { Heading } from "@react-email/heading";
import { Hr } from "@react-email/hr";
import { Html } from "@react-email/html";
import { Img } from "@react-email/img";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Tailwind } from "@react-email/tailwind";
import { Text } from "@react-email/text";

interface Props {
  firstName?: string;
  loginLink?: string;
}

const Email = ({ firstName, loginLink = "https://magicuikit.com" }: Props) => {
  const previewText = firstName
    ? `Welcome to Magic UI, ${firstName}!`
    : `Welcome to Magic UI!`;

  return (
    <Html>
      <Head>
        <Font
          fontFamily="sans-serif"
          fallbackFontFamily="Arial"
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://magicuikit.com/icon.png`}
                width="40"
                height="37"
                alt="Magic UI"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Welcome to <strong>Magic UI</strong> 🎉
            </Heading>
            {/* <Text className="text-black text-[14px] leading-[24px]">
              {firstName && `Hello ${firstName} 👋`}
              {!firstName && `Hello 👋`}
            </Text> */}
            <Text className="text-black text-[14px] leading-[24px]">
              Click the link below to login to your account.
            </Text>

            <Section className="text-center mt-[20px] mb-[20px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={loginLink}
              >
                Get Started
              </Button>
            </Section>

            {/* <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              <Link href={loginLink} className="text-blue-600 no-underline">
                {loginLink}
              </Link>
            </Text> */}
            <Hr className="border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you were not expecting this invitation, you can ignore this
              email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default Email;
