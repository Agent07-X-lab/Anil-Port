import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
};

export function Section({ id, title, children, className, titleClassName }: SectionProps) {
  return (
    <section id={id} className={cn("w-full min-h-screen py-20 md:py-32", className)}>
      <div className="container max-w-7xl mx-auto px-6">
        <h2 className={cn("text-5xl md:text-6xl font-bold text-center mb-12 md:mb-20 font-headline gradient-text", titleClassName)}>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
