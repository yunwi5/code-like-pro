import axios from 'axios';
import { AppProperty } from '../../constants/app';
import { IExercise } from '../../models/interfaces';

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/exercise`;

export async function postExercise(exercise: IExercise) {
    try {
        const res = await axios.post<IExercise>(API_DOMAIN, exercise);
        return { exercise: res.data, ok: true };
    } catch (err) {
        return { message: (err as any).message, ok: false };
    }
}
