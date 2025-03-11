// import React from "react";
// import * as ProgressPrimitive from "@radix-ui/react-progress";

// function Progress({ className, value, ...props }) {
//   return (
//     <ProgressPrimitive.Root
//       data-slot="progress"
//       className={`bg-primary/20 relative h-2 w-full overflow-hidden rounded-full ${className}`}
//       {...props}
//     >
//       <ProgressPrimitive.Indicator
//         data-slot="progress-indicator"
//         className="bg-primary h-full w-full flex-1 transition-all"
//         style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
//       />
//     </ProgressPrimitive.Root>
//   );
// }

// export default Progress;
// components/ui/Progress.jsx
import React from "react";

export default function Progress({ value }) {
  return (
    <div className="relative w-full h-2 bg-gray-200 rounded">
      <div
        className="absolute top-0 left-0 h-2 bg-blue-500 rounded"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
