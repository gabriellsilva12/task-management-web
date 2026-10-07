import AuthForm from "../components/auth/AuthForm";

export default function Login() {
  return (
    <div className="bg-black w-full h-screen flex items-center justify-center px-8">
      <AuthForm mode="login" />
    </div>
  );
}
