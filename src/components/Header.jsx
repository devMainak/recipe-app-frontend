import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container container-fluid justify-content-between">
          <Link className="navbar-brand fs-4" to="/">
            Recipe Organiser
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5 text-primary"
                  aria-current="page"
                  to="/"
                >
                  Recipes
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5 text-primary"
                  aria-current="page"
                  to="addrecipe"
                >
                  Add Recipes
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
