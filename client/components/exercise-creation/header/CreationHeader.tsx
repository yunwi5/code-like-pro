import BackButton from '../../ui/buttons/BackButton';

const CreationHeader = () => {
    return (
        <header className="flex justify-between items-center">
            <h1 className="text-2xl lg:text-3xl">
                Create <span className="hidden md:inline">Your Own</span> Challenge
            </h1>
            {/* Button to go back to previous page */}
            <BackButton className="text-xl" />
        </header>
    );
};

export default CreationHeader;
