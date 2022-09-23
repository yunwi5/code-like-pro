import React from "react";

import { IExercise, IShowCase } from "../../../models/interfaces";
import CodeEditor from "../editor/CodeEditor";
import { getDateTimeFormat } from "../../../utils/datetime";
import {
  BsFillPersonFill,
  BsClock,
  BsFillChatLeftFill,
  BsFileCode,
  BsChevronUp,
  BsChevronDown,
} from "react-icons/bs";

interface Props {
  showcase: IShowCase;
  className?: string;
  exercise: IExercise;
}

const ShowcaseCard: React.FC<Props> = ({ showcase, className, exercise }) => {
  return (
    <div
      className={`flex flex-col gap-4 px-6 py-3 bg-grey-500 border-2 border-gray-200/90 rounded-sm transition-all shadow-md${className}`}
    >
      <h2 className="text-gray-500 font-bold text-xl">
        {showcase.description}
      </h2>
      <div className="flex flex-row m-0">
        <div className="flex content-center mr-5">
          <BsFillPersonFill className="m-1" />
          <h5>{showcase.user.name}</h5>
        </div>
        <div className="flex content-center">
          <BsClock className="m-1" />
          <h5>{getDateTimeFormat(showcase.postedAt, false)}</h5>
        </div>
      </div>
      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-7">
          <CodeEditor
            className="flex-1 border-none shadow-none"
            onChange={() => {}}
            showHeader={false}
            language={exercise.language}
            value={showcase.code}
            readOnly={true}
          />
        </div>
        <div className="col-span-1 flex flex-col justify-center m-auto">
          <BsChevronUp className="text-4xl hover:text-main-500 cursor-pointer" />
          <BsChevronDown className="text-4xl hover:text-main-500 cursor-pointer" />
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex content-center mr-5">
          <BsFillChatLeftFill className="m-1" />
          <h5>{showcase.comments.length} Comments</h5>
        </div>
        <div className="flex content-center mr-5">
          <BsFileCode className="m-1" />
          <h5>Compare With Yours</h5>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseCard;
