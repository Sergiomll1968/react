import './Flag.css';

function Flag(props) {
  const {name, orientation, lines} = props;
  return (
    <>
      <div>
        <div>{name}</div>
        <br />
        <div className='flagContainer'>
          <div className= {(orientation === 'horizontal')? 'columnContainer': 'rowContainer'}>
          { lines.map((line) =>
            <div key={line.id} style={{display: 'grid', justifyContent: 'center', alignItems: 'center',backgroundColor: line.color}}>
              {line.circle && <div className='circle' style={{backgroundColor: line.circle.color, height: line.circle.size, width: line.circle.size}}></div>}
            </div>)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Flag;

// {line.circle && <div className='circle' style={{backgroundColor: line.circle.color, height: line.circle.size, width: line.circle.size}}></div>}