import { Product } from "@/types/product";
import { atom } from "jotai";

export const cartAtom = atom<Product[]>([])