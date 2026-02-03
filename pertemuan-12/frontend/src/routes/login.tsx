import { useLogin } from '@/modules/auth/hooks/useLogin';
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {mutate: submitLogin, isPending} = useLogin()

  function handleSubmit(event: React.FormEvent) {
      event.preventDefault();
      submitLogin({email, password})
    }

  return (
    <div className="flex h-screen justify-center items-center">
      <form className="w-[300] space-y-6" onSubmit={handleSubmit}>
        <section className="text-center">
          <h3>Sign in</h3>
          <p>Sign in account to continue</p>
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
          {isPending ? "Logging in.." : "Login"}
        </button>
      <section>
        <p>
          Don't have an account ? <Link to="/register">Register</Link>
        </p>
      </section>
      </form>
    </div>
  );
}
