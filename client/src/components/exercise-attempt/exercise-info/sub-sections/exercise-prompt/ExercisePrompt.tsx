import React from 'react';
import ReactQuill from 'react-quill';
import { MdReportProblem, MdCategory } from 'react-icons/md';
import { AiFillStar, AiFillCheckCircle } from 'react-icons/ai';
import { FaUserEdit } from 'react-icons/fa';

import Tag from '../../../../ui/design-elements/Tag';
import { useExerciseAttemptCtx } from '../../../../../store/context/ExerciseAttemptContext';
import ExercisePromptFooter from './ExercisePromptFooter';

const ExercisePrompt: React.FC = () => {
    const { exercise } = useExerciseAttemptCtx();

    if (exercise == null) return <div>No exercise</div>;

    return (
        <section className="flex-1 flex flex-col gap-8 overflow-y-scroll px-5 py-4 bg-white">
            <header>
                <div className="flex-between">
                    <h2 className="text-3xl capitalize">{exercise.name}</h2>
                    <label className="px-3 py-1 text-xl text-main-400 border-2 border-main-400 rounded-lg">
                        {exercise.difficulty}
                    </label>
                </div>
                <ul className="text-[0.95rem] mt-2 flex flex-wrap gap-4">
                    <li className="flex gap-1">
                        <FaUserEdit className="text-main-500 text-[1.35rem]" /> Martin
                    </li>
                    <li className="flex gap-1">
                        <MdCategory className="text-sky-500 text-[1.4rem]" /> {exercise.topic}
                    </li>
                    <li className="flex gap-1">
                        <AiFillStar className="text-yellow-500 text-[1.35rem]" /> 12,530
                    </li>
                    <li className="flex gap-1">
                        <AiFillCheckCircle className="text-emerald-400 text-[1.45rem]" />
                        38,239 of 60,329 (63%)
                    </li>
                    <li className="flex gap-1">
                        <MdReportProblem className="text-rose-500 text-[1.35rem]" /> 5 reports
                    </li>
                </ul>
            </header>
            <ReactQuill
                className="read-only-editor"
                theme="snow"
                value={exercise.prompt}
                onChange={() => {}}
                placeholder={'Write something awesome...'}
            />
            <ExercisePromptFooter />
        </section>
    );
};

export default ExercisePrompt;
