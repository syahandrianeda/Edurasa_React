import { toast } from "sonner";

interface CopyTextProps {
    text: string;
    children?: React.ReactNode;
    className?: string;
    successMessage?: string;
}

export default function CopyText({
    text,
    children,
    className = "",
    successMessage = "Teks berhasil disalin",
}: CopyTextProps) {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success(successMessage);
        } catch (error) {
            console.error("Gagal menyalin teks:", error);
            toast.error("Gagal menyalin teks");
        }
    };

    return (
        <span
            onClick={handleCopy}
            className={`inline cursor-pointer ${className}`}
            title="Klik untuk menyalin"
        >
            {children ?? text}
        </span>
    );
}