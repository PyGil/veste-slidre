interface OwnProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

const SIZE_MAP = {
  small: "w-6 h-6",
  medium: "w-10 h-10",
  large: "w-14 h-14",
};

const DEFAULT_SIZE = "medium";
const DEFAULT_COLOR = "#0066CC";

export default function LoaderSpinner({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
}: OwnProps) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className={`relative ${SIZE_MAP[size]}`}>
        <div
          className="absolute rounded-full w-full h-full opacity-20"
          style={{
            border: `4px solid ${color}`,
          }}
        />
        <div
          className="absolute rounded-full w-full h-full animate-spin"
          style={{
            border: `4px solid ${color}`,
            borderLeftColor: "transparent",
          }}
        />
      </div>
    </div>
  );
}
