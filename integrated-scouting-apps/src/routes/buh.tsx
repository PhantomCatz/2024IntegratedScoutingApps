import lisa from '../public/images/lisa.png';
import ethan from '../public/images/ethan.png';
import hyoungjun from '../public/images/hyoungjun.png';
import juwon from '../public/images/juwon.png';
import nathan from '../public/images/nathan.png';
import loren from '../public/images/loren.png';
import robin from '../public/images/robin.png';
import video from '../public/videos/lisa.mp4';
import annie from '../public/images/annie.png';

function Buh() {
    return (
        <div>
            <h1>Crying Emoji</h1>
            <img width="100%" height="25%" src={annie} alt=""></img>
            <h1>Don Programming Leader</h1>
            <img width="100%" height="25%" src={lisa} alt=""></img>
            <video width="100%" height="50%" autoPlay loop muted>
  			<source src={video} type="video/mp4" />
			</video>
            <h1>Strategy Captain</h1>
            <img width="100%" height="25%" src={ethan} alt=""></img>
            <h1>tOwOt</h1>
            <img width="100%" height="25%" src={juwon} alt=""></img>
            <h1>Backend Dev</h1>
            <img width="100%" height="25%" src={loren} alt=""/>
            <h1>Front End Developer</h1>
            <img width="100%" height="25%" src={nathan} alt=""></img>
            <h1>Pit Scout Developer</h1>
            <img width="100%" height="25%" src={robin} alt=""></img>
            <h1>DTF Developer</h1>
            <img width="100%" height="25%" src={hyoungjun} alt=""></img>
            {/* <h1>...</h1>
            <img width="100%" height="25%" src={kynam} alt=""></img>
            <h1>...</h1>
            <img width="100%" height="25%" src={colin} alt=""></img> */}
            {/* <h1>----</h1>
            <img width="100%" height="25%" src={tommy} alt=""></img> */}
            {/* <h1>"---"</h1>
            <img width="100%" height="25%" src={greg} alt=""></img> */}
        </div>
    );
}

export default Buh;