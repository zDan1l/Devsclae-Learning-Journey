import { useRegister } from "@/modules/auth/hooks/useRegister";
import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useState } from "react";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: submitRegister, isPending } = useRegister();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    submitRegister({ email, password });
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <form className="w-[300] space-y-6" onSubmit={handleSubmit}>
        <section className="text-center">
          <h3>SignUp</h3>
          <p>Creata account to continue</p>
        </section>
        <section className="space-y-2">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="email@address.com"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
        </section>
        <button className="hover:cursor-pointer" type="submit">
          {isPending ? "Registering.." : "Register"}
        </button>
        <section>
          <p>
            Have an account ? <Link to="/login">Login</Link>
          </p>
        </section>
      </form>
    </div>
  );
}
