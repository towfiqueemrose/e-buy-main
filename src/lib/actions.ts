"use server";

import { auth } from "@/auth";
import { prisma } from "./client";
import { CartResult, user } from "@/types/types";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";


export const fetchCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        image: true
      },
      orderBy: {
        name: "asc", // Alphabetical ordering
      },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return an empty array in case of error
  }
}


export async function getSingleProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        image: true,
        quantity: true,
        price: true,
        details: true,
        moreDetails: true
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}


export async function getProductsByCategory(slug: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            image: true,
            price: true,
            details: true,
          },
        },
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

export async function getAllProducts() {
  try {
    const product = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        price: true,
        details: true,
      },
    },
    );

    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function getFlashSale() {
  try {
    const flashSale = await prisma.product.findMany({
      where: {
        oldPrice: { not: null },
      },
      select: {
        id: true,
        name: true,
        image: true,
        price: true,
        oldPrice: true,
      },
    },
    );

    if (!flashSale) {
      throw new Error("Flash Sale Products not found");
    }
    return flashSale;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

export async function getForYou() {
  try {
    const product = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        price: true,
        details: true,
      },
      orderBy: {
        id: "desc",
      },
      take: 10
    },
    );

    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function getUserData(email: string): Promise<user> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        name: true,
        email: true,
        phone: true,
        image: true,
        address: true,
      },
    });

    return user as user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data");
  }
}


export async function addToCart(productId: string) {
  try {
    const session = await auth();

    // More specific check for auth
    if (!session || !session.user?.id) {
      return { error: "Please login first", requiresAuth: true };
    }

    const userId = session.user.id;

    // Validate product exists
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return { error: "Product not found" };
    }

    // Get or create cart using transaction
    //tx is shorter form of transaction
    const result = await prisma.$transaction(async (tx) => {
      let cart = await tx.cart.findFirst({
        where: { userId }
      });

      if (!cart) {
        cart = await tx.cart.create({
          data: { userId }
        });
      }

      // Check for existing cart item
      const existingItem = await tx.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId
        }
      });

      if (existingItem) {
        return { error: "Item already in cart" };
      }

      // Add new cart item
      await tx.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity: 1
        }
      });

      return { success: true };
    });

    revalidatePath('/cart');
    revalidatePath('/products/[id]');

    return result;

  } catch (error) {
    console.error('Add to cart error:', error);
    return { error: "Failed to add to cart" };
  }
}


export async function isInCart(productId: string): Promise<boolean> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return false;
    }

    const cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: {
        items: {
          where: { productId }
        }
      }
    });

    return (cart?.items ?? []).length > 0;
  } catch (error) {
    console.error('Check cart error:', error);
    return false;
  }
}


export async function getCartItem(productId: string) {
  try {
    const session = await auth();

    // More specific check for auth
    if (!session || !session.user?.id) {
      return { error: "Please login first", requiresAuth: true };
    }

    const userId = session.user.id;

    // Validate product exists
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return { error: "Product not found" };
    }

    // Get or create cart using transaction
    const result = await prisma.$transaction(async (tx) => {
      let cart = await tx.cart.findFirst({
        where: { userId }
      });

      if (!cart) {
        cart = await tx.cart.create({
          data: { userId }
        });
      }

      // Check for existing cart item
      const existingItem = await tx.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId
        }
      });

      if (existingItem) {
        return { error: "Item already in cart" };
      }

      await tx.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity: 1
        }
      });

      return { success: true };
    });

    revalidatePath('/cart');
    revalidatePath('/products/[id]');

    return result;

  } catch (error) {
    console.error('Add to cart error:', error);
    return { error: "Failed to add to cart" };
  }
}

export async function getCartItems(userId: string): Promise<CartResult> {
  try {
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                image: true,
                price: true
              }
            }
          }
        }
      }
    });

    if (!cart) {
      return { items: [] };
    }

    return {
      items: cart.items.map(item => ({
        id: item.id,
        quantity: item.quantity,
        product: {
          id: item.product.id,
          name: item.product.name,
          image: item.product.image,
          price: item.product.price
        }
      }))
    };
  } catch {
    return { items: [], error: 'Failed to fetch cart items' };
  }
}

export async function updateCartItemQuantity(cartItemId: string, quantity: number) {
  try {
    await prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity,
      },
    });

    revalidatePath('/cart');
  } catch (error) {
    console.error('update cart items error:', error);
    return { error: "Failed to update cart items" };
  }
}

export async function removeFromCart(cartItemId: string) {
  try {
    await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });

    revalidatePath('/cart');
  } catch (error) {
    console.error('remove cart items error:', error);
    return { error: "Failed to remove item from cart" };
  }
}

export async function getCartItemCount(userId: string): Promise<number> {
  try {
    // First find the user's cart
    const cart = await prisma.cart.findFirst({
      where: {
        userId: userId
      },
      include: {
        items: true
      }
    });

    if (!cart) {
      return 0;
    }

    // Sum up the quantities of all items in the cart
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return itemCount;
  } catch (error) {
    console.error('Error getting cart item count:', error);
    return 0;
  }
}

export async function updateUserProfile(data: {
  name: string;
  phone: string;
  address: string;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    await prisma.user.update({
      where: { 
        id: session.user.id 
      },
      data: {
        name: data.name,
        phone: data.phone,
        address: data.address
      }
    });

    revalidatePath('/profile');
    return { success: true };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { success: false, error: 'Failed to update profile' };
  }
}

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const order = await prisma.order.findFirst({
      where: {
        userId: session.user.id
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
} 

export async function getOrders(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true }
  });

  if (!user) {
    return [];
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    include: {
      items: {
        include: {
          product: {
            select: {
              name: true,
              image: true,
              price: true,
            },
          },
        },
      },
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return orders;
}

export async function getOrderById(orderId: string) {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      items: {
        include: {
          product: {
            select: {
              name: true,
              image: true,
              price: true,
            },
          },
        },
      },
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return order;
}

export async function createOrder(data: {
  userId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  shippingFee: number;
  total: number;
  deliveryAddress: string;
  voucherCode?: string;
  voucherAmount?: number;
}) {
  const order = await prisma.order.create({
    data: {
      userId: data.userId,
      subtotal: data.subtotal,
      shippingFee: data.shippingFee,
      total: data.total,
      deliveryAddress: data.deliveryAddress,
      voucherCode: data.voucherCode,
      voucherAmount: data.voucherAmount,
      items: {
        create: data.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }))
      }
    },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  return order;
}