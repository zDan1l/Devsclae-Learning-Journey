import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-screen justify-center items-center">
      <main>
        <input type="text" placeholder='email@address.com'/>
        <input type="password" placeholder='password'/>
        <button type="button">Register</button>
      </main>
    </div>
  )
}
