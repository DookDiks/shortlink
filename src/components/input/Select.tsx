"use client";

import {cn} from "@dookdiks/utils";
import {ComponentProps, forwardRef} from "react";

const Select = forwardRef<HTMLSelectElement, ComponentProps<"select">>(
  ({className, ...restProps}, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "border-2 border-secondary rounded p-2 focus:outline-secondary-highlight text-base w-fit",
          className
        )}
        {...restProps}
      />
    );
  }
);

Select.displayName = "Select";

export default Select;
