import { ComponentProps, FC } from "react";

const Logo: FC<ComponentProps<"svg">> = ({ className, ...restProps }) => {
	return (
		<svg
			width="937"
			height="828"
			viewBox="0 0 937 828"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			{...restProps}
		>
			<path
				d="M335.29 248.987v81.839h241.042c-.671-1.264-1.264-2.565-1.97-3.806-13.838-24.817-32.92-43.9-57.256-57.264-24.336-13.841-52.493-20.769-84.464-20.769H335.29Zm-97.35-20.267L135.848 330.826H237.94V228.72ZM466.628 0 304.276 162.375h129.768c37.22 0 71.599 6.189 103.093 18.598 31.972 12.409 59.647 30.081 83.029 52.989 23.859 22.431 42.235 48.924 55.118 79.468 2.489 5.691 4.652 11.507 6.677 17.396h115.446L466.628 0ZM335.29 497.174v81.839h97.352c32.448 0 60.828-6.672 85.165-20.034 24.336-13.841 43.193-33.182 56.555-57.999.691-1.24 1.278-2.543 1.935-3.806H335.29Zm346.572 0c-2.006 5.879-4.122 11.695-6.578 17.396-12.884 30.544-31.035 57.295-54.417 80.203-23.383 22.429-51.057 39.846-83.029 52.254-31.494 12.409-65.616 18.598-102.358 18.598H304.276L466.628 828l330.779-330.826H681.862Zm-546.014 0L237.94 599.28V497.174H135.848ZM16.89 481.314v-21.979H49.4c8.233 0 15.437-1.695 21.611-5.086 6.175-3.511 10.958-8.416 14.348-14.713 3.511-6.296 5.267-13.744 5.267-22.341 0-8.356-1.756-15.621-5.267-21.797-3.511-6.297-8.354-11.141-14.53-14.531-6.174-3.512-13.318-5.268-21.43-5.268H16.345v-21.978h33.418c9.444 0 18.161 1.574 26.152 4.722 8.112 3.149 15.135 7.629 21.067 13.442 6.054 5.691 10.716 12.412 13.985 20.162 3.39 7.75 5.085 16.226 5.085 25.429s-1.695 17.741-5.085 25.612c-3.269 7.75-7.87 14.531-13.803 20.343-5.933 5.692-12.955 10.112-21.067 13.26-7.991 3.149-16.648 4.723-25.971 4.723H16.89Zm-16.89 0V353.621h24.7v127.693H0Zm195.431 1.998c-9.323 0-18.041-1.695-26.153-5.086-7.991-3.391-15.014-8.053-21.067-13.986-5.933-6.055-10.595-13.079-13.985-21.071-3.39-8.113-5.085-16.771-5.085-25.974s1.635-17.74 4.904-25.612c3.39-7.992 8.051-14.955 13.984-20.888 6.054-6.055 13.076-10.717 21.067-13.986 7.991-3.391 16.648-5.086 25.971-5.086 9.444 0 18.162 1.695 26.153 5.086 7.991 3.269 14.953 7.931 20.886 13.986 6.053 5.933 10.775 12.896 14.166 20.888 3.39 7.993 5.085 16.59 5.085 25.793s-1.695 17.801-5.085 25.793c-3.391 7.992-8.113 15.016-14.166 21.071-5.933 5.933-12.895 10.595-20.886 13.986-7.87 3.391-16.467 5.086-25.789 5.086Zm-.364-23.069c8.233 0 15.377-1.816 21.431-5.449s10.776-8.658 14.166-15.076c3.511-6.418 5.267-13.926 5.267-22.523 0-6.297-.969-12.049-2.906-17.256-1.937-5.207-4.722-9.688-8.354-13.441-3.633-3.875-7.931-6.842-12.895-8.901-4.964-2.058-10.534-3.088-16.709-3.088-7.991 0-15.074 1.817-21.249 5.449-6.054 3.512-10.836 8.477-14.347 14.895-3.39 6.418-5.085 13.865-5.085 22.342 0 6.418.968 12.291 2.905 17.619 2.059 5.328 4.843 9.869 8.355 13.623 3.632 3.754 7.93 6.66 12.894 8.719 5.086 2.058 10.595 3.087 16.527 3.087Zm147.216 23.069c-9.323 0-18.04-1.695-26.152-5.086-7.991-3.391-15.014-8.053-21.068-13.986-5.932-6.055-10.594-13.079-13.984-21.071-3.39-8.113-5.085-16.771-5.085-25.974s1.634-17.74 4.903-25.612c3.391-7.992 8.052-14.955 13.985-20.888 6.054-6.055 13.076-10.717 21.067-13.986 7.991-3.391 16.648-5.086 25.971-5.086 9.444 0 18.162 1.695 26.153 5.086 7.991 3.269 14.953 7.931 20.885 13.986 6.054 5.933 10.776 12.896 14.166 20.888 3.39 7.993 5.086 16.59 5.086 25.793s-1.696 17.801-5.086 25.793c-3.39 7.992-8.112 15.016-14.166 21.071-5.932 5.933-12.894 10.595-20.885 13.986-7.87 3.391-16.467 5.086-25.79 5.086Zm-.363-23.069c8.233 0 15.377-1.816 21.431-5.449 6.053-3.633 10.775-8.658 14.166-15.076 3.511-6.418 5.266-13.926 5.266-22.523 0-6.297-.968-12.049-2.905-17.256-1.938-5.207-4.722-9.688-8.355-13.441-3.632-3.875-7.93-6.842-12.894-8.901-4.965-2.058-10.534-3.088-16.709-3.088-7.991 0-15.074 1.817-21.249 5.449-6.054 3.512-10.836 8.477-14.348 14.895-3.39 6.418-5.085 13.865-5.085 22.342 0 6.418.969 12.291 2.906 17.619 2.058 5.328 4.843 9.869 8.354 13.623 3.633 3.754 7.931 6.66 12.895 8.719 5.085 2.058 10.594 3.087 16.527 3.087Zm163.055 21.071-55.393-66.662 53.94-61.031h30.874l-60.114 66.298v-11.443l62.112 72.838h-31.419Zm-77.187 0V353.621h24.7v127.693h-24.7Zm138.736 0v-21.979h32.509c8.233 0 15.437-1.695 21.612-5.086 6.175-3.511 10.958-8.416 14.348-14.713 3.511-6.296 5.267-13.744 5.267-22.341 0-8.356-1.756-15.621-5.267-21.797-3.511-6.297-8.355-11.141-14.529-14.531-6.175-3.512-13.319-5.268-21.431-5.268h-33.054v-21.978h33.417c9.444 0 18.162 1.574 26.153 4.722 8.112 3.149 15.134 7.629 21.067 13.442 6.054 5.691 10.715 12.412 13.984 20.162 3.391 7.75 5.086 16.226 5.086 25.429s-1.695 17.741-5.086 25.612c-3.269 7.75-7.87 14.531-13.802 20.343-5.933 5.692-12.956 10.112-21.068 13.26-7.991 3.149-16.648 4.723-25.971 4.723h-33.235Zm-16.89 0V353.621h24.699v127.693h-24.699Zm135.679 0V353.621h24.699v127.693h-24.699Zm128.088 0-55.393-66.662 53.94-61.031h30.875l-60.115 66.298v-11.443l62.112 72.838h-31.419Zm-77.186 0V353.621h24.699v127.693h-24.699Z"
				className={className}
			/>
			<path
				d="M890.143 483.13c-10.291 0-19.13-1.756-26.515-5.267-7.265-3.512-13.864-8.78-19.796-15.803l16.345-16.348c3.753 4.965 8.112 8.84 13.076 11.625 4.964 2.664 11.018 3.996 18.162 3.996 6.417 0 11.502-1.271 15.255-3.814 3.875-2.543 5.812-6.055 5.812-10.535 0-3.875-1.09-7.024-3.269-9.446-2.179-2.421-5.085-4.48-8.718-6.175-3.511-1.696-7.446-3.209-11.805-4.541a213.476 213.476 0 0 1-12.894-4.905 59.517 59.517 0 0 1-11.805-6.72c-3.511-2.785-6.357-6.297-8.536-10.535-2.179-4.36-3.269-9.809-3.269-16.348 0-7.75 1.876-14.35 5.63-19.799 3.753-5.449 8.899-9.627 15.437-12.533 6.538-2.906 13.924-4.359 22.157-4.359 8.718 0 16.588 1.634 23.61 4.904 7.023 3.269 12.774 7.508 17.253 12.715l-16.345 16.347c-3.753-4.117-7.628-7.144-11.623-9.082-3.875-1.937-8.294-2.906-13.258-2.906-5.691 0-10.171 1.09-13.44 3.27-3.269 2.179-4.903 5.328-4.903 9.445 0 3.512 1.089 6.357 3.269 8.537 2.179 2.18 5.025 4.057 8.536 5.631 3.632 1.574 7.567 3.088 11.805 4.541a165.846 165.846 0 0 1 12.894 4.904c4.359 1.817 8.294 4.178 11.805 7.084 3.633 2.906 6.539 6.66 8.718 11.262 2.179 4.48 3.269 10.051 3.269 16.711 0 11.867-4.177 21.191-12.531 27.972-8.355 6.782-19.796 10.172-34.326 10.172Z"
				className={className}
			/>
		</svg>
	);
};

export default Logo;
