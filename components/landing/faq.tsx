import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is it accessible?",
    answer: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    question: "Is it accessiblely",
    answer: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    question: "Is it accessibleata?",
    answer: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
];

const Faq = () => {
  return (
    <section id="faq" className="w-full px-4 sm:px-6 lg:px-8">
      <Accordion
        type="single"
        collapsible
        className="max-w-container flex w-full flex-col items-center justify-center"
      >
        {faqs.map((faq, idx) => (
          <AccordionItem value={faq.question} className="min-w-[600px]">
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Faq;
