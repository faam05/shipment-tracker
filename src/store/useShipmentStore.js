import { create } from "zustand";
import { MOCK_SHIPMENTS, MOCK_TRANSPORTERS } from "../data/mockData";

const useShipmentStore = create((set, get) => ({
  shipments: MOCK_SHIPMENTS,
  transporters: MOCK_TRANSPORTERS,
  isLoading: false,
  notification: null,

  // Get single shipment by ID
  getShipmentById: (id) => {
    return get().shipments.find((s) => s.id === id) || null;
  },

  // Get transporter by ID
  getTransporterById: (id) => {
    return get().transporters.find((t) => t.id === id) || null;
  },

  // Assign a transporter to a shipment
  assignTransporter: (shipmentId, transporterId) => {
    return new Promise((resolve, reject) => {
      set({ isLoading: true });

      // Simulate API latency
      setTimeout(() => {
        const shipments = get().shipments;
        const exists = shipments.find((s) => s.id === shipmentId);

        if (!exists) {
          set({ isLoading: false });
          reject(new Error("Shipment not found"));
          return;
        }

        set((state) => ({
          isLoading: false,
          shipments: state.shipments.map((s) => (s.id === shipmentId ? { ...s, assignedTransporterId: transporterId, status: "assigned" } : s)),
        }));

        resolve();
      }, 800);
    });
  },

  startRealtimeSimulation: () => {
    const interval = setInterval(() => {
      set((state) => {
        const unassigned = state.shipments.filter((s) => s.status === "not_assigned");
        if (unassigned.length === 0) return state;

        // Randomly pick one unassigned shipment to update
        const random = unassigned[Math.floor(Math.random() * unassigned.length)];
        const randomTransporter = state.transporters[Math.floor(Math.random() * state.transporters.length)];

        return {
          shipments: state.shipments.map((s) => (s.id === random.id ? { ...s, status: "assigned", assignedTransporterId: randomTransporter.id } : s)),
          notification: {
            type: "info",
            message: `Shipment ${random.id} was auto-assigned to ${randomTransporter.name}`,
          },
        };
      });
    }, 8000);

    return interval;
  },

  setNotification: (notification) => set({ notification }),
  clearNotification: () => set({ notification: null }),
}));

export default useShipmentStore;
