import PierForm from "./partials/PierForm";

const EditPier = () => {
  return (
    <section className="w-full lg:w-6xl mx-auto border border-gray-200 rounded-2xl p-6">
      <h1 className="text-2xl font-medium mb-8">Edit Pier</h1>
      <PierForm isCreate={false} />
    </section>
  );
};

export default EditPier;
