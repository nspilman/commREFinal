import React, { Component } from 'react';

export class AgentApi extends Component {

    async callApi(){
        const url = "https://sheetdb.io/api/v1/ueshccmj9mar8";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    }
}
const agentApiCall = new AgentApi();
let data = agentApiCall.callApi();
console.log(data);
export default AgentApi ;





