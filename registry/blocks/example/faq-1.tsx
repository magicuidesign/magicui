"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    section: "General",
    qa: [
      {
        question: "What is Magic UI?",
        answer: (
          <span>
            Magic UI is a React-based UI library designed to help developers
            build beautiful and interactive user interfaces with ease. It offers
            a wide range of customizable components.
          </span>
        ),
      },
      {
        question: "How can I get started with Magic UI?",
        answer: (
          <span>
            To get started, install the Magic UI package in your React project
            using your package manager. Explore our documentation for guides on
            using components and customizing your UI.
          </span>
        ),
      },
    ],
  },
  {
    section: "Support",
    qa: [
      {
        question: "Does Magic UI offer technical support?",
        answer: (
          <span>
            While Magic UI is primarily a self-serve library, we provide
            extensive documentation and a community forum where you can ask
            questions and share insights with other developers.
          </span>
        ),
      },
    ],
  },
  {
    section: "Customization",
    qa: [
      {
        question: "Can I customize Magic UI components?",
        answer: (
          <span>
            Absolutely! Magic UI is built with customization in mind. You can
            easily override styles and behaviors of components to match your
            design requirements.
          </span>
        ),
      },
    ],
  },
  {
    section: "Integration",
    qa: [
      {
        question: "How do I integrate Magic UI with my existing project?",
        answer: (
          <span>
            Magic UI can be integrated into any React project. Simply install
            the library, import the components you need, and start using them in
            your project. Our documentation provides detailed instructions for
            integration.
          </span>
        ),
      },
    ],
  },
];

export default function FAQ() {
  return (
    <section id="faq">
      <div className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h4 className="text-xl font-bold tracking-tight text-black dark:text-white">
              FAQs
            </h4>
            <h2 className="text-4xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-6 text-xl leading-8 text-black/80 dark:text-white">
              Need help with something? Here are some of the most common
              questions we get.
            </p>
          </div>
          <div className="container mx-auto my-12 max-w-[600px] space-y-12">
            {faqs.map((faq, idx) => (
              <section key={idx} id={"faq-" + faq.section}>
                <h2 className="mb-4 text-left text-base font-semibold tracking-tight text-foreground/60">
                  {faq.section}
                </h2>
                <Accordion
                  type="single"
                  collapsible
                  className="flex w-full flex-col items-center justify-center"
                >
                  {faq.qa.map((faq, idx) => (
                    <AccordionItem
                      key={idx}
                      value={faq.question}
                      className="w-full max-w-[600px]"
                    >
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </div>
          <h4 className="mb-12 text-center text-sm font-medium tracking-tight text-foreground/80">
            Still have questions? Email us at{" "}
            <a href="mailto:support@example.com" className="underline">
              support@example.com
            </a>
          </h4>
        </div>
      </div>
    </section>
  );
}
