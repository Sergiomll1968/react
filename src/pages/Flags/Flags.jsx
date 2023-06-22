import './Flags.css';
import flagsDB from './flagsDB.js';
import Flag from '../../components/Flag/Flag.jsx';

function FlagsApp() {

  return (
    <>
      <h1>Banderas</h1>
      <br />
      <div className='flagsContainer'>
        { flagsDB.map((element) => <Flag key={element.flagId} name={element.name} orientation={element.orientation} lines={element.lines} />)}
      </div>
    </>
  );
}

export default FlagsApp;
