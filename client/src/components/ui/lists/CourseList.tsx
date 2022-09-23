import React from 'react';
import { IoIosSchool } from 'react-icons/io';
import Tag from '../labels/Tag';

interface Props {
    courses: string[];
    className?: string;
}

const CourseList: React.FC<Props> = ({ courses, className = '' }) => {
    return (
        <div className={className}>
            {courses.length > 0 && (
                <div className="flex flex-col gap-2">
                    <p className="flex-start gap-1">
                        <IoIosSchool className="text-slate-600 text-xl" />
                        Relevant Courses:
                    </p>
                    <ul className="flex flex-wrap gap-x-3 gap-y-2">
                        {courses.map((course, idx) => (
                            <Tag key={idx} name={course} />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CourseList;
