import SeparateText from "@/registry/components/magicui/separate-text";

 export default async function SeparateTextDemo() {
   return (
     <SeparateText
       className = "text-black"
       upperText = { "Separate" }
       lowerText = { "Away" }
       duration = { 1.5 }
     />
   );
 }