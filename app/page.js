"use client";

import { useState, useEffect } from "react";
import { Filters } from "@/components/Filters";
import { ProductCard } from "@/components/ProductCard";

export default function Home() {
  const [filtrado, setFiltrado] = useState([]); //Cree una nueva variable con el fin de manejar los filtros y no dañar lo original
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {  //No pude realizarlo con un método, investigue un poquito en una documentacion sobre useEffect de que podia simular funciones
  let resultado = [...products]; //hacer una copia limpia de los productos originales para no dañarlos

  if (searchText.trim()) { //buscar, si hay algo en el e.target.value
    resultado = resultado.filter((p) =>
      p.title.toLowerCase().includes(searchText.toLowerCase()) //método de buscar por titulo, 
      // con el equivalente minuscula para no entrar en conflicto con mayusculas, investigado en documentacion JavaScript
    );
  }

  if (sortBy === "price-asc") { //ordenar
    resultado.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    resultado.sort((a, b) => b.price - a.price);
  }

  if (category !== "") { //siempre y cuando tengan una categoría
    resultado = resultado.filter((p) => p.category === category); //buscar por categoria
  }

  setFiltrado(resultado);
}, [products, searchText, category, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-6">
          <h1 className="text-4xl font-bold">Tienda</h1>
          
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full h-10 px-4 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <Filters category={category}
            setCategory={setCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}/>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtrado.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

