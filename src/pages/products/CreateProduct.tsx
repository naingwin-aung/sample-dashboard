import ProductForm from "./partials/ProductForm"

const CreateProduct = () => {
  return (
    <section className="w-full lg:w-6xl mx-auto border border-gray-200 rounded-2xl p-6">
      <h1 className="text-xl font-medium mb-8">Create Product</h1>
      <ProductForm isCreate={true} />
    </section>
  )
}

export default CreateProduct