import './App.css';
import Thiendam from "./Classes/Showname";
import Header from "./Components/Home";
import Lifecycle from './Classes/Lifecycle';
import First_Form from './Classes/Form';
import ChoseClass from './Classes/AlertForm';
import AVGForm from './Classes/AVGForm';
import MainHeader from './Components/Header';
import StudentTbl from './Classes/StudentTbl';
import MockAPIII from './Classes/mockAPI';
import CRUD from './Classes/AxiosCRUD';


function App() {
  return (
    <>
      <MainHeader />
      {/* <Header />
      <First_Form/>
      <ChoseClass /> */}
      <CRUD/>
      <AVGForm />
      <StudentTbl />
      <MockAPIII/>
      {/* <Lifecycle/>
      <Thiendam /> */}
      //   
    </>
    // <>
    
    // </>
  );
}

export default App;
