
import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";


<BrowserRouter>
    {
      heroes.map(hero => 
      (<Link to={'heroes/' + hero.id} />))
    }
  <Route path="heroes/:id" component={Hero} />
</BrowserRouter>

class Hero extends Component {
  render() {
    return (
      <div>
        {this.props.match.params.id}
      </div>
    );
  }
}