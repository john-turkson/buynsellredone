import ProtectedRoute from "@/components/application-wrapper/ProtectedRoute";
import React from "react";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <>
        <h1 className="text-3xl font-bold underline text-black text-center dark:text-neutral-200">
          Profile Page!
        </h1>
      </>
    </ProtectedRoute>
  );
}
