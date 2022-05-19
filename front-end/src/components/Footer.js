import React from "react";

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-5pb-4">
            <div className="container text-center text-md-left">
                <div className="row text-center text-md-left">
                    <div className="col-md-3col-lg-3col-xl-3mx-auto mt-3">
                        <h5 className="text-uppercase mb-4font-weight-bold text-warning">
                            Miru
                        </h5>
                        <p>
                            Here you can use rows and columns to organize your footer
                            content.Lorem ipsum dolor sit amet, ital consectetur lorem ipsum
                            dolor sit amet adipisicing elit.
                        </p>
                    </div>
                    <div className="col-md-2col-lg-2col-xl-2mx-auto mt-3">
                        <h5 className="text-uppercase mb-4font-weight-bold text-warning">
                            Services
                        </h5>
                        <p>
                            <a
                                href="#"
                                className="text-white"
                                style={{ textDecoration: "none" }}
                            >
                                {" "}
                                Parks{" "}
                            </a>
                        </p>
                        <p>
                            <a
                                href="#"
                                className="text-white"
                                style={{ textDecoration: "none" }}
                            >
                                {" "}
                                SightSeeing{" "}
                            </a>
                        </p>
                    </div>
                    <div>

                    </div>

                    <div className="col-md-3col-lg-2col-xl-2mx-auto mt-3">
                        <p>
                            <h5 className="text-uppercase mb-4font-weight-bold text-warning">
                                Useful links
                            </h5>
                            <a
                                href="#"
                                className="text-white"
                                style={{ textDecoration: "none" }}
                            >
                                {" "}
                                Miru{" "}
                            </a>
                        </p>
                        <p>
                            <a
                                href="#"
                                className="text-white"
                                style={{ textDecoration: "none" }}
                            >
                                {" "}
                                Creativity{" "}
                            </a>
                        </p>

                    </div>
                    <div class="col-md-4col-lg-3col-xl-3mx-auto mt-3">
                        <h5 class="text-uppercase mb-4font-weight-bold text-warning">
                            Contact
                        </h5>
                        <p>
                            <i class="fas fa-home mr-3"></i>New York,NY 2333,US
                        </p>
                        <p>
                            <i class="fas fa-envelope mr-3"></i>miru@gmail.com
                        </p>
                        <p>
                            <i class="fas fa-phone mr-3"></i> +1 000-000-0000
                        </p>
                        <p>
                            <i class="fas fa-print mr-3"></i> +1 000-000-0000
                        </p>

                    </div>

                    <hr className="mb-4" />
                    <div className="row align-items-center">
                        <div className="col-md-7col-lg-8">
                            <p>Copyright©2022 All rights reserved by:{" "}
                                <a href="#" style={{ textDecoration: "none" }}>
                                    <strong className="text-warning">Miru</strong>
                                </a></p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
