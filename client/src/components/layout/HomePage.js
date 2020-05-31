import React, {Component} from "react";
import styled from "styled-components";
import "../../style/style.css";

const Wrapper = styled.div.attrs({
})`
    margin: 30px auto;
    max-width: 70%;
`

class HomePage extends Component {
    render() {
        return(
            <Wrapper>
                <div id="carouselIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src="/images/1.jpg" alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="/images/2.jpg" alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="/images/3.jpg" alt="Third slide" />
                        </div>
                    </div>
                    <a className="carousel-control-prev carousel-button" href="#carouselIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next carousel-button" href="#carouselIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </Wrapper>
        )
    }
}

export default HomePage;
