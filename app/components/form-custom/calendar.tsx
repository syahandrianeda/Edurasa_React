import * as React from "react"
import { Input } from "../ui/input"
import {  formatDisplayInput, parseBackendISO } from "~/lib/date-helper"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"
import { cn } from "~/lib/utils"

export interface CalendarProps{
    id: string,
    label: string,
    currentDate: Date,
    handleChangeDate: (value:Date|string)=>void
    name?: string,
    placeholder?: string
    className?:string
}

export function CalendarPicker({
    id,
    label,
    name,
    currentDate,
    handleChangeDate,
    placeholder,
    className
}: CalendarProps){
const [open, setOpen] = React.useState(false)

  // Local state agar UI langsung responsif ketika user memilih tanggal
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(() =>
    parseBackendISO(currentDate)
  )
  const [month, setMonth] = React.useState<Date | undefined>(() =>
    parseBackendISO(currentDate)
  )

  // Sinkronkan jika parent mengubah nilai dari luar (mis. hasil validasi/save)
  React.useEffect(() => {
    const parsed = parseBackendISO(currentDate)
    setSelectedDate(parsed)
    // kalau parsed ada, ikuti; kalau tidak ada, jangan paksa ganti bulan (biar posisi kalender tetap)
    if (parsed) setMonth(parsed)
  }, [currentDate])

  // Supaya "klik dropdown bulan/tahun" tidak menutup popover (terutama saat di dalam Modal/Dialog)
  const preventInteractOutside = (e: Event) => {
    e.preventDefault()
  }

  const onSelectDate = (d?: Date) => {
    setSelectedDate(d)          // render ulang langsung
    if (d) {
      setMonth(d)               // sinkron bulan yang ditampilkan
      //Jika pake Laravel, paramaternya dibikin formatBackendIso
      handleChangeDate(d) // kirim ke parent dalam format backend
    } else {
      handleChangeDate('')          // clear
    }
    setOpen(false)              // tutup setelah pilih tanggal
  }


    return (
        <div className={cn("flex flex-col gap-0 w-fit relative mt-4", className)}>
            <label htmlFor={id} className="absolute peer px-1 left-1 -top-2 text-xs z-100 text-gray-500 bg-white dark:bg-gray-700 dark:text-sky-100 w-fit rounded-t-xl text-[12px]">
                {label}
            </label>
            <div className="relative flex gap-2">
                <Input
                    id={id}
                    value={formatDisplayInput(selectedDate)}
                    placeholder={placeholder}
                    readOnly
                    className="bg-white dark:bg-gray-700 dark:text-sky-100 pr-10 border-0 text-sky-800 focus-visible:ring-0 focus:border-0 focus:outline-none"
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                        e.preventDefault()
                        setOpen(true)
                        }
                    }}
                    />

                <Popover open={open} onOpenChange={setOpen} modal>
                <PopoverTrigger asChild>
                    <Button
                    variant="ghost"
                    className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                    aria-label="Open date picker"
                    >
                    <CalendarIcon className="size-3.5" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    className="w-auto p-0 overflow-hidden"
                    align="end"
                    side="bottom"
                    sideOffset={10}
                    // onInteractOutside={preventInteractOutside}
                >
                    <Calendar
                    mode="single"
                    selected={selectedDate}
                    month={month}
                    captionLayout="dropdown"
                    onMonthChange={setMonth}
                    onSelect={onSelectDate}
                    className="bg-white"
                    disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                            }
                    />
                </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

export function CalendarPickerKaldik({
    id,
    label,
    name,
    currentDate,
    handleChangeDate,
    placeholder,
    className
}: CalendarProps){
const [open, setOpen] = React.useState(false)

  // Local state agar UI langsung responsif ketika user memilih tanggal
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(() =>
    parseBackendISO(currentDate)
  )
  const [month, setMonth] = React.useState<Date | undefined>(() =>
    parseBackendISO(currentDate)
  )

  // Sinkronkan jika parent mengubah nilai dari luar (mis. hasil validasi/save)
  React.useEffect(() => {
    const parsed = parseBackendISO(currentDate)
    setSelectedDate(parsed)
    // kalau parsed ada, ikuti; kalau tidak ada, jangan paksa ganti bulan (biar posisi kalender tetap)
    if (parsed) setMonth(parsed)
  }, [currentDate])

  // Supaya "klik dropdown bulan/tahun" tidak menutup popover (terutama saat di dalam Modal/Dialog)
  const preventInteractOutside = (e: Event) => {
    e.preventDefault()
  }

  const onSelectDate = (d?: Date) => {
    setSelectedDate(d)          // render ulang langsung
    if (d) {
      setMonth(d)               // sinkron bulan yang ditampilkan
      //Jika pake Laravel, paramaternya dibikin formatBackendIso
      handleChangeDate(d) // kirim ke parent dalam format backend
    } else {
      handleChangeDate('')          // clear
    }
    setOpen(false)              // tutup setelah pilih tanggal
  }


    return (
        <div className={cn("flex flex-col gap-0 w-fit relative mt-4", className)}>
            <label htmlFor={id} className="absolute peer px-1 left-1 -top-2 text-xs z-100 text-gray-500 bg-white dark:bg-gray-700 dark:text-sky-100 w-fit rounded-t-xl text-[12px]">
                {label}
            </label>
            <div className="relative flex gap-2">
                <Input
                    id={id}
                    value={formatDisplayInput(selectedDate)}
                    placeholder={placeholder}
                    readOnly
                    className="bg-white dark:bg-gray-700 dark:text-sky-100 pr-10 border-0 text-sky-800 focus-visible:ring-0 focus:border-0 focus:outline-none"
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                        e.preventDefault()
                        setOpen(true)
                        }
                    }}
                    />

                <Popover open={open} onOpenChange={setOpen} modal>
                <PopoverTrigger asChild>
                    <Button
                    variant="ghost"
                    className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                    aria-label="Open date picker"
                    >
                    <CalendarIcon className="size-3.5" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    className="w-auto p-0 overflow-hidden"
                    align="end"
                    side="bottom"
                    sideOffset={10}
                    // onInteractOutside={preventInteractOutside}
                >
                    <Calendar
                    mode="single"
                    selected={selectedDate}
                    month={month}
                    captionLayout="dropdown"
                    onMonthChange={setMonth}
                    onSelect={onSelectDate}
                    className="bg-white"
                    startMonth={new Date(2020,0)}
                    endMonth={new Date(new Date().getFullYear()+3,11)}
                    
                    />
                </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
