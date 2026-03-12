import { CustomExportButton } from "./CustomExportButton";

describe("CustomExportButton", () => {
  test("should export CustomExportButton component", () => {
    expect(CustomExportButton).toBeDefined();
    expect(typeof CustomExportButton).toBe("function");
  });

  test("component should have correct name", () => {
    expect(CustomExportButton.name).toBe("CustomExportButton");
  });
});
