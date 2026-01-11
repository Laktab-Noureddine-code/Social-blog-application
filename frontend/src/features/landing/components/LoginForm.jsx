import { useState } from 'react'
import { Link } from 'react-router-dom'

export const LoginForm = () => {
    const [email, setEmail] = useState('')
    return (
      <form
        action=""
        className="flex justify-between md:max-w-2xl border border-gray-400 my-3 mx-auto px-2 pl-4 font-semibold py-2 shadow-sm rounded-xl bg-gray-50 focus-within:outline-2 focus-within:outline-gray-500"
      >
        <input
          type="text"
          name="email"
          placeholder=""
          className="flex-1 w-full focus:outline-0 text-xl bg-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Link
          to={`/login`}
          state={{ email }}
          className="text-white bg-black px-3 py-1 text-lg cursor-pointer rounded-lg"
        >
          Login
        </Link>
      </form>
    );
}
