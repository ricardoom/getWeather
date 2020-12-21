import React from 'react';
import SvgTextEl from './SvgTextEl';
import Words from './Words';
class SvgContainer extends React.Component {
  render() {
    const words = ['bobo', 'toro', 'pagoda'];
    const parent = document.getElementById('generatedSVG');
    return (
      <svg
        id="generatedSVG"
        viewBox={this.props.viewBox}
        xmlns="http://www.w3.org/2000/svg"
      >
        {console.log(`the parent is: ${parent}`)}
        {/* <Words /> */}
        {words.map((word, index) => {
          return (
            <SvgTextEl
              key={index}
              x={this.props.x}
              y={this.props.y}
              text={word}
              transform="scale(1.3)"
              rotate="180"
            />
          );
        })}
      </svg>
    );
  }
}

export default SvgContainer;
