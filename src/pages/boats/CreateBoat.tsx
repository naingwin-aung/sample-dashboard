import BoatForm from "./partials/BoatForm"

const CreateBoat = () => {
  return (
    <section className="w-full lg:w-6xl mx-auto border border-gray-200 rounded-2xl p-6">
      <h1 className="text-xl font-medium mb-8">Create Boat</h1>
      <BoatForm isCreate={true} />
    </section>
  )
}

export default CreateBoat