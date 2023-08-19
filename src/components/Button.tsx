const commonButton = 'inline-flex flex-row items-center justify-center';
const buttonVariants = {
	default: `${commonButton} bg-brand text-lg w-full text-white disabled:bg-brand/80 h-10 px-4 rounded-md`,
	outline: `${commonButton} h-10 px-4 rounded-md border-brand border-2`,
	prev: `${commonButton} h-10 px-4 bg-brand`,
};

const buttonTextVariants = {
	default: 'text-white text-xl text-center',
	outline: 'text-brand text-xl text-center',
};

export {buttonTextVariants, buttonVariants};
