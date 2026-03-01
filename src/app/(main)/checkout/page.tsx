import { Suspense } from "react";
import CheckoutPage from "./CheckoutSuspense";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <CheckoutPage />
      </Suspense>
    </div>
  );
};

export default page;
