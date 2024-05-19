import { Button } from "@/modules/design-system/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/modules/design-system/ui/card";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const cards = [
  {
    title: "Next.js",
    description: "The React Framework for the Web",
    href: "https://nextjs.org/",
  },
  {
    title: "Kinde",
    description: "Auth for modern applications",
    href: "https://kinde.com/",
  },
  {
    title: "MongoDB Atlas",
    description: "The multi-cloud developer data platform",
    href: "https://www.mongodb.com/atlas",
  },
  {
    title: "Shadcn",
    description: "Build your component library",
    href: "https://ui.shadcn.com/",
  },
];

export default function Home() {
  return (
    <main>
      <header className="p-4 flex flex-col md:flex-row justify-between items-center gap-4 border-b">
        <h1 className="text-3xl font-bold">Next.js + Kinde + MongoDB</h1>
        <div className="space-x-4">
          <Button asChild>
            <LoginLink>Login</LoginLink>
          </Button>
          <Button asChild variant="outline">
            <RegisterLink>Register</RegisterLink>
          </Button>
        </div>
      </header>
      <div className="max-w-7xl mx-auto p-24 grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link href={card.href}>
                  Learn more <ArrowRight className="size-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
