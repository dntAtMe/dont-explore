import { Form } from "react-bootstrap";
import "./Header.scss";
import { HeaderProps } from "./types";

export const Header = (props: HeaderProps) => {
	return (
		<nav className="navbar navbar-expand-sm navbar-light bg-light">
			<a className="navbar-brand" href="#">
			</a>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse justify-content-between" id="navbarNav">
				<div className="navbar-nav">
					<a className="nav-item nav-link" href="#">Root</a>
					<a className="nav-item nav-link" href="#">Fav 1</a>
					<a className="nav-item nav-link" href="#" onClick={props.onClick}>Go back</a>
				</div>
				<Form className="form-inline">
					<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
				</Form>
			</div>

		</nav>
	)
};

export default Header;