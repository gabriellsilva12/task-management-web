import AuthForm from "../components/AuthForm";

export default function Register() {
  return (
    <div className="bg-black w-full h-screen flex items-center justify-center px-8">
      <AuthForm mode="register" />
    </div>
  );
}
