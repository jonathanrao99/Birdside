import { describe, expect, it } from "vitest";
import { pathIsActive } from "@/lib/path-active";

describe("pathIsActive", () => {
  it("matches home only for exact /", () => {
    expect(pathIsActive("/", "/")).toBe(true);
    expect(pathIsActive("/menu", "/")).toBe(false);
  });

  it("matches prefix routes", () => {
    expect(pathIsActive("/product/foo", "/product")).toBe(true);
    expect(pathIsActive("/product", "/product")).toBe(true);
  });

  it("ignores tel and http", () => {
    expect(pathIsActive("/", "tel:+1")).toBe(false);
    expect(pathIsActive("/", "https://x.com")).toBe(false);
  });
});
