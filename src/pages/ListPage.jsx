import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/ui/Button";
import StatusBadge from "../components/ui/StatusBadge";
import useShipmentStore from "../store/useShipmentStore";

const ListPage = () => {
  const { shipments, startRealtimeSimulation } = useShipmentStore();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const interval = startRealtimeSimulation();
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = shipments.filter((s) => {
    if (filterStatus === "all") return true;
    return s.status === filterStatus;
  });

  const counts = {
    all: shipments.length,
    assigned: shipments.filter((s) => s.status === "assigned").length,
    not_assigned: shipments.filter((s) => s.status === "not_assigned").length,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Shipments</h1>
        <p className="text-sm text-gray-500 mt-1">Manage and track all active shipments</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { key: "all", label: "Total", color: "bg-blue-50 text-blue-700 border-blue-200" },
          { key: "assigned", label: "Assigned", color: "bg-green-50 text-green-700 border-green-200" },
          { key: "not_assigned", label: "Unassigned", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
        ].map(({ key, label, color }) => (
          <Button
            key={key}
            onClick={() => setFilterStatus(key)}
            className={`rounded-xl border p-4 text-left transition-all ${color} ${
              filterStatus === key ? "ring-2 ring-offset-1 ring-current" : "opacity-70 hover:opacity-100"
            }`}>
            <p className="text-2xl font-bold">{counts[key]}</p>
            <p className="text-xs font-medium uppercase tracking-wide opacity-75">{label}</p>
          </Button>
        ))}
      </div>

      <div className="hidden sm:block bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Shipment ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Route</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Vehicle</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((shipment) => (
              <tr key={shipment.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-mono font-medium text-blue-700">{shipment.id}</td>
                <td className="px-4 py-3 text-gray-700">
                  <span>{shipment.origin}</span>
                  <span className="mx-1.5 text-gray-400">→</span>
                  <span>{shipment.destination}</span>
                </td>
                <td className="px-4 py-3 text-gray-600">{shipment.vehicleType}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={shipment.status} />
                </td>
                <td className="px-4 py-3 text-gray-500">{shipment.createdAt}</td>
                <td className="px-4 py-3 text-right">
                  <Button
                    onClick={() => navigate(`/shipment/${shipment.id}`)}
                    className="text-blue-600 hover:text-blue-800 text-xs font-medium px-3 py-1.5 rounded-md border border-blue-200 hover:bg-blue-50 transition-colors">
                    View Detail
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="py-12 text-center text-gray-400 text-sm">No shipments found.</div>}
      </div>

      <div className="sm:hidden space-y-3">
        {filtered.map((shipment) => (
          <div key={shipment.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-2">
              <span className="font-mono text-sm font-semibold text-blue-700">{shipment.id}</span>
              <StatusBadge status={shipment.status} />
            </div>
            <p className="text-sm text-gray-700 mb-1">
              {shipment.origin} → {shipment.destination}
            </p>
            <p className="text-xs text-gray-500 mb-3">{shipment.vehicleType}</p>
            <Button
              onClick={() => navigate(`/shipment/${shipment.id}`)}
              className="w-full py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50">
              View Detail
            </Button>
          </div>
        ))}
        {filtered.length === 0 && <div className="py-12 text-center text-gray-400 text-sm">No shipments found.</div>}
      </div>
    </div>
  );
};

export default ListPage;
