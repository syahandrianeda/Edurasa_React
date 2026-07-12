import { describe, expect, it } from "vitest";

import { TaksonomiMatcher } from "../domain/taksonomi/services/TaksonomiMatcher";
import type { Taksonomi } from "../domain/taksonomi/entities/Taksonomi";

describe("TaksonomiMatcher", () => {

    const data: Taksonomi[] = [
        {
            kko: "mengidentifikasi",
            type: "C2",
            LK: "LK2",
        },
        {
            kko: "memberikan alasan",
            type: "C3",
            LK: "LK2",
        },

    ];

    it("should find taksonomi from indicator text", () => {

        const matcher = new TaksonomiMatcher(data);

        const result = matcher.find(
            "Siswa dapat mengidentifikasi organ tubuh manusia."
        );

        expect(result).toEqual(data[0]);

    });

    it("should ignore uppercase letters", () => {

    const matcher = new TaksonomiMatcher(data);

    const result = matcher.find(
        "SISWA DAPAT MENGIDENTIFIKASI ORGAN."
    );

    expect(result).toEqual(data[0]);

});

it("should ignore multiple spaces", () => {

    const matcher = new TaksonomiMatcher(data);

    const result = matcher.find(
        "Siswa      dapat        mengidentifikasi"
    );

    expect(result).toEqual(data[0]);

});

    it("should find multi-word kko", () => {

        const matcher = new TaksonomiMatcher(data);

        const result = matcher.find(
            "Siswa dapat memberikan alasan terhadap jawabannya."
        );

        expect(result).toEqual(data[1]);

    });
    it("should return undefined when no kko matches", () => {

    const matcher = new TaksonomiMatcher(data);

    const result = matcher.find(
        "Siswa dapat bermain sepak bola."
    );

    expect(result).toBeUndefined();

});

    it("should find all matched kko", () => {

        const matcher = new TaksonomiMatcher([
            {
                kko: "mengidentifikasi",
                type: "C2",
                LK: "LK2",
            },
            {
                kko: "menganalisis",
                type: "C4",
                LK: "LK3",
            },
            {
                kko: "memberikan alasan",
                type: "C3",
                LK: "LK2",
            },
        ]);

        const result = matcher.findAll(
            "Siswa dapat mengidentifikasi, menganalisis, dan memberikan alasan."
        );

        expect(result).toHaveLength(3);

        expect(result[0].item.kko)
            .toBe("mengidentifikasi");

        expect(result[1].item.kko)
            .toBe("menganalisis");

        expect(result[2].item.kko)
            .toBe("memberikan alasan");

    });
    it("should return match position", () => {

        const matcher = new TaksonomiMatcher([
            {
                kko: "mengidentifikasi",
                type: "C2",
                LK: "LK2",
            },
        ]);

        const result = matcher.findAll(
            "Siswa dapat mengidentifikasi organ tubuh."
        );

        expect(result[0].start)
            .toBeGreaterThan(0);

        expect(result[0].end)
            .toBeGreaterThan(result[0].start);

        expect(result[0].text)
            .toBe("mengidentifikasi");

    });
    it("should return true when text contains kko", () => {

        const matcher = new TaksonomiMatcher([
            {
                kko: "mengidentifikasi",
                type: "C2",
                LK: "LK2",
            },
        ]);

        expect(
            matcher.has(
                "Siswa dapat mengidentifikasi organ tubuh."
            ),
        ).toBe(true);

    });
    it("should return false when text does not contain kko", () => {

        const matcher = new TaksonomiMatcher([
            {
                kko: "mengidentifikasi",
                type: "C2",
                LK: "LK2",
            },
        ]);

        expect(
            matcher.has(
                "Siswa bermain sepak bola."
            ),
        ).toBe(false);

    });
});