import FormInput from "@/components/global/FormInput";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, type Control, type useForm } from "react-hook-form";
import type { LocalBoatForm } from "./BoatDialog";
import FormLabel from "@/components/global/FormLabel";

interface TicketItemProps {
  ticketIndex: number;
  control: Control<LocalBoatForm>;
  register: ReturnType<typeof useForm<LocalBoatForm>>["register"];
  removeTicket: (index: number) => void;
  getNewPriceTemplate: () => {
    id: number | string;
    name: string;
    selling_price: number;
    net_price: number;
  };
}

const TicketItem = ({
  ticketIndex,
  control,
  register,
  removeTicket,
  getNewPriceTemplate,
}: TicketItemProps) => {
  const ticketPath = `tickets.${ticketIndex}`;

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: `tickets.${ticketIndex}.prices` as const,
  });

  const addTicketOption = () => {
    if (optionFields.length >= 2) return;
    appendOption(getNewPriceTemplate());
  };

  return (
    <div className="border border-gray-200 rounded-md p-4 mb-5">
      <div className="flex justify-end">
        <div
          className="border border-red-600 rounded p-1 hover:border-red-700"
          onClick={() => removeTicket(ticketIndex)}
        >
          <Trash2
            size={18}
            className=" text-red-600 hover:text-red-700 cursor-pointer"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <FormLabel htmlFor={`${ticketPath}.name`}>Name</FormLabel>
          <FormInput
            id={`${ticketPath}.name`}
            placeholder="Enter name"
            {...register(`tickets.${ticketIndex}.name` as const)}
          />
        </div>
        <div className="w-1/2">
          <FormLabel htmlFor={`${ticketPath}.short_description`}>
            Short description
          </FormLabel>
          <FormInput
            id={`${ticketPath}.short_description`}
            placeholder="Enter short description"
            {...register(`tickets.${ticketIndex}.short_description` as const)}
          />
        </div>
      </div>
      {/* ... (Options Table using local register) ... */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-xs mb-5 mt-6">
        <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg">
          <thead>
            <tr>
              <th className="w-0.5">
                <Plus
                  size={19}
                  className="ms-2.5 text-gray-600 cursor-pointer"
                  onClick={() => addTicketOption()}
                />
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium tracking-wide text-gray-600">
                Options
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium tracking-wide text-gray-600">
                Market selling price
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium tracking-wide text-gray-600">
                Net price
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium tracking-wide text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {optionFields.map((option, optionIndex) => (
              <tr key={option.id}>
                <td className="w-0.5"></td>
                <td className="px-6 py-3 whitespace-nowrap text-sm">
                  <FormInput
                    id={`option_name_${ticketIndex}_${optionIndex}`}
                    placeholder="Enter option name"
                    {...register(
                      `tickets.${ticketIndex}.prices.${optionIndex}.name` as const
                    )}
                  />
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm">
                  <FormInput
                    id={`selling_price_${ticketIndex}_${optionIndex}`}
                    type="number"
                    placeholder="Enter market selling price"
                    {...register(
                      `tickets.${ticketIndex}.prices.${optionIndex}.selling_price` as const,
                      {
                        valueAsNumber: true,
                        required: "Price is required",
                      }
                    )}
                  />
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm">
                  <FormInput
                    id={`net_price_${ticketIndex}_${optionIndex}`}
                    type="number"
                    placeholder="Enter net price"
                    {...register(
                      `tickets.${ticketIndex}.prices.${optionIndex}.net_price` as const,
                      {
                        valueAsNumber: true,
                        required: "Price is required",
                      }
                    )}
                  />
                </td>
                <td className="px-6 py-3 text-end">
                  <span onClick={() => removeOption(optionIndex)}>
                    <Trash2
                      size={18}
                      strokeWidth={2.1}
                      className="inline text-red-600 cursor-pointer"
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketItem;
