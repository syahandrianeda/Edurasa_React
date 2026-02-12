type fontValueLabel = {
  label: string, 
  value: string;
}

export const FONT_CLASSES_DOMAIN : fontValueLabel[]= [
  {
    label: 'Sans (default)', value: 'font-sans',
  },
  {
    label:'Serif', value:'font-serif'
  },
  {
    label: 'Monospace', value: 'font-mono'
  },
  {
    label: 'Times New Roman', value: 'font-times-new-roman'
  },
  {
    label: 'Arial', value: 'font-arial'
  }
];

export const FONT_CLASSES = FONT_CLASSES_DOMAIN.map(f => f.value) as readonly string[]
const OFFICE_FONT_SIZE_MAP: Record<number|string, string> = {
  8: 'text-xs/4',   //'text-xs/4',
  9: 'text-xs/4',   //'text-xs/4',
  10: 'text-sm',    // 'text-xs/5',
  11: 'text-sm/5',    // 'text-sm/5',
  12: 'text-base',    // 'text-base/6',
  14: 'text-lg',    // 'text-sm/6',
  16: 'text-xl',    // 'text-base/7',
  18: 'text-2xl',    // 'text-lg/7',
  20: 'text-3xl',    // 'text-xl/7',
  24: 'text-4xl',   // 'text-2xl/8',
  30: 'text-5xl',   // 'text-3xl/9',
  36: 'text-6xl',    // 'text-4xl/10',
}

export const FONT_SIZE_CLASSES = Array.from(
  new Set(Object.values(OFFICE_FONT_SIZE_MAP))
) as readonly string[]

export function replaceClassInGroup(
  classNames: string[],
  group: readonly string[],
  next?: string
): string[] {
  // 1. buang SEMUA class yang termasuk grup
  const cleaned = classNames.filter(c => !group.includes(c))

  // 2. jika tidak ada nilai baru → selesai
  if (!next) {
    return cleaned
  }

  // 3. tambahkan nilai baru (tanpa duplikat)
  return [...cleaned, next]
}

export function SelectFont({
    value,
    onChange
    }: {
    value?: string
    onChange: (value?: string) => void
    }) {
    return (
        <select
        className="text-xs bg-white  text-black rounded px-1"
        value={value ?? ''}
        onChange={e => onChange(e.target.value || undefined)}
        >
            {/* <option value="">Font</option> */}
            {
              FONT_CLASSES_DOMAIN.map((font, i)=>(
                  <option key={font.value} value={font.value}>{font.label}</option>
              ))
            }
            
        </select>
    )
}

export function SelectSizeFont({
    value,
    onChange
    }: {
    value?: string
    onChange: (v?: string) => void
    }) {

    return (
        <select
        className="text-xs bg-white text-black rounded px-1 font-times-new-roman "
        value={value ?? ''}
        onChange={e => onChange(e.target.value || undefined)}
        >
          {/* <option value="">Size</option> */}
          {
            Object.entries(OFFICE_FONT_SIZE_MAP).map(([size, className]) => (
              <option key={size} value={className}>
                {size}
              </option>
            ))
          }
          {/* <option value="text-xs">XS</option>
          <option value="text-sm">SM</option>
          <option value="text-base">Base</option>
          <option value="text-lg">LG</option>
          <option value="text-xl">XL</option> */}
        </select>
    )
}


