import { useState } from "react";
import useShipmentStore from "../../store/useShipmentStore";
import Button from "../ui/Button";

const AssignTransporterForm = ({ shipment }) => {
  const { transporters, assignTransporter, setNotification, getTransporterById } = useShipmentStore();

  const [selectedId, setSelectedId] = useState(shipment.assignedTransporterId || "");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentTransporter = getTransporterById(shipment.assignedTransporterId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!selectedId) {
      setError("Please select a transporter before assigning.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await assignTransporter(shipment.id, selectedId);
      const transporter = transporters.find((t) => t.id === selectedId);
      setNotification({
        type: "success",
        message: `Successfully assigned ${transporter?.name} to shipment ${shipment.id}`,
      });
    } catch (err) {
      setNotification({
        type: "error",
        message: `Failed to assign transporter: ${err.message}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Assign Transporter</h2>

      {currentTransporter && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
          Currently assigned to: <strong>{currentTransporter.name}</strong>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Transporter</label>
          <select
            value={selectedId}
            onChange={(e) => {
              setSelectedId(e.target.value);
              if (e.target.value) setError("");
            }}
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? "border-red-400 bg-red-50" : "border-gray-300"
            }`}>
            <option value="">-- Select a transporter --</option>
            {transporters.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} (⭐ {t.rating})
              </option>
            ))}
          </select>
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>

        {selectedId && <TransporterPreview transporter={transporters.find((t) => t.id === selectedId)} />}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Assigning...
            </>
          ) : (
            "Assign Transporter"
          )}
        </Button>
      </form>
    </div>
  );
};

const TransporterPreview = ({ transporter }) => {
  if (!transporter) return null;
  return (
    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm space-y-1">
      <p className="font-medium text-gray-800">{transporter.name}</p>
      <p className="text-gray-500">Contact: {transporter.contact}</p>
      <p className="text-gray-500">
        Rating: <span className="text-yellow-600 font-medium">⭐ {transporter.rating}</span>
      </p>
    </div>
  );
};

export default AssignTransporterForm;
