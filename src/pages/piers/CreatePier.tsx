import PierForm from "./partials/PierForm";

const CreatePier = () => {
  return (
    <section className="w-full lg:w-6xl mx-auto border border-gray-200 rounded-2xl p-6">
      <h1 className="text-xl font-medium mb-8">Create Pier</h1>
      <PierForm isCreate={true} />
    </section>
  );
};

export default CreatePier;
