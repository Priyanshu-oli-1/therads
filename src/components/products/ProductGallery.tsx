"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/types/product";

type ProductGalleryProps = {
  product: Product;
};

export default function ProductGallery({
  product,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(product.image);

  // The current Product model only has one image.
  // We repeat it for the gallery UI until multiple images are added.
  const galleryImages = [
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  return (
    <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-4 sm:grid-cols-[76px_minmax(0,1fr)] lg:gap-5">
      {/* Thumbnail column */}
      <div className="flex flex-col gap-4">
        {galleryImages.map((image, index) => {
          const isSelected = selectedImage === image && index === 0;

          return (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedImage(image)}
              aria-label={`View product image ${index + 1}`}
              className={`relative aspect-[3/4] overflow-hidden bg-gray-100 transition ${
                isSelected
                  ? "ring-1 ring-black"
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`${product.name} image ${index + 1}`}
                fill
                sizes="76px"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>

      {/* Main product image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <Image
          src={selectedImage}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 1023px) 70vw, 45vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}