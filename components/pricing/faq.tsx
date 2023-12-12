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
        question: 'What does "lifetime access" mean?',
        answer: (
          <span>
            It means you get access to all current and future components and
            templates for a{" "}
            <strong>
              one-time payment. No recurring fees. No subscription.
            </strong>
          </span>
        ),
      },
      {
        question: 'What does "lifetime updates" mean?',
        answer: (
          <span>
            It means you get access to all current components and templates,
            plus any new ones we add in the future at{" "}
            <strong>no additional cost.</strong>
          </span>
        ),
      },
      {
        question: "How do I get access once I've paid?",
        answer: (
          <span>
            Once you purchase through stripe, use the same email to login to the
            website{" "}
            <a href="https://magicui.design/login" className="underline">
              here
            </a>{" "}
            and you will have access to all components and templates. Components
            have to be copy + pasted into your project individually.
          </span>
        ),
      },
      {
        question: "Do you offer refunds?",
        answer: (
          <span>
            Due to the nature of digital products, we do not offer refunds. If
            you have any questions, please contact us at{" "}
            <a href="mailto:support@magicui.design" className="underline">
              support@magicui.design
            </a>
          </span>
        ),
      },
    ],
  },
  {
    section: "Support",
    qa: [
      {
        question: "Do you offer technical support?",
        answer: (
          <span>
            Magic UI is a <strong>self-serve</strong> product. We do not offer
            technical support. However, if you have a bug to report, please open
            an issue{" "}
            <a href="https://magicui.featurebase.app/" className="underline">
              here
            </a>{" "}
            and we will fix it as soon as possible.
          </span>
        ),
      },
    ],
  },
];

const Faq = () => {
  return (
    <section id="faqs" className="container py-14">
      <h2 className="mb-4 text-center text-5xl font-bold tracking-tight text-foreground">
        Frequently Asked Questions
      </h2>
      <h4 className="mb-8 text-center text-lg font-medium tracking-tight text-foreground/80">
        Need help with something? Here are some of the most common questions we
        get.
      </h4>
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
              {faq.qa.map((faq, idx2) => (
                <AccordionItem
                  key={idx2}
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
        <a href="mailto:support@magicui.design" className="underline">
          support@magicui.design
        </a>
      </h4>
    </section>
  );
};

export default Faq;
