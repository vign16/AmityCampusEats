import { useState } from "react";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/menuData";

interface MenuCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const MenuCategories = ({ activeCategory, onCategoryChange }: MenuCategoriesProps) => {
  return (
    <div className="flex justify-center gap-2 md:gap-4 mb-8 overflow-x-auto py-2 px-4">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`category-button whitespace-nowrap px-5 py-2 rounded-full border-2 border-primary 
            font-poppins font-medium transition-colors
            ${activeCategory === category.id 
              ? 'bg-primary text-white' 
              : 'bg-transparent text-primary'}`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default MenuCategories;
