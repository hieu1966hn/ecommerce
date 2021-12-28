import Spin from "react-cssfx-loading/lib/Spin";
import { changePassword } from "../../services/api/profile";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Password() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (data) => {
    if (!loading) {
      setLoading(true);

      changePassword(data.old, data.new)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <h2 className="text-2xl mt-3">Password</h2>

      <div className="flex items-center">
        <div className="w-[150px] text-gray-500 flex-shrink-0">
          Old password
        </div>
        <div className="flex-grow">
          <input
            className={`outline-none border px-3 py-1 focus:border-gray-500 transition w-full my-1 ${
              errors.old ? "border-red-300 focus:border-red-400" : ""
            }`}
            type="password"
            {...register("old", { required: true })}
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-[150px] text-gray-500 flex-shrink-0">
          New password
        </div>
        <div className="flex-grow">
          <input
            className={`outline-none border px-3 py-1 focus:border-gray-500 transition w-full my-1 ${
              errors.new ? "border-red-300 focus:border-red-400" : ""
            }`}
            type="password"
            {...register("new", {
              required: true,
              minLength: 6,
              maxLength: 18,
            })}
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-[150px] text-gray-500 flex-shrink-0">Confirm</div>
        <div className="flex-grow">
          <input
            className={`outline-none border px-3 py-1 focus:border-gray-500 transition w-full my-1 ${
              errors.confirm ? "border-red-300 focus:border-red-400" : ""
            }`}
            type="password"
            {...register("confirm", {
              required: true,
              validate: (value) => value === watch("new"),
            })}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          disabled={loading || Object.keys(errors).length > 0}
          className={`btn ${loading ? "!px-6" : ""}`}
        >
          {loading ? (
            <Spin color="#ffffff" width="25px" height="25px" />
          ) : (
            <>Change password</>
          )}
        </button>
      </div>
    </form>
  );
}