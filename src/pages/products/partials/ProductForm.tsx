import FormButton from "@/components/global/FormButton";
import FormError from "@/components/global/FormError";
import FormInput from "@/components/global/FormInput";
import FormLabel from "@/components/global/FormLabel";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";

type FormFields = {
  name: string;
  piers: string[];
};

const ProductForm = ({ isCreate }: { isCreate: boolean }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      setError("root", {
        type: "manual",
        message: `Failed to ${
          isCreate ? "create" : "update"
        } pier. Please try again.`,
      });
    }
  };

  return (
    <div>
      {errors.root && (
        <div className="text-red-500 text-sm mt-1.5">{errors.root.message}</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-4">
          <div className="w-1/2 mb-6">
            <FormLabel htmlFor="name">Name</FormLabel>
            <FormInput
              id="name"
              placeholder="Enter name"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && <FormError message={errors.name.message} />}
          </div>

          <div className="w-1/2 mb-6">
            <FormLabel htmlFor="piers">Piers</FormLabel>
            <MultiSelect>
              <MultiSelectTrigger className="w-full">
                <MultiSelectValue placeholder="Select frameworks..." />
              </MultiSelectTrigger>
              <MultiSelectContent>
                <MultiSelectGroup>
                  <MultiSelectItem value="next.js">Next.js</MultiSelectItem>
                  <MultiSelectItem value="sveltekit">SvelteKit</MultiSelectItem>
                  <MultiSelectItem value="astro">Astro</MultiSelectItem>
                  <MultiSelectItem value="vue">Vue.js</MultiSelectItem>
                  <MultiSelectItem value="react">React</MultiSelectItem>
                  <MultiSelectItem value="angular">Angular</MultiSelectItem>
                </MultiSelectGroup>
              </MultiSelectContent>
            </MultiSelect>
            {errors.piers && <FormError message={errors.piers.message} />}
          </div>
        </div>

        <div className="flex justify-end">
          <FormButton disabled={isSubmitting}>
            {isCreate ? "Save" : "Update"}
          </FormButton>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
