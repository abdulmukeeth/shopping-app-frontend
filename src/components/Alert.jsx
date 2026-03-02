import { useAlert } from "../context/AlertContext";

export default function Alert() {
  const { alert } = useAlert();

  if (!alert) return null;

  return (
    <div
      className="toast-container position-fixed top-0 end-0 p-3"
      style={{ zIndex: 9999 }}
    >
      <div className={`toast show text-bg-${alert.type} border-0 shadow`}>
        <div className="toast-body d-flex justify-content-between align-items-center">
          <span>{alert.message}</span>
        </div>
      </div>
    </div>
  );
}
