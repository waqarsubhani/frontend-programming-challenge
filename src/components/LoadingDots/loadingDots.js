import "./loadingDots.css";

const LoadingDots = ({ color = "#000" }) => {
  return (
    <span className="loading">
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
};

export default LoadingDots;
