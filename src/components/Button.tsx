import {cva} from 'class-variance-authority';

const buttonVariants = cva('inline-flex flex-row items-center justify-center', {
	variants: {
		variant: {
			default: 'bg-brand text-lg w-full text-white disabled:bg-brand/80',
			outline: 'bg-white border-2 border-brand text-brand hover:bg-white',
			green: 'bg-[#01BB00] text-white border-2',
			white: 'bg-white text-black border border-black/30',
			number_red: 'bg-[#CA0000] text-white text-lg',
			number_green: 'bg-[#01BB00] text-white text-lg',
		},
		size: {
			default: 'h-10 px-4 rounded-md',
			sm: 'h-9 rounded-md px-3',
			lg: 'h-11 rounded-md px-8',
			icon: 'h-10 w-10',
			vsm: 'h-9 rounded-3xl md:px-2 px-1',
			eb: 'h-11 rounded-md w-full',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
	},
});

const buttonTextVariants = cva('', {
	variants: {
		variant: {
			default: 'text-white',
			outline: 'text-brand font-semibold',
		},
		size: {
			default: 'text-xl text-center',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
	},
});

export {buttonTextVariants, buttonVariants};