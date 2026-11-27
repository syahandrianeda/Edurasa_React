
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type SelectionNavigatorProps<T> = {
  options: T[];
  value: T | null;
  getValue: (item: T) => string;
  getLabel: (item: T) => string;
  onValueChange: (item: T) => void;
};

export function SelectionNavigator<T>({
  options,
  value,
  getValue,
  getLabel,
  onValueChange,
}: SelectionNavigatorProps<T>) {
  const currentIndex = options.findIndex( (item) => value !== null && getValue(item) === getValue(value) );

  const handlePrevious = () => { if (currentIndex > 0) { onValueChange(options[currentIndex - 1]); } };

  const handleNext = () => {
    if ( currentIndex >= 0 && currentIndex < options.length - 1 ) {
      onValueChange(options[currentIndex + 1]);
    }
  };

  const handleSelect = (selectedValue: string) => {
    const selectedItem = options.find( (item) => getValue(item) === selectedValue );

    if (selectedItem !== undefined) {
      onValueChange(selectedItem);
    }
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handlePrevious}
        disabled={currentIndex <= 0}
      >
        <ChevronLeft />
      </Button>

      <Select
        value={
          value !== null ? getValue(value) : undefined
        }
        onValueChange={handleSelect}
        disabled={options.length === 0}
      >
        <SelectTrigger className="flex-1 bg-white dark:text-black">
          <SelectValue placeholder="Pilih data" />
        </SelectTrigger>

        <SelectContent>
          {options.map((item) => (
            <SelectItem
              key={getValue(item)}
              value={getValue(item)}
            >
              {getLabel(item)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleNext}
        disabled={
          currentIndex < 0 ||
          currentIndex >= options.length - 1
        }
      >
        <ChevronRight />
      </Button>
    </div>
  );
}