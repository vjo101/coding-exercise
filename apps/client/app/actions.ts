'use server'

import { revalidateTag, revalidatePath } from "next/cache";

export async function postData(url = "", data = {}) {
    const res = await fetch(url, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // revalidateTag('purchaseOrder');
    revalidatePath('/purchase-orders/page');
    return res.json();
  }