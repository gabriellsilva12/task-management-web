import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TaskPage() {
  type userProps = {
    token: string;
    user: { email: string; id: string; name: string };
  };

  const [userData, setuserData] = useState<userProps | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = () => {
      const dadosUsuario = JSON.parse(localStorage.getItem("user") || "");

      if (dadosUsuario) setuserData(dadosUsuario);
    };

    getUserData();
  }, []);

  function exitUser() {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  return (
    <div className="px-3.5 bg-black">
      <div className="flex gap-0.5 items-center justify-center flex-col bg-black h-screen">
        <div className="bg">
          <h1 className="text-lime-cream">TaskPage</h1>
        </div>

        <div className="mt-5.5 text-center flex flex-col">
          <h2 className="text-lime-cream text-4xl mt-">
            Hello {userData?.user.name}
          </h2>
          <button
            className="bg-lime-cream rounded px-3 py-1.5 mt-4"
            onClick={exitUser}
          >
            exit
          </button>
        </div>
      </div>
    </div>
  );
}
