import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ route = ".." }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(route)}
      className="text-xl flex items-center justify-center tracking-wide color-text gap-1 cursor-pointer py-1 px-2.5 rounded-lg"
    >
      <ArrowLeft />
      Back
    </button>
  );
}
