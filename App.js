import React from 'react'
import './App.css';
import TodoAppRouter from "./Components/Todo-Components/TodoAppRouter";
import './bootstrap.css';



function App() {
  return (
    <div className="App">
        <TodoAppRouter/>
    </div>
  );
}



// class LearningComponent extends Component{
//   render() {
//     return(
//         <div className="learningComponents">
//           My Hello World
//           <FirstComponent/>
//           <SecondComponent/>
//           <ThirdComponent/>
//         </div>
//
//     )
//   }
// }




export default App;
