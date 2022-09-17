import React, { useMemo, useState } from "react";
import { useShowcase } from "../../../store/context/ShowcaseContext";
import CodeEditor from "../../ui/editor/CodeEditor";
import { CommentSortingKey, SortingDirection } from "../../../models/enums";
import ShowcaseSorter from "./sections/ShowcaseSorter";

const ShowcaseShowcases: React.FC = () => {
  const { userSubmission } = useShowcase();
  if (!userSubmission) return null;

  const [sortingState, setSortingState] = useState({
    key: CommentSortingKey.NONE,
    direction: SortingDirection.DESCENDING,
  });

  return (
    <div className="flex flex-col px-4">
      <div className="flex flex-row">
        <ShowcaseSorter
          sortingState={sortingState}
          setSortingState={setSortingState}
        />
        <h5 className="text-gray-500 font-bold text-lg ml-auto">
          {5} Showcases
        </h5>
      </div>
      {/* Component that handles the selection of sorting key and direction from the user. */}
    </div>
  );
};

export default ShowcaseShowcases;
