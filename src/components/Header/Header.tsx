import "./Header.scss";
import { HeaderProps } from "./types";

export const Header = (props: HeaderProps) => {
	return (
		<nav className="navbar navbar-dark bg-dark">
			<a className="navbar-brand" href="#">
				<img src="https://avatars.githubusercontent.com/u/43831256?v=4" width="30" height="30" alt="" />
			</a>
		</nav>
	)
};

export default Header;