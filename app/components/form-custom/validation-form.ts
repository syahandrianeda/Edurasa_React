export function validateClosestForm(
    e: React.MouseEvent<HTMLElement>
): boolean {
    const form = e.currentTarget.closest('form')
    if (!form) return false

    if (!form.checkValidity()) {
        form.reportValidity()
        return false
    }

    return true
}
