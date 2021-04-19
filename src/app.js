import React, { Component } from "react";
import Chart from "react-google-charts";

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
  constructor() {
    super();
    this.state = {
      selectedAgent: "Steve",
      chartImageURI: "",
      agentsTotalSales: 0,
      agentLand: 0,
      agentOffice: 0,
      agentResidential: 0,
    };
  }

  componentDidMount() {
    this.setAgent();
  }

  async setAgent() {

    this.setState({
      agentTotalSales: this.state.agentTotalSales - this.state.agentTotalSales,
      agentLand: this.state.agentLand - this.state.agentLand,
      agentOffice: this.state.agentOffice - this.state.agentOffice,
      agentResidential: this.state.agentResidential - this.state.agentResidential,
    });
    // AgentApi.data
    const url = "https://sheetdb.io/api/v1/ueshccmj9mar8";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    //Agent Total Sales
    this.getAgentCount(data, this.state.selectedAgent);
    console.log(
      `${this.state.selectedAgent} total sales are `,
      this.state.agentsTotalSales
    );
    //Renaming property-type JSON key so it is JavaScript readable
    const arr = data;
    arr.forEach((obj) => this.renameKey(obj, "property-type", "propertyType"));
    //Land
    this.getAgentLandCount(data, this.state.selectedAgent, "land");
    console.log(
      `${this.state.selectedAgent} land Sales are`,
      this.state.agentLand
    );
    //Office
    this.getAgentOfficeCount(data, this.state.selectedAgent, "office");
    console.log(
      `${this.state.selectedAgent} office Sales are`,
      this.state.agentOffice
    );
    //Residential
    this.getAgentResidentialCount(
      data,
      this.state.selectedAgent,
      "residential"
    );
    console.log(
      `${this.state.selectedAgent} residential Sales are`,
      this.state.agentResidential
    );
  }

  renameKey(obj, oldKey, newKey) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
  //Agents total sales
  getAgentCount(data, agent) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].agent.toLowerCase() === agent.toLowerCase()) {
        // console.log(data[i]);
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
    console.log(`Agent is now ${this.state.selectedAgent}`);
    //    this.setState({ agentLand: this.state.agentLand === 1})
    return (
      //  <Table />
      <table>
        {/* <div
        onClick={(e) => this.setState({ 
            selectedAgent: e.target.innerText, 
            agentTotalSales: this.state.agentTotalSales = this.state.agentTotalSales }, this.setAgent)}>
        Steve
      </div> */}
        <div
          onClick={(e) =>
            this.setState(
              {
                selectedAgent: e.target.innerText,
              },
              this.setAgent
            )
          }
        >
          Steve
        </div>
        <div
          onClick={(e) =>
            this.setState(
              {
                selectedAgent: e.target.innerText,
              },
              this.setAgent
            )
          }
        >
          Bob
        </div>
        <div
          onClick={(e) =>
            this.setState(
              {
                selectedAgent: e.target.innerText,
              },
              this.setAgent
            )
          }
        >
          Jack
        </div>
      </table>
    );
  }
  render() {
    return (
      <React.Fragment>
        <div className="App">{this.renderAgentData()}</div>
        <div className="Agent Chart">
          <h1>{this.state.selectedAgent}'s Chart </h1>
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
      </React.Fragment>
    );
  }
}

export default App;
