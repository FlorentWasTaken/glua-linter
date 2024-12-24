export function trailingSpaceRule(code: string): { line: number, message: string }[] {
    const errors: { line: number, message: string }[] = []

    const lines = code.split('\n')

    lines.forEach((line, index) => {
        if (/\s+$/.test(line)) {
            errors.push({
                line: index,
                message: `Trailing spaces found at the end of line ${index}.`,
            })
        }
    })

    return errors;
}
