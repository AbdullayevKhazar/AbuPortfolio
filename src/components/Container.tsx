import type React from "react";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <section className={`mx-auto w-full max-w-3xl px-4 py-16` + className}>
      {children}
    </section>
  );
};

export default Container;
