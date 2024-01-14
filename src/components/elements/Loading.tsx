const Loading = () => {
	return (
		<div className="flex space-x-2 justify-center items-cente h-fit">
			<span className="sr-only">Loading...</span>
			<div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
			<div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
			<div className="h-4 w-4 bg-black rounded-full animate-bounce"></div>
		</div>
	);
};

export default Loading;
