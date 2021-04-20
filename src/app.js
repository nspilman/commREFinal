import React, { Component } from "react";
import Chart from "react-google-charts";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const pieOptions = {
  title: "",
  pie: 0.6,
  slices: [
    {
      color: "#eb913b",
    },
    {
      color: "#c33f29",
    },
    {
      color: "#007fad",
    },
    {
      color: "#e9a227",
    },
  ],
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: {
      color: "233238",
      fontSize: 14,
    },
  },
  tooltip: {
    showColorCode: true,
  },
  chartArea: {
    left: 0,
    top: 0,
    width: "100%",
    height: "80%",
  },
  fontName: "Roboto",
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAgent: "Steve",
      chartImageURI: "",
      agentsTotalSales: 0,
      agentLand: 0,
      agentOffice: 0,
      agentResidential: 0,
      stevesTotalSales: 0,
      bobsTotalSales: 0,
      jacksTotalSales: 0
    };
  }

  componentDidMount() {
    this.setAgent();
  }

  async setAgent() {
   //Resetting the state
   //I tried use a method for this, but I could not find a way to reset everything except the default value for selected Agent, which is Steve
    this.setState({
      agentTotalSales: this.state.agentTotalSales - this.state.agentTotalSales,
      agentLand: this.state.agentLand - this.state.agentLand,
      agentOffice: this.state.agentOffice - this.state.agentOffice,
      agentResidential: this.state.agentResidential - this.state.agentResidential,
      stevesTotalSales: this.state.stevesTotalSales - this.state.stevesTotalSales,
      bobsTotalSales: this.state.bobsTotalSales - this.state.bobsTotalSales,
      jacksTotalSales: this.state.jacksTotalSales - this.state.jacksTotalSales,
    });
    // AgentApi.data
    const url = "https://sheetdb.io/api/v1/ueshccmj9mar8";
    const response = await fetch(url);
    const data = await response.json();
    //Agent Total Sales

    this.getSteveCount(data, "steve");
    this.getBobCount(data, "bob");
    this.getJackCount(data, "jack");

    this.getAgentCount(data, this.state.selectedAgent);
    //Renaming property-type JSON key so it is JavaScript readable
    const arr = data;
    arr.forEach((obj) => this.renameKey(obj, "property-type", "propertyType"));
    //Land
    this.getAgentLandCount(data, this.state.selectedAgent, "land");
    //Office
    this.getAgentOfficeCount(data, this.state.selectedAgent, "office");
    //Residential
    this.getAgentResidentialCount(
      data,
      this.state.selectedAgent,
      "residential"
    );
  }

  renameKey(obj, oldKey, newKey) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
  //Agents total sales
  getSteveCount (data, agent){
    for (let i = 0; i < data.length; i++) {
        if (data[i].agent.toLowerCase()  === agent) {
            this.setState({ stevesTotalSales: this.state.stevesTotalSales + 1 });
        }
    }
    return this.state.stevesTotalSales;  ;
}
getBobCount (data, agent){
    for (let i = 0; i < data.length; i++) {
        if (data[i].agent.toLowerCase()  === agent) {
            this.setState({ bobsTotalSales: this.state.bobsTotalSales + 1 });
        }
    }
    return this.state.stevesTotalSales;  ;
}
getJackCount (data, agent){
    for (let i = 0; i < data.length; i++) {
        if (data[i].agent.toLowerCase()  === agent) {
            this.setState({ jacksTotalSales: this.state.jacksTotalSales + 1 });
        }
    }
    return this.state.stevesTotalSales;  ;
}
  getAgentCount(data, agent) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].agent.toLowerCase() === agent.toLowerCase()) {
        this.setState({ agentsTotalSales: this.state.agentsTotalSales + 1 });
      }
    }
    return this.state.agentTotalSales;
  }
  //Agents Land Sales
  getAgentLandCount(data, agent, propertyType) {
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].agent.toLowerCase() === agent.toLowerCase() &&
        data[i].propertyType.toLowerCase() === propertyType
      ) {
        this.setState({ agentLand: this.state.agentLand + 1 });
      }
    }
    return this.state.agentLand;
  }
  //Agents Office Sales
  getAgentOfficeCount(data, agent, propertyType) {
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].agent.toLowerCase() === agent.toLowerCase() &&
        data[i].propertyType.toLowerCase() === propertyType
      ) {
        this.setState({ agentOffice: this.state.agentOffice + 1 });
      }
    }
    return this.state.agentOffice;
  }
  //Agents Residential Sales
  getAgentResidentialCount(data, agent, propertyType) {
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].agent.toLowerCase() === agent.toLowerCase() &&
        data[i].propertyType.toLowerCase() === propertyType
      ) {
        this.setState({ agentResidential: this.state.agentResidential + 1 });
      }
    }
    return this.state.agentResidential;
  }
  renderAgentData() {
    return (

     
    <div className="agent-sales">
 
      <table id="tableData">
      <tbody>
      <tr>
          <th>Agent</th>
          <th className="table-sales">Sales</th>
      </tr>
        <tr>
            <td className="table-agent" onClick={(e) => this.setState({selectedAgent: e.target.innerText,},this.setAgent)
            }
            > Steve
            </td>
            <td colSpan='2'>
           {this.state.stevesTotalSales}
            </td>
        </tr>
        <tr>
            <td className="table-agent" onClick={(e) => this.setState({selectedAgent: e.target.innerText,},this.setAgent)
            }
            > Bob 
            </td>
            <td colSpan='2'>
            {this.state.bobsTotalSales}
            </td>
        </tr>
        <tr>
            <td className="table-agent" onClick={(e) => this.setState({selectedAgent: e.target.innerText,},this.setAgent)
            }
            > Jack 
            </td>
            <td colSpan='2'>
            {this.state.jacksTotalSales}
            </td>
        </tr>
        </tbody>
      </table>
      </div>
    );
  }
  render() {
    return (
    
      <React.Fragment>
      <div className="container">
      <h1 class="main-header"> Data Analysis for CommRE</h1>
      <div id="salesByAgent"> Sales by Agent: {this.state.selectedAgent}</div>
        <div className = "row">
            <div class = "col-lg-6 col-sm-12">
        <div className="App">{this.renderAgentData()}</div>
        </div>
        <div className = "col-lg-6 col-sm-12">
        <div className="agent-chart">
          <Chart
            chartType="PieChart"
            data={[
              ["Sales", "Percentage Sales"],
              ["Land", this.state.agentLand],
              ["Office", this.state.agentOffice],
              ["Residential", this.state.agentResidential],
            ]}
            options={pieOptions}
            graph_id="PieChart"
            width={"100%"}
            height={"400px"}
            legend_toggle
          />
          </div>
            </div>
        
         </div>
      </div>

      </React.Fragment>
           
    );
  }
}

export default App;