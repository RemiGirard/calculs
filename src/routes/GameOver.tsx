import Title from '../components/Title';
import Clapping from '../assets/clapping.png';

const GameOver = ({ numberOfCalcul, title }: any) => {
  const steps = [...(new Array(5))].map((_, index) => {
    return Math.round((index * numberOfCalcul) / 4)
  })
  const getAnswerLineDisplay = (first: any, second: any, score: any, isLast: any) => {
    return !isLast
      ? <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
        <div>de {first} à {Math.max(first, second - 1)} réponse{(Math.max(first, second - 1)) > 1 ? 's' : ''} juste{Math.max(first, second - 1) > 1 ? 's' : ''} : </div>
        <div> tu montes de {score}</div>
      </div>
      : <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
        <div>plus de {first} réponse{first > 1 ? 's' : ''} juste{first > 1 ? 's' : ''} : </div>
        <div> tu montes de {score}</div>
      </div>
  }
  return (<div>
    <Title>{title}</Title>
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', fontSize: '4em', marginTop: '60px' }}>
      {
        steps.map((_, index) => {
          return index !== steps.length - 1
            ? getAnswerLineDisplay(steps[index], steps[index + 1], index + 1, (index === steps.length - 2))
            : null
        })
      }
    </div>
    <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: '#c7ecf4', zIndex: -10 }}>
      <img src={Clapping} style={{ width: '1000px', height: '500px' }}></img>
    </div>
  </div>);
}

export default GameOver;