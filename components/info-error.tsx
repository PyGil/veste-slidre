interface OwnProps {
  message?: string;
}

const DEFAULT_MESSAGE = "Det oppstod ein feil";

export default function InfoError({ message = DEFAULT_MESSAGE }: OwnProps) {
  return (
    <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
      <svg
        className="mx-auto h-12 w-12 text-red-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <h3 className="mt-4 text-lg text-red-800">Feil</h3>
      <p className="mt-2 text-sm text-red-600">{message}</p>
    </div>
  );
}
