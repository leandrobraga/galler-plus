import { useCallback, useState } from "react";
import IconSearch from "../assets/icons/search.svg?react";
import usePhotos from "../contexts/photos/hooks/use-photos";
import { debounce } from "../helpers/utils";
import InputText from "./input-text";

export default function PhotoSearch() {
  const [inputValue, setInputValue] = useState("");
  const { filters } = usePhotos();

  const debouncedSetValue = useCallback(
    debounce((value: string) => filters.setQ(value), 200),
    [],
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setInputValue(value);
    debouncedSetValue(value);
  }

  return (
    <InputText
      icon={IconSearch}
      placeholder="Buscar fotos"
      className="flex-1"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
}
