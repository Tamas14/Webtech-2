import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    fill: rgba(255, 255, 255, 1);
    margin-right: 16px;
`

class Logo extends Component {
    render() {
        return (
            <Wrapper>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 795 795"><path d="M0 647.6c0 49.9 40.6 90.5 90.5 90.5h20.1 552.1 40.2 41.9v-40.2h-41.9V597.3h41.9v-17.6h20.1 30.2v-40.2h-30.2V439h30.2v-40.2h-30.2 -2.5v-13.4 -20.1 -0.9l-49.6-93h52.2v-54.1L633.7 57H170.7L51.4 245.1c-20.4 16.6-33.8 41.6-33.8 69.9 0 49.6 40.1 89.9 89.6 90.4 -33.3 13.4-56.9 45.8-56.9 83.9 0 27.6 12.7 52 32.2 68.7C36.4 562 0 600.4 0 647.6zM57.8 315c0-18.7 10.4-34.9 25.7-43.6h599.3v93.9H108.1C80.4 365.3 57.8 342.7 57.8 315zM140.7 439h20.1 563.8v100.5H160.9h-20.1c-27.7 0-50.3-22.5-50.3-50.3C90.5 461.5 113 439 140.7 439zM90.5 597.3h20.1 552.1v100.5h-552.1H90.5c-27.7 0-50.3-22.5-50.3-50.3C40.2 619.9 62.8 597.3 90.5 597.3z"/></svg>
            </Wrapper>
        )
    }
}

export default Logo