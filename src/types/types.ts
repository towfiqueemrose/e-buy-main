export interface user {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  address?: string | null;
  phone?: string | null;
  deliveryAddress?: string | null;
}

export interface UpdateUserFormProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: user;
  onUpdate?: (userData: user) => void;
}

export interface CategoryTypes {
  id: string;
  slug: string;
  image: string;
  name: string;
}

// Base interface for product details
export interface BaseProductDetails {
  name: string;
  price: number;
  image: string | null;
  details?: string | null;  // Made both optional and nullable
}

export interface ProductCardTypes extends BaseProductDetails {
  id: string;
}

export interface ProductTypes extends BaseProductDetails {
  quantity: string;
  moreDetails: string;
}

export interface ProductListProps extends BaseProductDetails {
  id: string;
}

export interface FlashSaleTypes {
  id: string;
  name: string;
  price: number;
  image: string | null;
  oldPrice: number | null;
}

export interface FlashSaleProductTypes {
  id: string;
  name: string;
  price: number;
  image: string | null;
  oldPrice: number | null;
}

export interface AddToCartProps {
  productId: string;
  isAdded: boolean;
}

// types/types.ts
export interface CartProduct {
  id: string;
  name: string;
  image: string;
  price: number;
}

export interface CartItem {
  id: string;
  quantity: number;
  product: CartProduct;
}

export interface CartResult {
  items: CartItem[];
  error?: string;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
}

export interface CartItemProps {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  initialQuantity: number;
}

export interface CartResult {
  items: CartItem[];
}

export interface OrderItemProps {
  order: {
    id: string;
    createdAt: Date;
    total: number;
    items: {
      id: string;
      quantity: number;
      price: number;
      product: {
        name: string;
        image: string;
      };
    }[];
  };
};;