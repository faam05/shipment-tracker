import { useNavigate, useParams } from "react-router-dom";
import useShipmentStore from "../store/useShipmentStore";

import AssignTransporterForm from "../components/layouts/AssignTransporterForm";
import Button from "../components/ui/Button";
import StatusBadge from "../components/ui/StatusBadge";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getShipmentById, getTransporterById } = useShipmentStore();

  const shipment = getShipmentById(id);

  if (!shipment) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 text-lg">Shipment not found.</p>
        <Button onClick={() => navigate("/")} className="mt-4 text-blue-600 hover:underline text-sm">
          ← Back to list
        </Button>
      </div>
    );
  }

  const transporter = getTransporterById(shipment.assignedTransporterId);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button onClick={() => navigate("/")} className="flex hover:cursor-pointer items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Shipments
      </Button>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-mono">{shipment.id}</h1>
          <p className="text-sm text-gray-500 mt-1">Created on {shipment.createdAt}</p>
        </div>
        <StatusBadge status={shipment.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Route info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Shipment Details</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
              <DetailRow label="Origin" value={shipment.origin} />
              <DetailRow label="Destination" value={shipment.destination} />
              <DetailRow label="Vehicle Type" value={shipment.vehicleType} />
              <DetailRow label="Weight" value={shipment.weight} />
            </div>

            {shipment.notes && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Notes</p>
                <p className="text-sm text-gray-700">{shipment.notes}</p>
              </div>
            )}
          </div>

          {/* Route section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Route</h2>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-800 mt-1">{shipment.origin}</p>
              </div>
              <div className="flex-1 flex items-center gap-1">
                <div className="flex-1 h-0.5 bg-gray-300 border-dashed" />
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="flex-1 h-0.5 bg-gray-300" />
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-800 mt-1">{shipment.destination}</p>
              </div>
            </div>
          </div>

          {/* Current transporter info */}
          {transporter && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Assigned Transporter</h2>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm">
                  {transporter.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{transporter.name}</p>
                  <p className="text-xs text-gray-500">{transporter.contact}</p>
                </div>
                <div className="ml-auto text-sm text-yellow-600 font-medium">⭐ {transporter.rating}</div>
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="lg:col-span-1">
          <AssignTransporterForm shipment={shipment} />
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div>
    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">{label}</p>
    <p className="text-gray-900 font-medium">{value}</p>
  </div>
);

export default DetailPage;
