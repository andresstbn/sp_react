"use client"
//a
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Filters({ category, setCategory, sortBy, setSortBy }) {
  return (
    <div className="flex flex-wrap gap-4">
      <Select value={category || undefined} onValueChange={setCategory}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Todas las categorías" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="men's clothing">Ropa de hombre</SelectItem>
          <SelectItem value="jewelery">Joyas</SelectItem>
          <SelectItem value="electronics">Electrónica</SelectItem>
          <SelectItem value="women's clothing">Ropa de mujer</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sortBy || undefined} onValueChange={setSortBy}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
          <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

