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
    <div className="border-gray-200 border-b">
      {isOpen && <div>{children}</div>}
    </div>
  );
};
