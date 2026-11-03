import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { createTask, getTasks } from "../services/taskService";
import { Pencil, Trash2 } from "lucide-react";

type UserSession = {
  token: string;
  user: {
    email: string;
    id: string;
    name: string;
  };
};

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export default function TaskPage() {
  const [userData, setuserData] = useState<UserSession | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getUserData = () => {
      const dadosUsuario = JSON.parse(localStorage.getItem("user") || "");

      if (dadosUsuario) setuserData(dadosUsuario);
    };

    const getAllTasks = async () => {
      const res = await getTasks();
      if (res.length > 0) setTasks(res);
      console.log(res);
    };

    getUserData();
    getAllTasks();
  }, []);

  useEffect(() => {
    console.log(description);
  }, [description]);

  async function handleSubmit() {
    const res = await createTask({ title, description });
    setTasks([...tasks, res.task]);

    setTitle("");
    setDescription("");
  }

  function exitUser() {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  return (
    <main className="min-h-screen bg-black px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Hello, {userData?.user.name || "there"}!
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Let's make today productive.
            </p>
          </div>

          <button
            onClick={exitUser}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-lime-cream hover:text-lime-cream"
          >
            Sign out
          </button>
        </header>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-white">My tasks</h2>

          <p className="mt-1 text-sm text-white/50">
            Organize your activities and keep track of your progress.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-white/50">Total tasks</p>
              <h3 className="mt-2 text-3xl font-bold text-lime-cream">
                {tasks.length}
              </h3>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-white/50">Pending</p>
              <h3 className="mt-2 text-3xl font-bold text-white">
                {tasks.filter((task) => !task.completed).length}
              </h3>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-white/50">Completed</p>
              <h3 className="mt-2 text-3xl font-bold text-lime-cream">
                {tasks.filter((task) => task.completed).length}
              </h3>
            </div>
          </div>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-lg font-semibold text-white">Add a new task</h3>

            <p className="mt-1 text-sm text-white/50">
              What do you want to accomplish today?
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="add title task"
                className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-lime-cream"
              />

              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="add description task"
                className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-lime-cream"
              />

              <Button
                onClick={handleSubmit}
                className="rounded-lg bg-lime-cream px-6 py-3 text-sm font-semibold text-black transition hover:brightness-95"
              >
                Add task
              </Button>
            </div>
          </div>
          <div className="mt-6 min-h-64 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            {tasks.length === 0 && (
              <p className="text-sm text-white/40">
                Your tasks will appear here.
              </p>
            )}

            {tasks.length > 0 && (
              <ul className="space-y-3">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-white">
                          {task.title}
                        </h3>

                        <span
                          className={`text-sm ${
                            task.completed ? "text-lime-cream" : "text-red-400"
                          }`}
                        >
                          {task.completed ? "Completed" : "Pending"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label="Edit task"
                          className="rounded-lg p-2 text-white/50 transition hover:bg-white/10 hover:text-lime-cream"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          aria-label="Delete task"
                          className="rounded-lg p-2 text-white/50 transition hover:bg-red-500/10 hover:text-red-400"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>

                    <p className="mt-2 text-sm text-white/50">
                      {task.description}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
