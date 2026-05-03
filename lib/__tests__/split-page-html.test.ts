import { describe, expect, it } from "vitest";
import {
  getMenuRouteInnerMainHtml,
  getMenuRouteLeadAndRestInnerMainHtml,
  splitHomeMainAroundOurMenu,
  splitMenuInnerHtmlLeadRest,
  stripHomeMarqueeSection
} from "@/lib/split-page-html";
import { HOME_ABOUT_SECTION_MARKER, OUR_MENU_SLOT_HTML } from "@/lib/our-menu-slot";

describe("splitHomeMainAroundOurMenu", () => {
  it("splits on our-menu slot when present", () => {
    const inner = [
      "<p>before</p>",
      `${HOME_ABOUT_SECTION_MARKER}></section>`,
      OUR_MENU_SLOT_HTML,
      "<p>after</p>"
    ].join("");
    const main = `<main class="main-wrapper">${inner}</main>`;
    const { part1, part2, part3 } = splitHomeMainAroundOurMenu(main);
    expect(part1).toContain("before");
    expect(part2).toContain("section_home-about");
    expect(part3).toContain("after");
    expect(part2).not.toContain("our-menu-slot");
  });
});

describe("stripHomeMarqueeSection", () => {
  it("removes balanced section_home-marquee", () => {
    const html =
      '<p>a</p><section class="section_home-marquee"><div class="x"></div></section><p>b</p>';
    const out = stripHomeMarqueeSection(html);
    expect(out).toContain("<p>a</p>");
    expect(out).toContain("<p>b</p>");
    expect(out).not.toContain("section_home-marquee");
  });

  it("returns input when marquee absent", () => {
    const html = "<p>only</p>";
    expect(stripHomeMarqueeSection(html)).toBe(html);
  });
});

describe("splitMenuInnerHtmlLeadRest", () => {
  it("extracts testimonials section as lead", () => {
    const inner = '<section class="section_testimonials"><div>Hi</div></section><p>Tail</p>';
    const { lead, rest } = splitMenuInnerHtmlLeadRest(inner);
    expect(lead).toContain("section_testimonials");
    expect(lead).toContain("Hi");
    expect(rest).toContain("Tail");
    expect(rest).not.toContain("testimonials");
  });

  it("returns full inner as rest when testimonials missing", () => {
    const inner = "<p>Only</p>";
    const { lead, rest } = splitMenuInnerHtmlLeadRest(inner);
    expect(lead).toBe("");
    expect(rest).toBe(inner);
  });
});

describe("getMenuRouteInnerMainHtml", () => {
  it("unwraps main-wrapper div", () => {
    const html = '<div class="main-wrapper"><p>Inner</p></div>';
    expect(getMenuRouteInnerMainHtml(html)).toBe("<p>Inner</p>");
  });
});

describe("getMenuRouteLeadAndRestInnerMainHtml", () => {
  it("strips legacy section_menu then splits lead", () => {
    const legacy =
      '<div class="main-wrapper"><section class="section_menu"><div></div></section><section class="section_testimonials"></section><footer></footer></div>';
    const { lead, rest } = getMenuRouteLeadAndRestInnerMainHtml(legacy);
    expect(lead).toContain("section_testimonials");
    expect(rest).toContain("footer");
  });
});
