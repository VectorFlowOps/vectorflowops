import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { faq } from "@/data/content";

export function Faq() {
  return (
    <Section id="faq">
      <SectionHeading eyebrow={faq.eyebrow} title={faq.title} />

      <Reveal className="mx-auto max-w-measure">
        <Accordion type="single" collapsible defaultValue="faq-0">
          {faq.items.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}
