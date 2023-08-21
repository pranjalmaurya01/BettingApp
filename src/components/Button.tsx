const commonButton = 'inline-flex flex-row items-center justify-center';
const buttonVariants = {
	default: `${commonButton} bg-brand text-lg w-full text-white disabled:bg-brand/80 h-10 px-4 rounded-md`,
	outline: `${commonButton} h-10 px-4 rounded-md border-brand border-2`,
	prev: `${commonButton} h-10 px-4 bg-brand`,
	greenHeader: `${commonButton} h-8 px-4 rounded-2xl bg-[#01BB00] `,
	whiteHeader: `${commonButton} h-8 px-4 rounded-2xl bg-white`,
	number_red: `${commonButton} bg-[#CA0000] text-white rounded-md h-10 w-full`,
	number_green: `${commonButton} bg-[#01BB00] text-white rounded-md h-10 w-full`,
	number_common: `${commonButton} w-full h-10 px-4 rounded-md`,
	bet: `${commonButton} w-full h-8 px-4 rounded-md`,
	start: `${commonButton} h-8 px-4 rounded-2xl bg-brand`,
	stop: `${commonButton} h-8 px-4 rounded-2xl border-brand border-2`,
};

const buttonTextVariants = {
	default: 'text-white text-xl text-center',
	outline: 'text-brand text-xl text-center',
	greenHeader: 'text-white text-center',
	whiteHeader: 'text-black text-center',
	eb: 'text-white text-center text-lg',
	bet: 'text-white text-center text-sm',
	stop: 'text-brand text-center',
};

export {buttonTextVariants, buttonVariants};
