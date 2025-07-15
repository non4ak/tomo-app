export default function ActiveButton({ text, Icon }) {
  return (
    <button className="button-library">
      <Icon className="w-5 h-5" />
      <span className="font-medium text-lg">{text}</span>
    </button>
  );
}