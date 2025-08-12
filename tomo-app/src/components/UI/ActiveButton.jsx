import { Link } from "react-router-dom";

export default function ActiveButton({ text, Icon, onClick, type = "link" }) {
  if (type === "link") {
    return (
      <Link to={"/my-lib"} className="button-library">
        <Icon className="w-5 h-5" />
        <span className="font-medium text-lg">{text}</span>
      </Link>
    );
  }

  if (type === "action") {
    return (
      <button onClick={onClick} className="button-library">
        <Icon className="w-5 h-5" />
        <span className="font-medium text-lg">{text}</span>
      </button>
    );
  }
}
