import { describe, it, expect, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import useShipmentStore from "../store/useShipmentStore";

// Reset store state before each test
beforeEach(() => {
  useShipmentStore.setState({
    shipments: [
      {
        id: "SHP-TEST-01",
        origin: "Jakarta",
        destination: "Surabaya",
        status: "not_assigned",
        vehicleType: "Truck",
        assignedTransporterId: null,
        weight: "1,000 kg",
        notes: "",
        createdAt: "2024-01-01",
      },
    ],
    transporters: [{ id: "t1", name: "PT Test Logistics", contact: "021-000-0000", rating: 5.0 }],
    notification: null,
    isLoading: false,
  });
});

describe("useShipmentStore", () => {
  it("should assign a transporter to a shipment and update status", async () => {
    const { result } = renderHook(() => useShipmentStore());

    await act(async () => {
      await result.current.assignTransporter("SHP-TEST-01", "t1");
    });

    const updated = result.current.shipments.find((s) => s.id === "SHP-TEST-01");
    expect(updated.assignedTransporterId).toBe("t1");
    expect(updated.status).toBe("assigned");
  });

  it("should reject if shipment ID does not exist", async () => {
    const { result } = renderHook(() => useShipmentStore());

    await expect(
      act(async () => {
        await result.current.assignTransporter("SHP-NONEXISTENT", "t1");
      }),
    ).rejects.toThrow("Shipment not found");
  });

  it("getShipmentById should return the correct shipment", () => {
    const { result } = renderHook(() => useShipmentStore());
    const shipment = result.current.getShipmentById("SHP-TEST-01");
    expect(shipment).not.toBeNull();
    expect(shipment.origin).toBe("Jakarta");
  });

  it("getShipmentById should return null for unknown ID", () => {
    const { result } = renderHook(() => useShipmentStore());
    const shipment = result.current.getShipmentById("SHP-TEST-02");
    expect(shipment).toBeNull();
  });
});
