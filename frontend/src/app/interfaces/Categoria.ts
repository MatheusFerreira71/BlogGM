export interface ItemCategoria {
  _id: string;
  titulo: string;
}

export interface Categoria {
  _id: string;
  titulo: string;
  subs: ItemCategoria[] | undefined;
}
