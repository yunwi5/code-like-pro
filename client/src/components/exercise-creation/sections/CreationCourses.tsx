import React, { useState } from 'react';
import { CourseList } from '../../../models/enums';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';
import Tag from '../../ui/labels/Tag';
import AutoComplete from '../../ui/inputs/AutoComplete';

const CreationCourses: React.FC = () => {
    const { courses, setCourses } = useExerciseCreationContext();
    const [error, setError] = useState<string | null>(null);

    const handleAdd = (newCourse: string) => {
        newCourse = newCourse.trim();
        if (courses.includes(newCourse)) return;

        // Maximum 5 courses, if the user tries to exceeds, show error message.
        if (courses.length >= 5) return setError('Sorry, maximum 5 tags!');

        setCourses([...courses, newCourse]);
    };

    const handleDelete = (tagToDelete: string) => {
        setError(null);
        setCourses(courses.filter((tag) => tag !== tagToDelete));
    };

    return (
        <div className="flex flex-col gap-5 mt-4">
            <AutoComplete
                id="challenge-courses"
                options={CourseList}
                label={'Courses:'}
                placeholder="Enter predefined or your own courses"
                onAdd={handleAdd}
                error={error}
            />
            {courses.length > 0 && (
                <div className="flex flex-wrap gap-x-3 gap-y-2 px-3 py-2 rounded-md border-[3px] border-slate-300">
                    {courses.map((course, idx) => (
                        <Tag key={idx} name={course} onDelete={() => handleDelete(course)} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CreationCourses;
