export class TextNormalizer {

    /**
     * Mengubah teks menjadi bentuk yang konsisten
     * untuk kebutuhan pencarian.
     */
    normalize(text: string): string {

        return text
            .normalize("NFC")
            .toLowerCase()
            .replace(/\r\n/g, "\n")
            .replace(/\r/g, "\n")
            .replace(/\t/g, " ")
            .replace(/\n+/g, " ")
            .replace(/\s+/g, " ")
            .trim();

    }

}