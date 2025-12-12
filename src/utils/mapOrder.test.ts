import { mapOrder } from "~/utils/mapOrder";

describe("Unit Test: mapOrder():", () => {
  it("Should return [] if originalArray is empty ", () => {
    expect(mapOrder(null as any, [1, 2, 3], "4")).toEqual([]);
  });
  it("Should return [] if orderArray is empty ", () => {
    expect(mapOrder([1, 2, 3], null as any, "4")).toEqual([]);
  });
  it("Should return [] if orderArray is empty ", () => {
    expect(mapOrder([1, 2, 3], [2, 3, 4], "")).toEqual([]);
  });
  it("Should sort array by given order(orderArray)", () => {
    const originalArray = [
      { id: 4, name: "A" },
      { id: 3, name: "B" },
      { id: 1, name: "C" },
      { id: 2, name: "D" },
    ];
    const orderArray = [1, 2, 3, 4];
    const key = "id";
    expect(
      mapOrder(originalArray, orderArray, key).map((item) => item.id)
    ).toEqual([1, 2, 3, 4]);
  });
  it("Should sort the array according to the given order, placing items not in the order list at the end while preserving their original relative order.", () => {
    const originalArray = [
      { id: 4, name: "A" },
      { id: 3, name: "B" },
      { id: 7, name: "K" },
      { id: 1, name: "C" },
      { id: 2, name: "D" },
      { id: 6, name: "E" },
    ];
    const orderArray = [1, 2, 3, 4];
    const key = "id";
    expect(
      mapOrder(originalArray, orderArray, key).map((item) => item.id)
    ).toEqual([1, 2, 3, 4, 7, 6]);
  });
  it("Should sort the array according to the given order, using custom key ", () => {
    const originalArray = [
      { id: 4, name: "A" },
      { id: 3, name: "B" },
      { id: 1, name: "C" },
      { id: 2, name: "D" },
    ];
    const orderArray = ["C", "B", "A", "D"];
    const key = "name";
    expect(
      mapOrder(originalArray, orderArray, key).map((item) => item.name)
    ).toEqual(["C", "B", "A", "D"]);
  });
  it("Should return the original array unchanged If none of the items match the order list", () => {
    const originalArray = [
      { id: 4, name: "A" },
      { id: 3, name: "B" },
      { id: 1, name: "C" },
      { id: 2, name: "D" },
    ];
    const orderArray = [5,6,7,8];
    const key = "id";
    expect(
      mapOrder(originalArray, orderArray, key).map((item) => item.id)
    ).toEqual([4,3,1,2]);
  });
});
