// sanity/lib/products/searchProductsByName.ts
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live"; // your configured fetch function

const searchProductsByName = async (searchParam: string) => {
  const PRODUCTS_SEARCH_QUERY = defineQuery(`
    *[
      _type == "product" &&
      name match $searchParam
    ] | order(name asc)
  `);

  try {
    const products = await sanityFetch({
      query: PRODUCTS_SEARCH_QUERY,
      params: {
        searchParam: `${searchParam}*`,
      },
      tags: ["products", `search:${searchParam}`], // optional caching tags
    });

    return products.data || [];
  } catch (error) {
    console.error("Error fetching products by search:", error);
    return [];
  }
};

export default searchProductsByName;
