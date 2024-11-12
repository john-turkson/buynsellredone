import AvatarUpload from "./AvatarUpload";

export default function ProfileField({ labelName, children }) {
  return (
    <div className="flex mb-4">

    {/* Field Label */}
      <div className="w-1/2">
        <div className="py-8">
            <label className=" dark:text-neutral-500">
              {labelName}
            </label>
        </div>
      </div>

      {/* Field */}
      <div className="w-1/2">
        {children}
      </div>
    </div>
  );
}
