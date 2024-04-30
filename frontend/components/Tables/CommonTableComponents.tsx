export interface AccordionProps {
  isOpen: boolean;
  title: string;
  onClick: () => void;
}

export const Accordion = ({
  isOpen,
  onClick,
  title,
  children,
}: React.PropsWithChildren<AccordionProps>) => {
  return (
    <div className="border-gray-200 border-top-transparent border-bottom-transparent">
      {isOpen && <div>{children}</div>}
    </div>
  );
};

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
