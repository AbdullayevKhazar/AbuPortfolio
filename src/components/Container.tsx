import type React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 dark">
      {children}
    </section>
  );
};

export default Container;
