import { db } from "../../drizzle/db";
import { products as productsTable } from "../../drizzle/schema";
import {
  Form,
  useLoaderData,
  useFetcher,
  Link,
} from "react-router";

import { useState } from "react";
import { eq, asc } from "drizzle-orm";




// GET ALL PRODUCTS
export async function loader() {
  const data = await db
    .select()
    .from(productsTable)
    .orderBy(asc(productsTable.id));

  return data;
}



// HANDLE CREATE / UPDATE / DELETE
export async function action({ request }: any) {
  const formData = await request.formData();

  const intent = formData.get("intent");

  const id = Number(formData.get("id"));

  const name = formData.get("name") as string;

  const price = Number(formData.get("price"));



  // CREATE
  if (intent === "create") {
    await db.insert(productsTable).values({
      name,
      price,
    });
  }



  // DELETE
  if (intent === "delete") {
    await db
      .delete(productsTable)
      .where(eq(productsTable.id, id));
  }



  // UPDATE
  if (intent === "update") {
    await db
      .update(productsTable)
      .set({
        name,
        price,
      })
      .where(eq(productsTable.id, id));
  }
}





// UI
export default function Products() {

  const products = useLoaderData() as any[];

  const fetcher = useFetcher();

  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [editId, setEditId] = useState<number | null>(null);



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-6 text-white">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">

          <div>

            <h1 className="text-3xl font-bold">
              Products CRUD
            </h1>

            <p className="text-gray-400 mt-1 text-sm">
              Manage your products with modern CRUD operations
            </p>

          </div>


          <Link
            to="/"
            className="bg-slate-800/80 border border-slate-700 hover:bg-slate-700 transition px-4 py-2 rounded-xl text-gray-200 text-sm font-medium"
          >
            Back To Home
          </Link>

        </div>



        {/* ADD / UPDATE PRODUCT */}
        <div className="bg-slate-800/80 backdrop-blur p-6 rounded-2xl shadow-lg mb-8 border border-slate-700">

          <h2 className="text-xl font-semibold mb-4 text-gray-200">

            {editId ? "Update Product" : "Add Product"}

          </h2>


          <Form
            method="post"
            className="flex gap-4 flex-wrap"
            onSubmit={() => {
              setName("");
              setPrice("");
              setEditId(null);
            }}
          >

            {editId && (
              <input
                type="hidden"
                name="id"
                value={editId}
              />
            )}



            {/* PRODUCT NAME */}
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 min-w-[150px] bg-slate-700 text-white placeholder-gray-400 border border-slate-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />



            {/* PRICE */}
            <input
              name="price"
              type="number"
              placeholder="Price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-32 bg-slate-700 text-white placeholder-gray-400 border border-slate-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />



            {/* BUTTONS */}
            {editId ? (

              <button
                type="button"
                className="bg-cyan-500 cursor-pointer text-black font-semibold px-4 py-2 rounded-lg hover:bg-cyan-400 transition"
                onClick={() => {

                  fetcher.submit(
                    {
                      id: editId,
                      name,
                      price,
                      intent: "update",
                    },
                    {
                      method: "post",
                    }
                  );

                  setEditId(null);

                  setName("");

                  setPrice("");

                }}
              >
                Update
              </button>

            ) : (

              <button
                name="intent"
                value="create"
                className="bg-cyan-500 cursor-pointer text-black font-semibold px-4 py-2 rounded-lg hover:bg-cyan-400 transition"
              >
                Add
              </button>

            )}

          </Form>

        </div>



        {/* PRODUCT LIST */}
        <div className="bg-slate-800/80 backdrop-blur p-6 rounded-2xl shadow-lg border border-slate-700">

          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            All Products
          </h2>



          {products.length === 0 ? (

            <p className="text-gray-400">
              No products yet...
            </p>

          ) : (

            <div className="space-y-4">

              {products.map((p) => (

                <div
                  key={p.id}
                  className="flex justify-between items-center bg-slate-700 p-4 rounded-xl hover:bg-slate-600 transition"
                >

                  {/* PRODUCT INFO */}
                  <div>

                    <p className="font-semibold text-white">
                      {p.name}
                    </p>

                    <p className="text-gray-300 text-sm">
                      ₹{p.price}
                    </p>

                  </div>



                  {/* ACTIONS */}
                  <div className="flex gap-3">

                    {/* EDIT */}
                    <button
                      onClick={() => {
                        setEditId(p.id);
                        setName(p.name);
                        setPrice(p.price.toString());
                      }}
                      className="text-cyan-400 hover:text-cyan-300 cursor-pointer"
                    >
                      Edit
                    </button>



                    {/* DELETE */}
                    <button
                      onClick={() =>
                        fetcher.submit(
                          {
                            id: p.id,
                            intent: "delete",
                          },
                          {
                            method: "post",
                          }
                        )
                      }
                      className="text-red-400 hover:text-red-300 cursor-pointer"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}