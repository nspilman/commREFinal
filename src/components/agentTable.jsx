import React from 'react';



class AgentTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
           students: [
              {  Agent: 'steve', Sales: 21},
              {  Agent: 'bob', Sales: 19,},
              {  Agent: 'jack', Sales: 16 }
           ]
        }
     }
  
     renderTableHeader() {
        let header = Object.keys(this.state.students[0])
        return header.map((key, index) => {
           return <th key={index}>{key}</th>
        })
     }
  
     renderTableData() {
        return this.state.students.map((student, index) => {
           const { id, Agent, Sales } = student //destructuring
           return (
              <tr>
                 {/* <td>{id}</td> */}
                 <td>{Agent}</td>
                 <td>{Sales}</td>
             
                 {/* <td>{email}</td> */}
              </tr>
           )
        })
     }
  
     render() {
        return (
           <div>
              <h1 id='title'>React Dynamic Table</h1>
              <table id='students'>
                 <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                 </tbody>
              </table>
           </div>
        )
     }
 }
 export default AgentTable
//  ReactDOM.render(<Table />, document.getElementById('root'));