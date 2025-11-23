export interface Producto {
  id: number;
  imageSrc: string;
  additionalImages?: string[];
  productName: string;
  category: string;
  description: string;
  price: number;
  stock?: number;
  stars?: number;
  color?: string;
  size?: string[];
  gender?: string;
  variants?: number[];
}
// cargar todas las imágenes en src/assets/images/productos y mapear a filenames -> url
const images = import.meta.glob('./images/productos/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const imagesMap: Record<string, string> = {};
for (const p in images) {
  const fname = p.split('/').pop() as string;
  // console.log(p);
   // ejemplo: "producto-1.jpg"
  imagesMap[fname] = images[p];
}
const importCoverImage = (id: number) => {
  const filename = `producto-${id}.jpeg`;
  // devuelve la URL resuelta por el bundler, o fallback a ruta pública si no existe
  return imagesMap[filename] ?? ``;
}
const importAditionalImages = (id: number) => {
  const imagesList: string[] = [];
  let index = 1;
  while (true) {
    const filename = `producto-${id}-${index}.jpeg`;
    if (imagesMap[filename]) {
      imagesList.push(imagesMap[filename]);
      index++;
    } else {
      break;
    }
  }
  return imagesList;
}
export const listaProductos : Producto[] = [
  {
    id: 1,
    imageSrc:
      importCoverImage(1),
    productName: "Cojín decorativo dorado",
    category: "Cojines",
    description: `Tela Velvet. Relleno de fibra siliconada. 40 cm de diámetro.`,
    price: 12000,
    stock: 10,
    stars: 5,
    color: "Dorado",
    variants: [2]
  },
  {
    id: 2,
    imageSrc:
      importCoverImage(2),
    productName: "Cojín decorativo blanco",
    category: "Cojines",
    description: `Tela Velvet. Relleno de fibra siliconada. 40 cm de diámetro.`,
    price: 12000,
    stock: 10,
    stars: 5,
    color: "Blanco",
    variants: [1]
  },
  {
    id: 3,
    imageSrc:
      importCoverImage(3),
    productName: "Buzo en franela algodón",
    category: "Ropa",
    description: `Buzo oversize en franela de algodón. Disponible en tallas S, M, L y XL.`,
    price: 30000,
    gender: "Mujer",
    size: ["S", "M", "L", "XL"],
    stock: 15,
    stars: 4,
    additionalImages: importAditionalImages(3)
  },
  {
    id: 4,
    imageSrc:
      importCoverImage(4),
    productName: "Monedero en tela Lona Española",
    category: "Accesorios",
    description: `Monedero confeccionado en tela Lona Española, con cierre metálico y forro interior.`,
    price: 3500,
    stock: 20,
    stars: 3
  },
  {
    id: 5,
    imageSrc:
      importCoverImage(5),
    productName: "Ropa para tu mascota",
    category: "Mascotas",
    description: `Conjunto de ropa para mascotas pequeñas, se pueden confeccionar prendas a medida.`,
    price: 15000,
    stock: 8,
    stars: 4,
    additionalImages: importAditionalImages(5)
  }
  
];
export const getTopRatedProducts = () => {
  return listaProductos
    .sort((a, b) => (b?.stars ?? 0) - (a?.stars ?? 0))
    .slice(0, 4);
};
export const valorAPesosChilenos = (valor: number) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(valor);
};
