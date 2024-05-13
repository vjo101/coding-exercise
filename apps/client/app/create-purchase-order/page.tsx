"use client"

import { Item, PurchaseOrders, PurchaseOrderLineItems } from "@prisma/client"

import { useForm, SubmitHandler } from "react-hook-form"

async function postData(url = "", data = {}) {
    const res = await fetch(url, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    console.log("I posted the data")
    return res.json();
}

interface Inputs {
    vendor_name: string
    order_date: string
    expected_delivery_date: string

}

export default async function Page() {
    // the useForm definition has to be before the getData(0 else it will be breaking the Rules of hook)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }, //use the useState hook
    } = useForm<Inputs>();

    // did I do this function right? Should it be an arrow function or normal function?
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        console.log(errors);
        console.log(JSON.stringify(data));
        postData("http://localhost:3100/api/purchase-order", data);
    }

    return (
        <>
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
        </>

    )
}