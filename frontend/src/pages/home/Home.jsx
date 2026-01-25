import './home.css';
import Header from '../../components/navbar/Header/Header';
import Exploremenu from '../../components/navbar/exploremenu/Exploremenu';
import Fooddisplay from '../../components/navbar/fooddisplay/Fooddisplay';
import Appdownload from '../../components/appdownload/Appdownload';


const Home = ({category,setCategory}) => {
  return (
    <div id='home' >
     <Header />
      <Exploremenu  category={category} setCategory={setCategory}/>
      <Fooddisplay   category={category} setCategory={setCategory} />
      <Appdownload />
    </div>
  )
}

export default Home
