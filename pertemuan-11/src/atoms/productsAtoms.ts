import { Product } from "@/types/product";
import { atom } from "jotai";

export const productAtom = atom<Product[]>([])