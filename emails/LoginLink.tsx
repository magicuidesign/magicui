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
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://magicuikit.com/icon.png`}
                width="40"
                height="37"
                alt="Magic UI"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Welcome to <strong>Magic UI</strong> 🎉
            </Heading>
            {/* <Text className="text-black text-[14px] leading-[24px]">
              {firstName && `Hello ${firstName} 👋`}
              {!firstName && `Hello 👋`}
            </Text> */}
            <Text className="text-[14px] leading-[24px] text-black">
              Click the link below to login to your account.
            </Text>

            <Section className="mb-[20px] mt-[20px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
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
            <Hr className="mx-0 my-[26px] w-full border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
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
