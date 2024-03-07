import lisa from '../public/images/lisa.jpg';
import ethan from '../public/images/ethan.jpg';
import hyoungjun from '../public/images/hyoungjun.jpg';
import juwon from '../public/images/juwon.jpg';
import nathan from '../public/images/nathan.jpg';
import loren from '../public/images/loren.jpg';
import robin from '../public/images/robin.jpg';
import kynam from '../public/images/kynam.jpg';
import colin from '../public/images/colin.png';
import tommy from '../public/images/tommy.jpg';
import greg from '../public/images/greg.jpg';
import video from '../public/videos/lisa.mp4';
import annie from '../public/images/annie.png';

function Buh() {
    return (
        <div>
            <h1>our glorious leader</h1>
            <img width="100%" height="25%" src={annie} alt=""></img>
            <h1>shortest programming lead</h1>
            <img width="100%" height="25%" src={lisa} alt=""></img>
            <video width="100%" height="50%" autoPlay loop muted>
  			<source src={video} type="video/mp4" />
			</video>
            <h1>ethan le gasping for air</h1>
            <img width="100%" height="25%" src={ethan} alt=""></img>
            <h1>tOwOt</h1>
            <img width="100%" height="25%" src={juwon} alt=""></img>
            <h1>ching chong backend dev</h1>
            <img width="100%" height="25%" src={loren} alt=""/>
            <h1>i ate it</h1>
            <img width="100%" height="25%" src={nathan} alt=""></img>
            <h1>bobin</h1>
            <img width="100%" height="25%" src={robin} alt=""></img>
            <h1>mating frog</h1>
            <img width="100%" height="25%" src={hyoungjun} alt=""></img>
            <h1>ballin on 3hrs of sleep</h1>
            <img width="100%" height="25%" src={kynam} alt=""></img>
            <h1>f15 my beloved</h1>
            <img width="100%" height="25%" src={colin} alt=""></img>
            <h1>i dunno</h1>
            <img width="100%" height="25%" src={tommy} alt=""></img>
            <h1>"我喜欢小孩"</h1>
            <img width="100%" height="25%" src={greg} alt=""></img>
        </div>
    );
}

export default Buh;