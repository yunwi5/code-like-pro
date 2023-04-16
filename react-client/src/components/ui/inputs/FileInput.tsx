import styles from './FileInput.module.scss';

interface Props {
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    file?: File | null;
    className?: string;
    accept?: string;
    children: React.ReactNode;
}

const FileInput: React.FC<Props> = (props) => {
    const { onChange, file, accept, className = '', children } = props;

    return (
        <div className="flex flex-col items-center">
            <input
                type="file"
                accept={accept ?? '.jpeg,.jpg,.png'}
                name="file"
                id="file"
                onChange={onChange}
                className={`${styles.inputfile} ${className}`}
            />
            <label className={`${styles['label']} text-lg shadow-md`} htmlFor="file">
                {children}
            </label>

            {/* Display filename uploaded by the user. */}
            {file?.name && <p className="mt-1 text-base text-slate-500">{file.name}</p>}
        </div>
    );
};

export default FileInput;
