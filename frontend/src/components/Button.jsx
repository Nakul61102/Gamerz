const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-primary text-white rounded transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
    >
      {text}
    </button>
  );
};

export default Button;