import { describe, expect, it } from "vitest";
// import { TaksonomiMatcher, type Taksonomi } from "~/domain/taksonomi";
// import { TaksonomiMatcher } from "~/domain/taxonomi";

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
            kko: "menganalisis",
            type: "C4",
            LK: "LK3",
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

        expect(result).toBeDefined();

        expect(result?.kko)
            .toBe("mengidentifikasi");

        expect(result?.type)
            .toBe("C2");

        expect(result?.LK)
            .toBe("LK2");

    });

});