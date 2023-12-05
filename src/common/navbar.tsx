function NavBar() {
  function handleLogOut(event: any) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <nav className="navbar navbar-expand-lg  navbar-custom">
      <div className="container-fluid">
        <a href="/">
          <img
            src="https://static.wixstatic.com/media/6f2127_a3fffbe837bc4520a3c8ea90c8fe3350~mv2.png/v1/fill/w_85,h_85,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/6f2127_a3fffbe837bc4520a3c8ea90c8fe3350~mv2.png"
            className="header-logo"
            alt="logo"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 header-items">
            <li className="nav-item">
              <a
                className="nav-link active header-item"
                aria-current="page"
                href="/"
              >
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <button
                className="nav-link active header-item"
                aria-current="page"
                onClick={(event) => handleLogOut(event)}
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
