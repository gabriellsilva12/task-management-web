import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center">
      <h1 className="text-7xl font-bold text-lime-cream">404</h1>

      <h2 className="mt-4 text-xl font-semibold text-white">
        Page not found
      </h2>

      <p className="mt-2 text-white/60">
        The page you are looking for doesn't exist.
      </p>

      <Link
        to="/login"
        className="mt-5 rounded-lg bg-lime-cream px-5 py-2 font-semibold text-black transition hover:opacity-80"
      >
        Back to login
      </Link>
    </main>
  );
}