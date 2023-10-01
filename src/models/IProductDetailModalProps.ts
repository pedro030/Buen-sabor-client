import { MProduct } from "./MProduct";

export interface IProductDetailModalProps {
    product: MProduct;
    isOpen: boolean;
    onClose: () => void;
  }