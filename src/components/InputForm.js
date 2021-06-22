const InputForm = ({
  placeholder,
  nameInput,
  rules = "",
  typeInput = "text",
  value = "",
}) => {
  return `
        <div class="form-group flex flex-col mb-5">
            <input 
                type="${typeInput}" 
                name="${nameInput}" 
                rules="${rules}"
                value="${value}" 
                class="form-control px-4 py-2 border 
                    focus:ring-gray-500 focus:border-blue-500 w-full sm:text-sm
                     border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="${placeholder}">
            <span class="form-message"></span>
        </div>
    `;
};
export default InputForm;
