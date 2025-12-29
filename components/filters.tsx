import React, { Fragment, Suspense } from "react";
import AccountFilter from "./account-filter";
import {DateFilter} from "./date-filter";

const Filters = () => {
  return (
    <Fragment>
      <div className="flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2">
        <Suspense fallback={<div>Loading...</div>}>
          <AccountFilter />
          <DateFilter />
        </Suspense>
      </div>
    </Fragment>
  );
};

export default Filters;
