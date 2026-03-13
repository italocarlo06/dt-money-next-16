import { BodyContainer } from "@/components/BodyContainer";
import { Card } from "@/components/Card";
import { CardContainer } from "@/components/CardContainer";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="h-full min-h-screen">
      <Header />
      <BodyContainer>
         <CardContainer />
      </BodyContainer>
    </div>
  );
}
