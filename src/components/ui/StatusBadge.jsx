const StatusBadge = ({ status }) => {
  const isAssigned = status === "assigned";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isAssigned ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
      }`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isAssigned ? "bg-green-500" : "bg-yellow-500"}`} />
      {isAssigned ? "Assigned" : "Not Assigned"}
    </span>
  );
};

export default StatusBadge;
