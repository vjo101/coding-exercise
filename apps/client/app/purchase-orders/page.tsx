"use client"
//ToDo:
// how to update the table after pressing submit - look into revalidation (need to revalidate the path, knows data is changed)
// how to start the purchase_order_line_item array - add button adds a form row that has drop down for parent items
//have purchase order stuff at top, then place to add items that adds to a list
// every time you hit add, get data, add it to the line items in the page. When save 
// keep it on front end until they click save
// rememeber chanign arrays do not rerender the page since it is passed by reference (rest and spread)
// how to add
// const d = [ ...oldArray, "new thing"]
// How to output error fields
// https://www.youtube.com/watch?v=iZ5oHXu9z7U
// fix date stuff on creating purchase orders
// Make buttons more buttonier
// make listing pages, details page, creation page 
// why is the script having to time out when i post from another page
// make a new folder with (ID) AppRouter

// React hook forms
// I have installed react-hook-form

// use client tells react that it is a client side component instead of a server side. Need this to prevent an error with useForm

import { Item, PurchaseOrders, PurchaseOrderLineItems } from "@prisma/client"

import { useForm, SubmitHandler } from "react-hook-form"

import { revalidateTag } from "next/cache"

import { postData } from "../actions"

interface ParentItem {
  id: number;
  name: string;
  items: Item[];
}

async function getData(): Promise<PurchaseOrders[]> {
  const res = await fetch('http://localhost:3100/api/purchase-order', { next: { tags: ['purchaseOrders'] } });
  // const res = await fetch('http://localhost:3100/api/purchase-order', {cache: 'no-cache', method: "POST"});

  //console.log(res);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

async function deleteID(id: number) {
  const url = "http://localhost:3100/api/purchase-order/" + id;
  const res = await fetch(url, {
    method: "DELETE",
    cache: "no-cache",
  })
}

interface Inputs {
  vendor_name: string
  order_date: string
  expected_delivery_date: string

}


export default async function Index() {
  // the useForm definition has to be before the getData(0 else it will be breaking the Rules of hook)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }, //use the useState hook
  } = useForm<Inputs>();

  const data = await getData()

  // did I do this function right? Should it be an arrow function or normal function?
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    console.log(errors);
    console.log(JSON.stringify(data));
    postData("http://localhost:3100/api/purchase-order", data)
  }


  return (
    <>
      <h1 className="text-2xl">Purchase Orders</h1>
      <table className="border-collapse table-auto w-full text-sm">
        <thead>
          <tr>
            <th
              className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-left">Purchase Orders
            </th>
            <th
              className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-left">Line Items
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800">
          {data.map((purchaseOrder: PurchaseOrders) => (
            <tr key={purchaseOrder.id}>
              <td
                className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{purchaseOrder.vendor_name}
              </td>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                <ul>
                  {purchaseOrder.purchase_order_line_items.map((item: PurchaseOrderLineItems) => (
                    <li key={item.id}>{item.item_id} ({item.quantity})</li>
                  ))}
                </ul>
              </td>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                {/* have to make an inline function cause you cant pass args to a function in the on click */}
                <button onClick={() => deleteID(purchaseOrder.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("vendor_name", { required: "This is required." })} className="w-full py-3 px-3 leading-tight border rounded"
          placeholder="Vendor Name"
        />
        {errors.vendor_name && <p>{errors.vendor_name.message}</p>}
        <input type="date" {...register("order_date", { required: "This is required." })} className="w-full py-3 px-3 leading-tight border rounded"
          placeholder="Order Date"
        />
        <p>{errors.order_date?.message}</p>
        <input type="date" {...register("expected_delivery_date", { required: "This is required." })} className="w-full py-3 px-3 leading-tight border rounded"
          placeholder="Expected Delivery Date"
        />
        <p>{errors.expected_delivery_date?.message}</p>
        <input type="submit" />
      </form>
      <div>
        <p>Errors: </p>
        {JSON.stringify(errors.vendor_name?.message)}
      </div>
    </>
  );
}
