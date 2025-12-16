import ProductForm from "./partials/ProductForm"

const EditProduct = () => {
  return (
    <section className="w-full lg:w-6xl mx-auto border border-gray-200 rounded-2xl p-6">
      <h1 className="text-xl font-medium mb-8">Edit Product</h1>
      <ProductForm isCreate={false} />
    </section>
  )
}

export default EditProduct