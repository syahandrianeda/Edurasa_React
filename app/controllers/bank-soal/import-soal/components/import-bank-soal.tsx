type Props = {
    onUpload(
        file: File
    ): Promise<void>;
};

export function UploadDocx({
    onUpload,
}: Props) {
    async function handleChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const file =
            e.target.files?.[0];

        if (!file) {
            return;
        }

        await onUpload(file);
    }

    return (
        <input
            type="file"
            accept=".docx"
            onChange={handleChange}
        />
    );
}