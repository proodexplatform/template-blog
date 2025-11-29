import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LinkWrapper } from "@/components/ui/link-wrapper";
import { Image } from "@/components/ui/image";

export default function HomePage() {
  return (
    <section>
      <h1 className="text-brand">Welcome to the Home Page</h1>
      <Image
        src="/demo.jpg"
        alt="Demo"
        width={400}
        height={300}
        className="shadow-lg"
      />
      <span className="font-mono">This is a monospace text.</span>
      <h5 className="font-serif">Heading in Lora</h5>
      <Icon name="Heart" className="text-red-500" />
      <p className="font-roboto bg-brand">Paragraph in Roboto</p>
      <Input
        type="text"
        placeholder="Enter your name"
      />
      <Label htmlFor="email">
        Email Address
      </Label>
      <Textarea
        id="message"
        placeholder="Write your message..."
      />
      {/* External link */}
      <LinkWrapper href="https://github.com">
        <Icon name="Github" className="text-gray-700" />
      </LinkWrapper>
    </section>
  );
}